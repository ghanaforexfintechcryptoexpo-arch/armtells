import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { 
  Radio, 
  Truck, 
  MapPin, 
  Gauge, 
  Compass, 
  Navigation, 
  ShieldCheck, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Layers, 
  Flame, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Phone,
  Eye,
  EyeOff
} from 'lucide-react';
import { Tanker, DeliveryRequest, TankerStatus } from '../../types';

interface LiveOperationsMapProps {
  tankers: Tanker[];
  deliveries: DeliveryRequest[];
  onOpenTrackingModal: (id: string) => void;
  onOpenPodModal: (podId: string) => void;
  selectedTankerId?: string | null;
  onSelectTanker?: (tankerId: string | null) => void;
}

interface SimulatedTankerPosition {
  tankerId: string;
  lat: number;
  lng: number;
  speedKmH: number;
  headingDeg: number;
  waypointIndex: number;
  direction: 1 | -1;
  status: TankerStatus;
  currentLocationName: string;
  cargoDescription: string;
  cargoVolume: number;
  fuelType: string;
  eta: string;
  activeDeliveryRef?: string;
  driverName: string;
  driverPhone: string;
  sealStatus: string;
  tempCelsius: number;
  pressureBar: number;
}

// Preset GPS Route Corridors with high-precision Waypoints
const CORRIDOR_ROUTES: Record<string, { lat: number; lng: number; name: string }[]> = {
  'ART-TK-01': [
    { lat: 5.6821, lng: 0.0124, name: 'Tema Oil Refinery Gantry' },
    { lat: 5.6420, lng: -0.0650, name: 'Tema Motorway Exit' },
    { lat: 5.6288, lng: -0.1152, name: 'Accra Coastal Bypass' },
    { lat: 5.5600, lng: -0.3200, name: 'Kasoa Western Corridor' },
    { lat: 5.4300, lng: -0.4800, name: 'Awutu Breku Checkpoint' },
    { lat: 5.3521, lng: -0.6288, name: 'Winneba Junction Corridor' },
    { lat: 5.2500, lng: -0.9500, name: 'Mankessim Transit Station' },
    { lat: 5.1054, lng: -1.2466, name: 'Cape Coast Metro Bypass' },
    { lat: 4.8967, lng: -1.7554, name: 'Takoradi Bulk Terminal' },
    { lat: 5.1500, lng: -1.8900, name: 'Tarkwa Mining Approach' },
    { lat: 5.3012, lng: -1.9834, name: 'Goldfields Tarkwa Mine Terminal' }
  ],
  'ART-TK-02': [
    { lat: 5.6821, lng: 0.0124, name: 'Tema BOST Loading Bay 3' },
    { lat: 5.6650, lng: -0.0350, name: 'Tema Industrial Highway' },
    { lat: 5.6500, lng: -0.0750, name: 'Community 18 Junction' },
    { lat: 5.6350, lng: -0.0980, name: 'Batsonaa Railway Crossing' },
    { lat: 5.6288, lng: -0.1152, name: 'Apex Energy Station #14 Spintex' }
  ],
  'ART-TK-03': [
    { lat: 5.6702, lng: 0.0019, name: 'Tema Central Logistics Staging Base' },
    { lat: 5.6720, lng: 0.0050, name: 'Staging Bay A' }
  ],
  'ART-TK-04': [
    { lat: 5.6750, lng: 0.0210, name: 'Tema Heavy Industrial Base' },
    { lat: 5.7500, lng: -0.2200, name: 'Amasaman N6 Highway' },
    { lat: 5.8900, lng: -0.3500, name: 'Nsawam Dual Carriage' },
    { lat: 6.0412, lng: -0.4512, name: 'Suhum Industrial Junction' },
    { lat: 6.3300, lng: -0.6500, name: 'Bunso Commercial Corridor' },
    { lat: 6.5512, lng: -0.7621, name: 'Nkawkaw Escarpment Pass' },
    { lat: 6.6666, lng: -1.6163, name: 'Kumasi BOST Kaase Terminal' },
    { lat: 7.0214, lng: -2.3412, name: 'Newmont Ahafo Mine Depot' }
  ],
  'ART-TK-05': [
    { lat: 5.6110, lng: -0.1980, name: 'Accra North Logistics Staging' },
    { lat: 5.6250, lng: -0.2300, name: 'Achimota Arterial Corridor' },
    { lat: 5.5800, lng: -0.2100, name: 'North Industrial Area Site' },
    { lat: 5.5500, lng: -0.2000, name: 'Ring Road Continuous Power Station' }
  ],
  'ART-TK-06': [
    { lat: 5.6601, lng: 0.0050, name: 'Authorized Volvo Workshop, Tema' }
  ]
};

// Strategic Key Petroleum Depots and Terminals
const KEY_TERMINALS = [
  { id: 'term-tor', name: 'Tema Oil Refinery (TOR) Gantry', type: 'REFINERY_GANTRY', lat: 5.6821, lng: 0.0124, activeLoadings: 4, queue: 2, capacity: '200,000 m³' },
  { id: 'term-takoradi', name: 'Takoradi Bulk Petroleum Terminal', type: 'COASTAL_DEPOT', lat: 4.8967, lng: -1.7554, activeLoadings: 2, queue: 1, capacity: '120,000 m³' },
  { id: 'term-kumasi', name: 'Kumasi BOST Inland Terminal (Kaase)', type: 'INLAND_DEPOT', lat: 6.6666, lng: -1.6163, activeLoadings: 1, queue: 0, capacity: '80,000 m³' },
  { id: 'term-buipe', name: 'Buipe Volta River Inland Gantry', type: 'RIVER_GANTRY', lat: 8.7611, lng: -1.5422, activeLoadings: 0, queue: 0, capacity: '45,000 m³' }
];

// Major Customer Sites
const KEY_CUSTOMER_SITES = [
  { id: 'site-tarkwa', name: 'Goldfields Tarkwa Mine Depot', type: 'MINING', lat: 5.3012, lng: -1.9834, requiredProduct: 'Diesel (AGO)', demand: '45,000 L / day' },
  { id: 'site-spintex', name: 'Apex Energy Station #14 Spintex', type: 'RETAIL', lat: 5.6288, lng: -0.1152, requiredProduct: 'Petrol (PMS)', demand: '36,000 L' },
  { id: 'site-ahafo', name: 'Newmont Ahafo Mine Bulk Tank Farm', type: 'MINING', lat: 7.0214, lng: -2.3412, requiredProduct: 'Diesel (AGO)', demand: '96,000 L / wk' },
  { id: 'site-factory', name: 'Tema Heavy Industrial Power Plant', type: 'POWER', lat: 5.6750, lng: 0.0210, requiredProduct: 'HFO / Gas Oil', demand: '60,000 L' }
];

// Calculate compass heading between two coordinates
function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1));
  const brng = toDeg(Math.atan2(y, x));
  return Math.round((brng + 360) % 360);
}

// Convert degrees to cardinal direction
function degreesToCardinal(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

export const LiveOperationsMap: React.FC<LiveOperationsMapProps> = ({
  tankers,
  deliveries,
  onOpenTrackingModal,
  onOpenPodModal,
  selectedTankerId: externalSelectedTankerId,
  onSelectTanker: externalOnSelectTanker
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const polylinesRef = useRef<L.Polyline[]>([]);
  const terminalMarkersRef = useRef<L.Marker[]>([]);
  const customerMarkersRef = useRef<L.Marker[]>([]);

  // Simulation playback controls
  const [isSimulating, setIsSimulating] = useState(true);
  const [simSpeedMultiplier, setSimSpeedMultiplier] = useState<number>(1);
  const [activeTankerFilter, setActiveTankerFilter] = useState<string>('ALL');
  const [showTerminals, setShowTerminals] = useState(true);
  const [showCustomerSites, setShowCustomerSites] = useState(true);
  const [showRouteCorridors, setShowRouteCorridors] = useState(true);

  // Internal selected tanker state
  const [internalSelectedTankerId, setInternalSelectedTankerId] = useState<string | null>('ART-TK-01');
  const selectedTankerId = externalSelectedTankerId !== undefined ? externalSelectedTankerId : internalSelectedTankerId;

  const handleSelectTanker = (id: string | null) => {
    if (externalOnSelectTanker) {
      externalOnSelectTanker(id);
    } else {
      setInternalSelectedTankerId(id);
    }
  };

  // Initialize simulated tanker states with realistic coordinates along their assigned corridor
  const [simulatedPositions, setSimulatedPositions] = useState<Record<string, SimulatedTankerPosition>>(() => {
    const initial: Record<string, SimulatedTankerPosition> = {
      'ART-TK-01': {
        tankerId: 'ART-TK-01',
        lat: 5.3521,
        lng: -0.6288,
        speedKmH: 62,
        headingDeg: 248,
        waypointIndex: 5,
        direction: 1,
        status: 'IN_TRANSIT',
        currentLocationName: 'N1 Highway (Near Winneba Junction)',
        cargoDescription: 'Automotive Gas Oil (AGO / Diesel 50ppm)',
        cargoVolume: 45000,
        fuelType: 'DIESEL_AGO',
        eta: 'Today at 16:45 GMT',
        activeDeliveryRef: 'ART-2026-000101',
        driverName: 'Samuel Mensah',
        driverPhone: '+233 24 555 3001',
        sealStatus: 'Seals #ARM-88910 to #ARM-88914 Intact',
        tempCelsius: 29.4,
        pressureBar: 1.02
      },
      'ART-TK-02': {
        tankerId: 'ART-TK-02',
        lat: 5.6821,
        lng: 0.0124,
        speedKmH: 0,
        headingDeg: 90,
        waypointIndex: 0,
        direction: 1,
        status: 'ON_DELIVERY',
        currentLocationName: 'Tema Bulk Oil Storage Terminal (Gantry Bay 3)',
        cargoDescription: 'Premium Motor Spirit (PMS Unleaded RON 95)',
        cargoVolume: 36000,
        fuelType: 'PETROL_PMS',
        eta: 'Today at 13:15 GMT',
        activeDeliveryRef: 'ART-2026-000102',
        driverName: 'Emmanuel Kofi',
        driverPhone: '+233 24 555 3002',
        sealStatus: 'Gantry Meter #04 Cleared',
        tempCelsius: 31.0,
        pressureBar: 1.01
      },
      'ART-TK-03': {
        tankerId: 'ART-TK-03',
        lat: 5.6702,
        lng: 0.0019,
        speedKmH: 0,
        headingDeg: 0,
        waypointIndex: 0,
        direction: 1,
        status: 'AVAILABLE',
        currentLocationName: 'Tema Central Logistics Staging Yard',
        cargoDescription: 'Tanks Purged / Ready for Loading',
        cargoVolume: 0,
        fuelType: 'DIESEL_AGO',
        eta: 'Standby Dispatch',
        driverName: 'Kwabena Boateng',
        driverPhone: '+233 24 555 3003',
        sealStatus: 'Vapor Certified',
        tempCelsius: 27.5,
        pressureBar: 1.00
      },
      'ART-TK-04': {
        tankerId: 'ART-TK-04',
        lat: 6.0412,
        lng: -0.4512,
        speedKmH: 68,
        headingDeg: 315,
        waypointIndex: 3,
        direction: 1,
        status: 'IN_TRANSIT',
        currentLocationName: 'N6 Highway (Suhum Commercial Junction)',
        cargoDescription: 'Low Sulphur Mining Diesel (B-Train)',
        cargoVolume: 48000,
        fuelType: 'DIESEL_AGO',
        eta: 'Today at 19:30 GMT',
        activeDeliveryRef: 'ART-2026-000103',
        driverName: 'Isaac Darko',
        driverPhone: '+233 24 555 3004',
        sealStatus: 'Seals #ARM-90112 to #ARM-90115 Verified',
        tempCelsius: 28.8,
        pressureBar: 1.03
      },
      'ART-TK-05': {
        tankerId: 'ART-TK-05',
        lat: 5.6110,
        lng: -0.1980,
        speedKmH: 34,
        headingDeg: 210,
        waypointIndex: 1,
        direction: 1,
        status: 'AVAILABLE',
        currentLocationName: 'Accra North Distribution Corridor',
        cargoDescription: 'Urban Delivery Diesel (Metered Pump)',
        cargoVolume: 18000,
        fuelType: 'DIESEL_AGO',
        eta: 'On Local Route',
        driverName: 'Joseph Osei',
        driverPhone: '+233 24 555 3005',
        sealStatus: 'Calibrated Flow Meter Active',
        tempCelsius: 29.1,
        pressureBar: 1.01
      },
      'ART-TK-06': {
        tankerId: 'ART-TK-06',
        lat: 5.6601,
        lng: 0.0050,
        speedKmH: 0,
        headingDeg: 0,
        waypointIndex: 0,
        direction: 1,
        status: 'UNDER_MAINTENANCE',
        currentLocationName: 'Authorized Volvo Workshop, Tema',
        cargoDescription: 'Tanks Degassed for Hydrostatic Inspection',
        cargoVolume: 0,
        fuelType: 'HEAVY_FUEL_OIL_HFO',
        eta: 'Maintenance Bay 2',
        driverName: 'Service Tech Dept',
        driverPhone: '+233 30 299 8811',
        sealStatus: 'Inspection Seal Active',
        tempCelsius: 26.0,
        pressureBar: 1.00
      }
    };
    return initial;
  });

  // Create custom Leaflet HTML icon for Tanker
  const createTankerIcon = (tankerId: string, status: TankerStatus, heading: number, isSelected: boolean) => {
    const statusColor = 
      status === 'IN_TRANSIT' ? '#FF6B00' :
      status === 'ON_DELIVERY' ? '#F59E0B' :
      status === 'AVAILABLE' ? '#10B981' :
      status === 'UNDER_MAINTENANCE' ? '#F43F5E' : '#64748B';

    const pulseClass = (status === 'IN_TRANSIT' || status === 'ON_DELIVERY') ? 'animate-ping' : '';

    const html = `
      <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        ${isSelected ? `
          <div style="position: absolute; inset: -4px; border-radius: 9999px; border: 2px solid #FF6B00; box-shadow: 0 0 15px rgba(255, 107, 0, 0.6);"></div>
        ` : ''}
        
        <!-- Radar Pulse wave -->
        <div style="position: absolute; inset: 6px; border-radius: 9999px; background-color: ${statusColor}; opacity: 0.25;" class="${pulseClass}"></div>
        
        <!-- Main Marker Circle -->
        <div style="position: relative; width: 32px; height: 32px; border-radius: 9999px; background-color: #0A0A0B; border: 2px solid ${statusColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.8);">
          <svg style="width: 16px; height: 16px; color: ${statusColor}; transform: rotate(${heading}deg); transition: transform 0.4s ease;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L19 21L12 17L5 21L12 2Z"/>
          </svg>
        </div>

        <!-- Tanker ID Micro Badge -->
        <div style="position: absolute; bottom: -10px; background-color: #0A0A0B; border: 1px solid ${statusColor}; color: #FFFFFF; font-family: monospace; font-size: 8px; font-weight: 800; padding: 1px 4px; border-radius: 2px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.9);">
          ${tankerId}
        </div>
      </div>
    `;

    return L.divIcon({
      className: 'custom-tanker-pin',
      html: html,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22]
    });
  };

  // Create terminal icon
  const createTerminalIcon = (name: string, type: string) => {
    const html = `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
        <div style="width: 28px; height: 28px; border-radius: 4px; background-color: #0F0F11; border: 1.5px solid #38BDF8; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
          <svg style="width: 14px; height: 14px; color: #38BDF8;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18M5 21V7l8-4v18M13 11l6-3v13"/>
          </svg>
        </div>
        <div style="position: absolute; bottom: -8px; background-color: #0A0A0B; border: 1px solid #38BDF8; color: #38BDF8; font-family: monospace; font-size: 7px; font-weight: 700; padding: 1px 3px; border-radius: 2px; white-space: nowrap;">
          DEPOT
        </div>
      </div>
    `;
    return L.divIcon({
      className: 'custom-depot-pin',
      html,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });
  };

  // Create customer site icon
  const createCustomerSiteIcon = (name: string, type: string) => {
    const color = type === 'MINING' ? '#F59E0B' : type === 'POWER' ? '#818CF8' : '#34D399';
    const html = `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
        <div style="width: 24px; height: 24px; border-radius: 9999px; background-color: #0A0A0B; border: 1.5px dashed ${color}; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 12px; height: 12px; color: ${color};" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      </div>
    `;
    return L.divIcon({
      className: 'custom-site-pin',
      html,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centered on Ghana Petroleum Logistics Corridors (Tema - Takoradi - Kumasi Triangle)
      const map = L.map(mapContainerRef.current, {
        center: [5.9000, -0.8000],
        zoom: 8,
        minZoom: 6,
        maxZoom: 16,
        zoomControl: false
      });

      // Add high-density dark carto tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add custom zoom control in top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render Polylines, Depots, and Customer Sites
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old route polylines
    polylinesRef.current.forEach(p => p.remove());
    polylinesRef.current = [];

    // Clear old terminal markers
    terminalMarkersRef.current.forEach(m => m.remove());
    terminalMarkersRef.current = [];

    // Clear old customer markers
    customerMarkersRef.current.forEach(m => m.remove());
    customerMarkersRef.current = [];

    // Draw route corridors
    if (showRouteCorridors) {
      Object.entries(CORRIDOR_ROUTES).forEach(([tankerId, waypoints]) => {
        if (waypoints.length < 2) return;
        const latLngs = waypoints.map(w => [w.lat, w.lng] as [number, number]);
        
        const isTankerSelected = selectedTankerId === tankerId;
        const polyline = L.polyline(latLngs, {
          color: isTankerSelected ? '#FF6B00' : '#334155',
          weight: isTankerSelected ? 4 : 2,
          opacity: isTankerSelected ? 0.9 : 0.45,
          dashArray: isTankerSelected ? undefined : '4, 8'
        }).addTo(map);

        polylinesRef.current.push(polyline);
      });
    }

    // Add Key Terminal Markers
    if (showTerminals) {
      KEY_TERMINALS.forEach(term => {
        const marker = L.marker([term.lat, term.lng], {
          icon: createTerminalIcon(term.name, term.type)
        }).addTo(map);

        marker.bindPopup(`
          <div style="background-color: #0A0A0B; color: #FFFFFF; font-family: sans-serif; padding: 6px; border-radius: 4px; min-width: 180px;">
            <div style="color: #38BDF8; font-family: monospace; font-size: 9px; font-weight: bold; text-transform: uppercase; margin-bottom: 2px;">
              ${term.type.replace('_', ' ')}
            </div>
            <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">
              ${term.name}
            </div>
            <div style="font-family: monospace; font-size: 10px; color: #94A3B8; border-top: 1px solid #334155; padding-top: 4px;">
              <div>Storage: <strong>${term.capacity}</strong></div>
              <div>Active Gantry Loadings: <strong style="color: #10B981;">${term.activeLoadings}</strong></div>
              <div>Tanker Queue: <strong style="color: #F59E0B;">${term.queue} BRVs</strong></div>
            </div>
          </div>
        `);

        terminalMarkersRef.current.push(marker);
      });
    }

    // Add Customer Delivery Site Markers
    if (showCustomerSites) {
      KEY_CUSTOMER_SITES.forEach(site => {
        const marker = L.marker([site.lat, site.lng], {
          icon: createCustomerSiteIcon(site.name, site.type)
        }).addTo(map);

        marker.bindPopup(`
          <div style="background-color: #0A0A0B; color: #FFFFFF; font-family: sans-serif; padding: 6px; border-radius: 4px; min-width: 170px;">
            <div style="color: #F59E0B; font-family: monospace; font-size: 9px; font-weight: bold; text-transform: uppercase; margin-bottom: 2px;">
              ${site.type} CUSTOMER SITE
            </div>
            <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">
              ${site.name}
            </div>
            <div style="font-family: monospace; font-size: 10px; color: #94A3B8; border-top: 1px solid #334155; padding-top: 4px;">
              <div>Demand: <strong>${site.demand}</strong></div>
              <div>Cargo: <strong style="color: #FF6B00;">${site.requiredProduct}</strong></div>
            </div>
          </div>
        `);

        customerMarkersRef.current.push(marker);
      });
    }

  }, [showRouteCorridors, showTerminals, showCustomerSites, selectedTankerId]);

  // 3. Render and Update Live Tanker Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    (Object.entries(simulatedPositions) as [string, SimulatedTankerPosition][]).forEach(([tId, pos]) => {
      if (activeTankerFilter !== 'ALL' && pos.status !== activeTankerFilter) {
        if (markersRef.current[tId]) {
          markersRef.current[tId].remove();
          delete markersRef.current[tId];
        }
        return;
      }

      const isSelected = selectedTankerId === tId;
      const icon = createTankerIcon(tId, pos.status, pos.headingDeg, isSelected);

      if (markersRef.current[tId]) {
        // Update existing marker position & icon
        markersRef.current[tId].setLatLng([pos.lat, pos.lng]);
        markersRef.current[tId].setIcon(icon);
      } else {
        // Create new marker
        const marker = L.marker([pos.lat, pos.lng], { icon }).addTo(map);
        
        marker.on('click', () => {
          handleSelectTanker(tId);
        });

        markersRef.current[tId] = marker;
      }
    });

  }, [simulatedPositions, activeTankerFilter, selectedTankerId]);

  // 4. GPS Simulation Loop (Smooth waypoint interpolation & movement)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSimulatedPositions(prev => {
        const next: Record<string, SimulatedTankerPosition> = { ...prev };

        (Object.entries(next) as [string, SimulatedTankerPosition][]).forEach(([tId, state]) => {
          // Only animate tankers with status IN_TRANSIT or ON_DELIVERY that have route waypoints
          if (state.status !== 'IN_TRANSIT' && state.status !== 'ON_DELIVERY') return;

          const route = CORRIDOR_ROUTES[tId];
          if (!route || route.length < 2) return;

          const currentIndex = state.waypointIndex;
          let nextIndex = currentIndex + state.direction;

          // Reverse direction if reaching corridor terminus
          let newDirection = state.direction;
          if (nextIndex >= route.length) {
            nextIndex = route.length - 2;
            newDirection = -1;
          } else if (nextIndex < 0) {
            nextIndex = 1;
            newDirection = 1;
          }

          const targetWaypoint = route[nextIndex];
          const currentWaypoint = route[currentIndex];

          // Compute step fraction based on speed multiplier
          const stepFraction = 0.08 * simSpeedMultiplier;
          const newLat = state.lat + (targetWaypoint.lat - state.lat) * stepFraction;
          const newLng = state.lng + (targetWaypoint.lng - state.lng) * stepFraction;

          // Calculate heading towards target
          const newHeading = calculateBearing(state.lat, state.lng, targetWaypoint.lat, targetWaypoint.lng);

          // Check if close enough to increment waypoint index
          const distSq = Math.pow(targetWaypoint.lat - newLat, 2) + Math.pow(targetWaypoint.lng - newLng, 2);
          const reachedWaypoint = distSq < 0.00008;

          // Simulated slight speed fluctuation (+- 2km/h)
          const baseSpeed = state.status === 'IN_TRANSIT' ? 62 : 30;
          const jitterSpeed = Math.max(15, Math.min(85, baseSpeed + (Math.random() * 6 - 3)));

          next[tId] = {
            ...state,
            lat: newLat,
            lng: newLng,
            headingDeg: newHeading,
            speedKmH: Math.round(jitterSpeed),
            waypointIndex: reachedWaypoint ? nextIndex : currentIndex,
            direction: newDirection,
            currentLocationName: reachedWaypoint ? targetWaypoint.name : state.currentLocationName,
            tempCelsius: Number((29.0 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
            pressureBar: Number((1.02 + (Math.random() * 0.02 - 0.01)).toFixed(2))
          };
        });

        return next;
      });
    }, 1000 / simSpeedMultiplier);

    return () => clearInterval(interval);
  }, [isSimulating, simSpeedMultiplier]);

  // Focus Map on Selected Tanker
  const handleFocusTanker = (tankerId: string) => {
    handleSelectTanker(tankerId);
    const pos = simulatedPositions[tankerId];
    if (pos && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([pos.lat, pos.lng], 12, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  };

  // Center Entire National Corridor Map
  const handleFitAllCorridors = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([5.9000, -0.8000], 8, { duration: 1 });
  };

  const selectedTelemetry = selectedTankerId ? simulatedPositions[selectedTankerId] : null;

  // Filtered tankers list for quick-dock
  const displayedTankers = useMemo(() => {
    return (Object.values(simulatedPositions) as SimulatedTankerPosition[]).filter(t => {
      if (activeTankerFilter === 'ALL') return true;
      return t.status === activeTankerFilter;
    });
  }, [simulatedPositions, activeTankerFilter]);

  return (
    <div className="bg-[#0F0F11] border border-white/10 rounded-sm overflow-hidden shadow-2xl space-y-0">
      
      {/* Top Map Control & Telemetry Bar */}
      <div className="p-3 sm:p-4 border-b border-white/10 bg-[#0A0A0B] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Title & Live Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00]">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-sans text-white uppercase tracking-tight">
                Live Petroleum Fleet GPS Tracking
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>NPA SAT-FEED ACTIVE</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              High-precision simulated telemetry across registered petroleum road transit corridors
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Status Filter */}
          <div className="flex items-center bg-[#0F0F11] border border-white/10 rounded-sm p-0.5 text-[10px] font-mono">
            {['ALL', 'IN_TRANSIT', 'ON_DELIVERY', 'AVAILABLE', 'UNDER_MAINTENANCE'].map((st) => (
              <button
                key={st}
                onClick={() => setActiveTankerFilter(st)}
                className={`px-2 py-1 rounded-sm uppercase font-bold transition cursor-pointer ${
                  activeTankerFilter === st 
                    ? 'bg-[#FF6B00] text-black' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st === 'ALL' ? 'All (6)' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Simulation Toggle & Speed */}
          <div className="flex items-center gap-1.5 bg-[#0F0F11] border border-white/10 rounded-sm p-1">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-white transition cursor-pointer"
              title={isSimulating ? 'Pause GPS Simulation' : 'Resume GPS Simulation'}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5 text-[#FF6B00]" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            <select
              value={simSpeedMultiplier}
              onChange={(e) => setSimSpeedMultiplier(Number(e.target.value))}
              className="bg-[#0A0A0B] border border-white/10 text-[10px] font-mono text-slate-300 rounded-sm px-1.5 py-1 focus:outline-none"
            >
              <option value="1">1x Real-Time</option>
              <option value="2">2x Speed</option>
              <option value="4">4x Fast Sim</option>
            </select>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowTerminals(!showTerminals)}
              className={`p-1.5 text-[10px] font-mono rounded-sm border transition cursor-pointer flex items-center gap-1 ${
                showTerminals ? 'bg-sky-500/10 text-sky-400 border-sky-500/30' : 'bg-white/5 text-slate-500 border-white/10'
              }`}
              title="Toggle Depot Terminals"
            >
              <Layers className="w-3 h-3" /> Depots
            </button>

            <button
              onClick={() => setShowCustomerSites(!showCustomerSites)}
              className={`p-1.5 text-[10px] font-mono rounded-sm border transition cursor-pointer flex items-center gap-1 ${
                showCustomerSites ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-white/5 text-slate-500 border-white/10'
              }`}
              title="Toggle Customer Sites"
            >
              <MapPin className="w-3 h-3" /> Sites
            </button>

            <button
              onClick={handleFitAllCorridors}
              className="p-1.5 text-[10px] font-mono rounded-sm bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition cursor-pointer flex items-center gap-1"
              title="Reset View to National Corridors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

        </div>

      </div>

      {/* Main Map View Area with Floating Telemetry Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-8 xl:col-span-9 h-[480px] sm:h-[540px] relative w-full bg-[#0A0A0B]">
          <div 
            ref={mapContainerRef} 
            className="w-full h-full z-0"
            style={{ backgroundColor: '#0A0A0B' }}
          />

          {/* Micro Map Overlay Legend */}
          <div className="absolute bottom-3 left-3 z-[400] bg-[#0A0A0B]/90 backdrop-blur-md border border-white/10 rounded-sm p-2 text-[10px] font-mono space-y-1 shadow-lg pointer-events-auto">
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Fleet Telemetry Key</div>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00]" /> In Transit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Loading Bay
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Staging Ready
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F43F5E]" /> Maintenance
              </span>
            </div>
          </div>
        </div>

        {/* Right Telemetry & Tanker Inspector Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 bg-[#0F0F11] border-t lg:border-t-0 lg:border-l border-white/10 p-4 flex flex-col justify-between h-[480px] sm:h-[540px] overflow-y-auto space-y-4">
          
          {/* Section 1: Selected Tanker Detail */}
          {selectedTelemetry ? (
            <div className="space-y-3.5">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Assigned Fleet Asset</span>
                  <h4 className="text-base font-bold font-mono text-white flex items-center gap-2">
                    <span>{selectedTelemetry.tankerId}</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm border uppercase ${
                      selectedTelemetry.status === 'IN_TRANSIT' ? 'bg-[#FF6B00]/10 text-[#FF6B00] border-[#FF6B00]/30' :
                      selectedTelemetry.status === 'ON_DELIVERY' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      selectedTelemetry.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {selectedTelemetry.status.replace('_', ' ')}
                    </span>
                  </h4>
                </div>

                <button
                  onClick={() => handleFocusTanker(selectedTelemetry.tankerId)}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 text-slate-300 rounded-sm border border-white/10 text-[10px] font-mono transition flex items-center gap-1 cursor-pointer"
                  title="Center map on this tanker"
                >
                  <Maximize2 className="w-3 h-3 text-[#FF6B00]" /> Center
                </button>
              </div>

              {/* Live Gauges: Speed & Bearing & Coordinates */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-[#0A0A0B] border border-white/10 p-2 rounded-sm">
                  <span className="text-[8px] text-slate-500 uppercase block">GPS Speed</span>
                  <span className="text-sm font-bold text-white flex items-center justify-center gap-1">
                    <Gauge className="w-3 h-3 text-[#FF6B00]" />
                    {selectedTelemetry.speedKmH} <span className="text-[9px] text-slate-500 font-normal">km/h</span>
                  </span>
                </div>

                <div className="bg-[#0A0A0B] border border-white/10 p-2 rounded-sm">
                  <span className="text-[8px] text-slate-500 uppercase block">Heading</span>
                  <span className="text-sm font-bold text-white flex items-center justify-center gap-1">
                    <Compass className="w-3 h-3 text-[#FF6B00]" />
                    {selectedTelemetry.headingDeg}° <span className="text-[9px] text-slate-400">{degreesToCardinal(selectedTelemetry.headingDeg)}</span>
                  </span>
                </div>

                <div className="bg-[#0A0A0B] border border-white/10 p-2 rounded-sm">
                  <span className="text-[8px] text-slate-500 uppercase block">Temperature</span>
                  <span className="text-sm font-bold text-white">
                    {selectedTelemetry.tempCelsius}°C
                  </span>
                </div>
              </div>

              {/* Location telemetry strip */}
              <div className="bg-[#0A0A0B] border border-white/10 p-2.5 rounded-sm space-y-1.5 font-mono text-[11px]">
                <div className="flex items-start gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Current Segment</span>
                    <span className="text-white font-semibold text-xs leading-tight block">
                      {selectedTelemetry.currentLocationName}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      GPS: {selectedTelemetry.lat.toFixed(4)}, {selectedTelemetry.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-slate-300 pt-1.5 border-t border-white/10">
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">ETA Target</span>
                    <span className="text-sky-300 font-bold">{selectedTelemetry.eta}</span>
                  </div>
                </div>
              </div>

              {/* Cargo & Compartment Spec */}
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex justify-between text-slate-400 border-b border-white/10 pb-1">
                  <span>Product Cargo:</span>
                  <strong className="text-[#FF6B00] font-bold">{selectedTelemetry.cargoDescription}</strong>
                </div>
                <div className="flex justify-between text-slate-400 border-b border-white/10 pb-1">
                  <span>Payload Volume:</span>
                  <span className="text-white font-bold">{selectedTelemetry.cargoVolume.toLocaleString()} Litres</span>
                </div>
                <div className="flex justify-between text-slate-400 border-b border-white/10 pb-1">
                  <span>Assigned Driver:</span>
                  <span className="text-slate-200">{selectedTelemetry.driverName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Seal Verification:</span>
                  <span className="text-emerald-400 font-semibold">{selectedTelemetry.sealStatus}</span>
                </div>
              </div>

              {/* Action Buttons for active shipment */}
              {selectedTelemetry.activeDeliveryRef && (
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onOpenTrackingModal(selectedTelemetry.activeDeliveryRef!)}
                    className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded-sm border border-white/10 transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3 text-[#FF6B00]" />
                    <span>Track {selectedTelemetry.activeDeliveryRef}</span>
                  </button>

                  <a
                    href={`tel:${selectedTelemetry.driverPhone}`}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-sm border border-white/10 transition"
                    title="Direct Driver Comm"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" />
                  </a>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 space-y-2">
              <Truck className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs font-mono">Select a tanker from the list below to view telemetry</p>
            </div>
          )}

          {/* Section 2: Quick Tanker Selector List */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              Registered BRV Assets ({displayedTankers.length})
            </span>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {displayedTankers.map(t => {
                const isSelected = selectedTankerId === t.tankerId;
                return (
                  <button
                    key={t.tankerId}
                    onClick={() => handleFocusTanker(t.tankerId)}
                    className={`w-full text-left p-2 rounded-sm border text-xs font-mono transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-[#FF6B00] text-white shadow-sm'
                        : 'bg-[#0A0A0B] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        t.status === 'IN_TRANSIT' ? 'bg-[#FF6B00]' :
                        t.status === 'ON_DELIVERY' ? 'bg-amber-400' :
                        t.status === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`} />
                      <span className="font-bold text-white">{t.tankerId}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-slate-500">{t.speedKmH} km/h</span>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

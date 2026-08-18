import { 
  Tanker, 
  Driver, 
  FuelProduct, 
  DeliveryRequest, 
  Invoice, 
  Quote, 
  SafetyDocument, 
  MaintenanceRecord, 
  CMSContent, 
  FAQItem, 
  User, 
  Company,
  PricingConfig
} from '../types';

export const initialPricingConfig: PricingConfig = {
  basePerLiterRate: 0.085,
  volumeDiscountThreshold36k: 0.065,
  distancePerKmRate: 3.50,
  urgent24hMultiplier: 1.25,
  emergencySameDayMultiplier: 1.45,
  specialHandlingFee: 250,
  statutoryTaxRate: 0.15,
  currency: 'USD / GHS Equiv'
};

export const initialUsers: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Logistics Operations Director',
    email: 'operations@armtells.com',
    phone: '+233 24 000 1100',
    role: 'SUPER_ADMIN',
    createdAt: '2026-01-10T08:00:00Z'
  },
  {
    id: 'usr-dispatch-01',
    name: 'Chief Dispatcher',
    email: 'dispatch@armtells.com',
    phone: '+233 24 000 1101',
    role: 'DISPATCHER',
    createdAt: '2026-01-15T08:00:00Z'
  },
  {
    id: 'usr-finance-01',
    name: 'Finance & Invoicing Lead',
    email: 'accounts@armtells.com',
    phone: '+233 24 000 1102',
    role: 'FINANCE',
    createdAt: '2026-01-20T08:00:00Z'
  },
  {
    id: 'usr-driver-01',
    name: 'Samuel Mensah',
    email: 'samuel.mensah@armtells.com',
    phone: '+233 24 555 3001',
    role: 'DRIVER',
    assignedTankerId: 'tanker-01',
    driverLicenseNumber: 'GH-DRV-90822-CL-F',
    hazmatCertExpiry: '2027-04-30',
    createdAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'usr-driver-02',
    name: 'Emmanuel Kofi',
    email: 'emmanuel.kofi@armtells.com',
    phone: '+233 24 555 3002',
    role: 'DRIVER',
    assignedTankerId: 'tanker-02',
    driverLicenseNumber: 'GH-DRV-81442-CL-F',
    hazmatCertExpiry: '2027-06-15',
    createdAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'usr-client-01',
    name: 'Kwame Ansah (Procurement Manager)',
    email: 'procurement@goldridge-mining.com',
    phone: '+233 20 888 4001',
    role: 'CUSTOMER',
    companyId: 'comp-01',
    createdAt: '2026-02-10T09:00:00Z'
  }
];

export const initialCompanies: Company[] = [
  {
    id: 'comp-01',
    name: 'GoldRidge Heavy Mining Ltd',
    industry: 'Mining & Heavy Extraction',
    registrationNumber: 'CS-90123-2018',
    taxId: 'TIN-C00849201',
    phone: '+233 30 290 8811',
    email: 'fuel.logistics@goldridge-mining.com',
    address: 'Plot 14 Industrial Mining Belt, Tarkwa, Western Region',
    billingEmail: 'accounts@goldridge-mining.com',
    paymentTerms: 'Net 30 Days',
    isVerified: true,
    createdAt: '2026-01-05T00:00:00Z',
    authorizedDeliverySites: [
      {
        id: 'site-01',
        name: 'Tarkwa Main Pit Bulk Storage Depot',
        siteType: 'MINING_SITE',
        addressLine: 'Sector 4 Extraction Valley, Tarkwa',
        city: 'Tarkwa',
        region: 'Western Region',
        gpsCoordinates: { lat: 5.3014, lng: -1.9841 },
        tankCapacityLiters: 120000,
        contactPerson: 'David K. Ofori (Mine Logistics Officer)',
        contactPhone: '+233 24 499 1234',
        specialAccessInstructions: 'Gate 2 Heavy Vehicle Clearance. High-visibility PPE and spark-arrestor check mandatory.'
      },
      {
        id: 'site-02',
        name: 'Damang Processing Plant Generator Farm',
        siteType: 'GENERATOR_PLANT',
        addressLine: 'Off Tarkwa-Bogoso Road, Damang',
        city: 'Damang',
        region: 'Western Region',
        gpsCoordinates: { lat: 5.4831, lng: -1.8920 },
        tankCapacityLiters: 80000,
        contactPerson: 'Kwame Ansah',
        contactPhone: '+233 20 888 4001',
        specialAccessInstructions: 'Depot transfer requires double bonding earthing clamp before unsealing valves.'
      }
    ]
  },
  {
    id: 'comp-02',
    name: 'Apex Energy Retail Network',
    industry: 'Fuel Retail & Service Stations',
    registrationNumber: 'CS-54911-2020',
    taxId: 'TIN-C00281729',
    phone: '+233 30 271 6620',
    email: 'supply@apexenergygh.com',
    address: 'Ring Road Central, Accra',
    billingEmail: 'finance@apexenergygh.com',
    paymentTerms: 'Advance / COD',
    isVerified: true,
    createdAt: '2026-01-12T00:00:00Z',
    authorizedDeliverySites: [
      {
        id: 'site-03',
        name: 'Apex Station #14 Spintex Road',
        siteType: 'FUEL_STATION',
        addressLine: 'Near Kotoka Bypass, Spintex Road',
        city: 'Accra',
        region: 'Greater Accra',
        gpsCoordinates: { lat: 5.6288, lng: -0.1152 },
        tankCapacityLiters: 45000,
        contactPerson: 'Eric Mensah (Station Supervisor)',
        contactPhone: '+233 24 333 9081',
        specialAccessInstructions: 'Deliveries permitted 05:00-08:00 or 20:00-23:00 to avoid traffic congestion.'
      }
    ]
  }
];

export const initialFuelProducts: FuelProduct[] = [
  {
    id: 'prod-01',
    code: 'DIESEL_AGO',
    name: 'Automotive Gas Oil (AGO / Diesel)',
    unNumber: 'UN 1202',
    hazardClass: 'Class 3 Flammable Liquid (Hazard 30)',
    description: 'Low-sulphur 50ppm high-spec diesel engineered for heavy industrial machinery, commercial transport fleets, and prime continuous generator installations.',
    densityKgPerM3: 840,
    standardUnit: 'Litres',
    flashPoint: '> 55°C',
    typicalApplications: ['Mining Dump Trucks & Excavators', 'Manufacturing Power Plants', 'Commercial Fuel Stations', 'Heavy Construction Sites'],
    isActive: true
  },
  {
    id: 'prod-02',
    code: 'PETROL_PMS',
    name: 'Premium Motor Spirit (PMS / Petrol)',
    unNumber: 'UN 1203',
    hazardClass: 'Class 3 Highly Flammable Liquid (Hazard 33)',
    description: 'High-octane unleaded fuel (RON 91 / 95) for retail service station distribution and light vehicle fleet logistics.',
    densityKgPerM3: 740,
    standardUnit: 'Litres',
    flashPoint: '< -40°C',
    typicalApplications: ['Retail Fuel Stations', 'Commercial Vehicle Depots', 'Government & Corporate Fleets'],
    isActive: true
  },
  {
    id: 'prod-03',
    code: 'JET_A1',
    name: 'Aviation Turbine Fuel (Jet A-1)',
    unNumber: 'UN 1863',
    hazardClass: 'Class 3 Flammable Liquid',
    description: 'Ultra-pure kerosene-grade aviation turbine fuel transported in dedicated, stainless steel/epoxy lined dedicated tankers with continuous filtration monitoring.',
    densityKgPerM3: 804,
    standardUnit: 'Litres',
    flashPoint: '> 38°C',
    typicalApplications: ['Commercial Aviation Fuel Depots', 'Helicopter Base Refueling', 'Remote Mining Airstrips'],
    isActive: true
  },
  {
    id: 'prod-04',
    code: 'HEAVY_FUEL_OIL_HFO',
    name: 'Heavy Fuel Oil (HFO / MGO)',
    unNumber: 'UN 3082',
    hazardClass: 'Class 9 Environmentally Hazardous / Flammable Class 3',
    description: 'Residual industrial heating and heavy maritime propulsion fuel transported using insulated, steam/electric jacket heated tankers.',
    densityKgPerM3: 980,
    standardUnit: 'Metric Tonnes / Litres',
    flashPoint: '> 60°C',
    typicalApplications: ['Thermal Power Plants', 'Steel Mills & Smelters', 'Bunkering Operations'],
    isActive: true
  },
  {
    id: 'prod-05',
    code: 'KEROSENE',
    name: 'Illuminating Kerosene',
    unNumber: 'UN 1223',
    hazardClass: 'Class 3 Flammable Liquid',
    description: 'Refined hydrocarbon fuel for specialized heating, domestic distribution, and industrial solvent applications.',
    densityKgPerM3: 800,
    standardUnit: 'Litres',
    flashPoint: '> 38°C',
    typicalApplications: ['Rural Retail Depots', 'Industrial Burner Systems'],
    isActive: true
  },
  {
    id: 'prod-06',
    code: 'LUBRICANTS_BULK',
    name: 'Bulk Engine & Industrial Lubricants',
    unNumber: 'N/A Non-Regulated Hazmat',
    hazardClass: 'Industrial Grade Oils',
    description: 'Bulk delivery of engine oils (15W-40, 10W-40) and hydraulic fluids using compartmentalized metered pump tankers.',
    densityKgPerM3: 880,
    standardUnit: 'Litres',
    flashPoint: '> 210°C',
    typicalApplications: ['Mine Maintenance Workshops', 'Bus & Haulage Depots'],
    isActive: true
  }
];

export const initialTankers: Tanker[] = [
  {
    id: 'tanker-01',
    tankerId: 'ART-TK-01',
    registrationNumber: 'GN-4821-23',
    makeModel: 'Volvo FH 500 6x4 Heavy Tanker',
    tankCapacityLiters: 45000,
    compartments: [
      { compartmentNumber: 1, capacityLiters: 10000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 10000 },
      { compartmentNumber: 2, capacityLiters: 10000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 10000 },
      { compartmentNumber: 3, capacityLiters: 10000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 10000 },
      { compartmentNumber: 4, capacityLiters: 10000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 10000 },
      { compartmentNumber: 5, capacityLiters: 5000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 5000 },
    ],
    dedicatedProducts: ['DIESEL_AGO', 'PETROL_PMS'],
    status: 'IN_TRANSIT',
    currentLocationName: 'N1 Highway (Near Winneba Junction)',
    currentGps: { lat: 5.3521, lng: -0.6288 },
    assignedDriverId: 'usr-driver-01',
    assignedDriverName: 'Samuel Mensah',
    lastInspectionDate: '2026-01-14',
    nextMaintenanceDate: '2026-09-20',
    calibrationCertificateNumber: 'CAL-GH-NPA-2026-441',
    calibrationExpiry: '2027-01-14',
    hasBottomLoading: true,
    hasVaporRecovery: true,
    hasDigitalFlowMeter: true,
    hasHighFlowPump: true,
    imageUrl: '/src/assets/images/volvo_fh500_tanker_1787055546514.jpg',
    notes: 'Equipped with certified pneumatic emergency shut-off valves and dual earthing grounding sensors.',
    isDemo: false
  },
  {
    id: 'tanker-02',
    tankerId: 'ART-TK-02',
    registrationNumber: 'GT-1904-24',
    makeModel: 'Volvo FMX 460 6x4 Heavy Hauler',
    tankCapacityLiters: 36000,
    compartments: [
      { compartmentNumber: 1, capacityLiters: 10000, currentProduct: 'Petrol (PMS)', currentVolumeLiters: 10000 },
      { compartmentNumber: 2, capacityLiters: 10000, currentProduct: 'Petrol (PMS)', currentVolumeLiters: 10000 },
      { compartmentNumber: 3, capacityLiters: 10000, currentProduct: 'Petrol (PMS)', currentVolumeLiters: 10000 },
      { compartmentNumber: 4, capacityLiters: 6000, currentProduct: 'Petrol (PMS)', currentVolumeLiters: 6000 },
    ],
    dedicatedProducts: ['PETROL_PMS', 'DIESEL_AGO'],
    status: 'ON_DELIVERY',
    currentLocationName: 'Tema Bulk Oil Storage Depot (Gantry Loading Bay 3)',
    currentGps: { lat: 5.6821, lng: 0.0124 },
    assignedDriverId: 'usr-driver-02',
    assignedDriverName: 'Emmanuel Kofi',
    lastInspectionDate: '2026-02-02',
    nextMaintenanceDate: '2026-08-30',
    calibrationCertificateNumber: 'CAL-GH-NPA-2026-788',
    calibrationExpiry: '2027-02-02',
    hasBottomLoading: true,
    hasVaporRecovery: true,
    hasDigitalFlowMeter: true,
    hasHighFlowPump: false,
    imageUrl: '/src/assets/images/volvo_fmx460_hauler_1787055560785.jpg',
    notes: 'Calibrated specifically for retail service station multi-compartment drop off.',
    isDemo: false
  },
  {
    id: 'tanker-03',
    tankerId: 'ART-TK-03',
    registrationNumber: 'GW-8832-22',
    makeModel: 'Mercedes-Benz Actros 3344 6x4',
    tankCapacityLiters: 28000,
    compartments: [
      { compartmentNumber: 1, capacityLiters: 10000, currentProduct: 'Empty / Vapor Purged', currentVolumeLiters: 0 },
      { compartmentNumber: 2, capacityLiters: 10000, currentProduct: 'Empty / Vapor Purged', currentVolumeLiters: 0 },
      { compartmentNumber: 3, capacityLiters: 8000, currentProduct: 'Empty / Vapor Purged', currentVolumeLiters: 0 },
    ],
    dedicatedProducts: ['DIESEL_AGO', 'KEROSENE'],
    status: 'AVAILABLE',
    currentLocationName: 'Tema Central Logistics Staging Yard',
    currentGps: { lat: 5.6702, lng: 0.0019 },
    assignedDriverName: 'Kwabena Boateng',
    lastInspectionDate: '2026-01-28',
    nextMaintenanceDate: '2026-10-15',
    calibrationCertificateNumber: 'CAL-GH-NPA-2026-119',
    calibrationExpiry: '2027-01-28',
    hasBottomLoading: true,
    hasVaporRecovery: true,
    hasDigitalFlowMeter: true,
    hasHighFlowPump: true,
    imageUrl: '/src/assets/images/actros_3344_hauler_1787055574185.jpg',
    notes: 'High-speed discharge pump (850 L/min) ideal for fast turnaround factory generator tank fills.',
    isDemo: false
  },
  {
    id: 'tanker-04',
    tankerId: 'ART-TK-04',
    registrationNumber: 'GE-3310-25',
    makeModel: 'MAN TGS 33.480 6x4 B-Train Aluminum Tanker',
    tankCapacityLiters: 48000,
    compartments: [
      { compartmentNumber: 1, capacityLiters: 12000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 12000 },
      { compartmentNumber: 2, capacityLiters: 12000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 12000 },
      { compartmentNumber: 3, capacityLiters: 12000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 12000 },
      { compartmentNumber: 4, capacityLiters: 12000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 12000 },
    ],
    dedicatedProducts: ['DIESEL_AGO'],
    status: 'AVAILABLE',
    currentLocationName: 'Tema Heavy Industrial Area Base',
    currentGps: { lat: 5.6750, lng: 0.0210 },
    assignedDriverName: 'Isaac Darko',
    lastInspectionDate: '2026-02-10',
    nextMaintenanceDate: '2026-11-01',
    calibrationCertificateNumber: 'CAL-GH-NPA-2026-904',
    calibrationExpiry: '2027-02-10',
    hasBottomLoading: true,
    hasVaporRecovery: true,
    hasDigitalFlowMeter: true,
    hasHighFlowPump: true,
    imageUrl: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1200&q=80',
    notes: 'Max-payload aluminum alloy barrel designed for long-distance mining bulk replenishment haulage.',
    isDemo: false
  },
  {
    id: 'tanker-05',
    tankerId: 'ART-TK-05',
    registrationNumber: 'GS-7712-24',
    makeModel: 'Iveco T-Way 430 Rigid 4x2 Urban Delivery Tanker',
    tankCapacityLiters: 18000,
    compartments: [
      { compartmentNumber: 1, capacityLiters: 6000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 0 },
      { compartmentNumber: 2, capacityLiters: 6000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 0 },
      { compartmentNumber: 3, capacityLiters: 6000, currentProduct: 'Diesel (AGO)', currentVolumeLiters: 0 },
    ],
    dedicatedProducts: ['DIESEL_AGO'],
    status: 'AVAILABLE',
    currentLocationName: 'Accra North Staging Hub',
    currentGps: { lat: 5.6110, lng: -0.1980 },
    assignedDriverName: 'Joseph Osei',
    lastInspectionDate: '2026-01-05',
    nextMaintenanceDate: '2026-09-10',
    calibrationCertificateNumber: 'CAL-GH-NPA-2026-552',
    calibrationExpiry: '2027-01-05',
    hasBottomLoading: true,
    hasVaporRecovery: true,
    hasDigitalFlowMeter: true,
    hasHighFlowPump: true,
    imageUrl: 'https://images.unsplash.com/photo-1562971179-4ad6903a7ed6?auto=format&fit=crop&w=1200&q=80',
    notes: 'Equipped with 45-meter electric hose reel and automatic shutoff nozzle for tight urban construction sites.',
    isDemo: false
  },
  {
    id: 'tanker-06',
    tankerId: 'ART-TK-06',
    registrationNumber: 'GT-6019-21',
    makeModel: 'Volvo FH 500 6x4 Heavy Tanker',
    tankCapacityLiters: 45000,
    compartments: [
      { compartmentNumber: 1, capacityLiters: 10000, currentVolumeLiters: 0 },
      { compartmentNumber: 2, capacityLiters: 10000, currentVolumeLiters: 0 },
      { compartmentNumber: 3, capacityLiters: 10000, currentVolumeLiters: 0 },
      { compartmentNumber: 4, capacityLiters: 10000, currentVolumeLiters: 0 },
      { compartmentNumber: 5, capacityLiters: 5000, currentVolumeLiters: 0 },
    ],
    dedicatedProducts: ['DIESEL_AGO', 'HEAVY_FUEL_OIL_HFO'],
    status: 'UNDER_MAINTENANCE',
    currentLocationName: 'Authorized Volvo Workshop, Tema',
    currentGps: { lat: 5.6601, lng: 0.0050 },
    lastInspectionDate: '2025-11-15',
    nextMaintenanceDate: '2026-08-25',
    calibrationCertificateNumber: 'CAL-GH-NPA-2025-331',
    calibrationExpiry: '2026-11-15',
    hasBottomLoading: true,
    hasVaporRecovery: false,
    hasDigitalFlowMeter: false,
    hasHighFlowPump: true,
    imageUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    notes: 'Scheduled 90-day hydrostatic tank re-certification & pressure relief valve recalibration.',
    isDemo: false
  }
];

export const initialDrivers: Driver[] = [
  {
    id: 'drv-01',
    fullName: 'Samuel Mensah',
    driverCode: 'DRV-ART-001',
    phone: '+233 24 555 3001',
    email: 'samuel.mensah@armtells.com',
    licenseNumber: 'GH-DRV-90822-CL-F',
    dangerousGoodsCertNumber: 'HAZ-NPA-2025-0891',
    certExpiryDate: '2027-04-30',
    yearsOfExperience: 14,
    status: 'ON_DELIVERY',
    assignedTankerId: 'tanker-01',
    assignedTankerRegistration: 'GN-4821-23',
    medicalFitnessExpiry: '2027-01-10',
    emergencyContact: '+233 24 411 9922 (Grace Mensah - Spouse)',
    rating: 4.95
  },
  {
    id: 'drv-02',
    fullName: 'Emmanuel Kofi',
    driverCode: 'DRV-ART-002',
    phone: '+233 24 555 3002',
    email: 'emmanuel.kofi@armtells.com',
    licenseNumber: 'GH-DRV-81442-CL-F',
    dangerousGoodsCertNumber: 'HAZ-NPA-2025-0442',
    certExpiryDate: '2027-06-15',
    yearsOfExperience: 11,
    status: 'ON_DUTY',
    assignedTankerId: 'tanker-02',
    assignedTankerRegistration: 'GT-1904-24',
    medicalFitnessExpiry: '2027-03-20',
    emergencyContact: '+233 20 771 8833 (Kofi Senior - Brother)',
    rating: 4.9
  },
  {
    id: 'drv-03',
    fullName: 'Kwabena Boateng',
    driverCode: 'DRV-ART-003',
    phone: '+233 24 555 3003',
    email: 'kwabena.boateng@armtells.com',
    licenseNumber: 'GH-DRV-73319-CL-F',
    dangerousGoodsCertNumber: 'HAZ-NPA-2025-1102',
    certExpiryDate: '2027-02-18',
    yearsOfExperience: 9,
    status: 'ON_DUTY',
    assignedTankerId: 'tanker-03',
    assignedTankerRegistration: 'GW-8832-22',
    medicalFitnessExpiry: '2027-05-12',
    emergencyContact: '+233 27 662 1009',
    rating: 4.88
  },
  {
    id: 'drv-04',
    fullName: 'Isaac Darko',
    driverCode: 'DRV-ART-004',
    phone: '+233 24 555 3004',
    email: 'isaac.darko@armtells.com',
    licenseNumber: 'GH-DRV-65902-CL-F',
    dangerousGoodsCertNumber: 'HAZ-NPA-2025-0721',
    certExpiryDate: '2027-08-01',
    yearsOfExperience: 16,
    status: 'ON_DUTY',
    assignedTankerId: 'tanker-04',
    assignedTankerRegistration: 'GE-3310-25',
    medicalFitnessExpiry: '2027-04-15',
    emergencyContact: '+233 24 881 2299',
    rating: 4.98
  }
];

export const initialDeliveryRequests: DeliveryRequest[] = [
  {
    id: 'del-01',
    requestNumber: 'ART-2026-000101',
    customerId: 'comp-01',
    customerName: 'Kwame Ansah',
    companyName: 'GoldRidge Heavy Mining Ltd',
    customerPhone: '+233 20 888 4001',
    customerEmail: 'fuel.logistics@goldridge-mining.com',
    pickupLocation: 'Tema Oil Refinery (TOR) Bulk Depot Gantry #4',
    deliveryLocation: 'Tarkwa Main Pit Bulk Storage Depot (Sector 4 Extraction Valley)',
    deliveryAddressDetails: 'Plot 14 Mining Corridor, Tarkwa, Western Region',
    destinationCoordinates: { lat: 5.3014, lng: -1.9841 },
    siteType: 'Mining Heavy Fuel Installation',
    productType: 'DIESEL_AGO',
    productName: 'Automotive Gas Oil (AGO Low-Sulphur 50ppm)',
    quantityLiters: 45000,
    preferredDate: '2026-08-18',
    preferredTimeWindow: '14:00 - 18:00',
    specialInstructions: 'Tamper-evident metal bolt seals must be verified at security gate. High-pressure bottom discharge.',
    status: 'IN_TRANSIT',
    assignedTankerId: 'tanker-01',
    assignedTankerReg: 'GN-4821-23 (Volvo FMX 460)',
    assignedDriverId: 'drv-01',
    assignedDriverName: 'Samuel Mensah',
    assignedDriverPhone: '+233 24 555 3001',
    currentGps: { lat: 5.3521, lng: -0.6288 },
    estimatedArrival: 'Today at 16:45 GMT',
    quotedAmount: 4850,
    currency: 'USD',
    isUrgent: false,
    createdAt: '2026-08-17T11:20:00Z',
    updatedAt: '2026-08-18T09:15:00Z',
    statusHistory: [
      {
        status: 'REQUEST_RECEIVED',
        timestamp: '2026-08-17T11:20:00Z',
        location: 'Armtells Operations Central Portal',
        note: 'Electronic delivery order received and validated against Master Supply Agreement.',
        updatedBy: 'Kwame Ansah (Customer Procurement)'
      },
      {
        status: 'DISPATCH_CONFIRMED',
        timestamp: '2026-08-17T13:00:00Z',
        location: 'Operations Dispatch Center, Tema',
        note: 'Terminal allocation cleared. Delivery slot approved.',
        updatedBy: 'Chief Dispatcher'
      },
      {
        status: 'TANKER_ASSIGNED',
        timestamp: '2026-08-17T15:30:00Z',
        location: 'Armtells Staging Yard',
        note: 'Assigned 45,000L ADR-certified tanker GN-4821-23 and driver Samuel Mensah.',
        updatedBy: 'Chief Dispatcher'
      },
      {
        status: 'LOADING',
        timestamp: '2026-08-18T06:30:00Z',
        location: 'Tema Oil Refinery Gantry #4',
        note: '45,000 Litres AGO bottom-loaded. Compartment seals #ARM-88910 through #ARM-88914 affixed.',
        updatedBy: 'Samuel Mensah (Driver)'
      },
      {
        status: 'IN_TRANSIT',
        timestamp: '2026-08-18T08:15:00Z',
        location: 'Tema Depot Exit / N1 Coastal Corridor',
        note: 'Tanker dispatched onto Western Corridor. Telemetry active.',
        updatedBy: 'Samuel Mensah (Driver)'
      }
    ]
  },
  {
    id: 'del-02',
    requestNumber: 'ART-2026-000102',
    customerId: 'comp-02',
    customerName: 'Eric Mensah',
    companyName: 'Apex Energy Retail Network',
    customerPhone: '+233 24 333 9081',
    customerEmail: 'supply@apexenergygh.com',
    pickupLocation: 'Tema Bulk Oil Storage Terminal (BOST)',
    deliveryLocation: 'Apex Station #14 Spintex Road, Accra',
    deliveryAddressDetails: 'Near Kotoka Bypass, Spintex Road, Accra',
    destinationCoordinates: { lat: 5.6288, lng: -0.1152 },
    siteType: 'Fuel Retail Service Station',
    productType: 'PETROL_PMS',
    productName: 'Premium Motor Spirit (PMS Unleaded)',
    quantityLiters: 36000,
    preferredDate: '2026-08-18',
    preferredTimeWindow: '11:00 - 14:00',
    specialInstructions: 'Dipstick check required before and after drop. Standard 4-inch camlock gravity drop.',
    status: 'LOADING',
    assignedTankerId: 'tanker-02',
    assignedTankerReg: 'GT-1904-24 (Mercedes Actros)',
    assignedDriverId: 'drv-02',
    assignedDriverName: 'Emmanuel Kofi',
    assignedDriverPhone: '+233 24 555 3002',
    currentGps: { lat: 5.6821, lng: 0.0124 },
    estimatedArrival: 'Today at 13:15 GMT',
    quotedAmount: 1850,
    currency: 'USD',
    isUrgent: true,
    createdAt: '2026-08-18T05:00:00Z',
    updatedAt: '2026-08-18T09:40:00Z',
    statusHistory: [
      {
        status: 'REQUEST_RECEIVED',
        timestamp: '2026-08-18T05:00:00Z',
        location: 'Online Booking System',
        note: 'Urgent station replenishment booking submitted.',
        updatedBy: 'Eric Mensah'
      },
      {
        status: 'DISPATCH_CONFIRMED',
        timestamp: '2026-08-18T05:45:00Z',
        location: 'Tema Dispatch Hub',
        note: 'Approved for morning dispatch cycle.',
        updatedBy: 'Chief Dispatcher'
      },
      {
        status: 'TANKER_ASSIGNED',
        timestamp: '2026-08-18T06:15:00Z',
        location: 'Tema Logistics Hub',
        note: 'Assigned Tanker GT-1904-24 with Driver Emmanuel Kofi.',
        updatedBy: 'Chief Dispatcher'
      },
      {
        status: 'LOADING',
        timestamp: '2026-08-18T08:30:00Z',
        location: 'BOST Terminal Loading Gantry 3',
        note: 'Top and bottom loading verification underway.',
        updatedBy: 'Emmanuel Kofi (Driver)'
      }
    ]
  },
  {
    id: 'del-03',
    requestNumber: 'ART-2026-000098',
    customerId: 'comp-01',
    customerName: 'David K. Ofori',
    companyName: 'GoldRidge Heavy Mining Ltd',
    customerPhone: '+233 24 499 1234',
    customerEmail: 'fuel.logistics@goldridge-mining.com',
    pickupLocation: 'Tema Oil Refinery (TOR) Bulk Depot',
    deliveryLocation: 'Damang Processing Plant Generator Farm',
    deliveryAddressDetails: 'Off Tarkwa-Bogoso Road, Damang, Western Region',
    destinationCoordinates: { lat: 5.4831, lng: -1.8920 },
    siteType: 'Power Generation Installation',
    productType: 'DIESEL_AGO',
    productName: 'Automotive Gas Oil (AGO)',
    quantityLiters: 45000,
    preferredDate: '2026-08-16',
    preferredTimeWindow: '08:00 - 12:00',
    status: 'DELIVERED',
    assignedTankerId: 'tanker-01',
    assignedTankerReg: 'GN-4821-23',
    assignedDriverId: 'drv-01',
    assignedDriverName: 'Samuel Mensah',
    quotedAmount: 4850,
    currency: 'USD',
    proofOfDeliveryId: 'pod-000098',
    invoiceId: 'inv-000089',
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-16T11:45:00Z',
    statusHistory: [
      {
        status: 'REQUEST_RECEIVED',
        timestamp: '2026-08-15T09:00:00Z',
        location: 'Operations Portal',
        note: 'Order submitted.',
        updatedBy: 'David K. Ofori'
      },
      {
        status: 'DISPATCH_CONFIRMED',
        timestamp: '2026-08-15T10:00:00Z',
        location: 'Tema Dispatch Center',
        note: 'Terminal loading confirmed.',
        updatedBy: 'Chief Dispatcher'
      },
      {
        status: 'TANKER_ASSIGNED',
        timestamp: '2026-08-15T11:00:00Z',
        location: 'Staging Depot',
        note: 'Assigned GN-4821-23.',
        updatedBy: 'Chief Dispatcher'
      },
      {
        status: 'LOADING',
        timestamp: '2026-08-15T16:00:00Z',
        location: 'TOR Terminal',
        note: '45,000L loaded.',
        updatedBy: 'Samuel Mensah'
      },
      {
        status: 'IN_TRANSIT',
        timestamp: '2026-08-16T04:30:00Z',
        location: 'Corridor Transit',
        note: 'En route to Damang.',
        updatedBy: 'Samuel Mensah'
      },
      {
        status: 'ARRIVING',
        timestamp: '2026-08-16T10:30:00Z',
        location: 'Damang Plant Gate',
        note: 'Security clearance completed.',
        updatedBy: 'Samuel Mensah'
      },
      {
        status: 'DELIVERED',
        timestamp: '2026-08-16T11:45:00Z',
        location: 'Damang Generator Tank Farm',
        note: 'Full volume discharged. Digital Proof of Delivery signed by Plant Engineer.',
        updatedBy: 'Samuel Mensah (Driver)'
      }
    ]
  }
];

export const initialQuotes: Quote[] = [
  {
    id: 'quo-01',
    quoteNumber: 'ART-QUO-2026-0042',
    customerName: 'Alhaji Haruna Bello',
    companyName: 'Northern Haulage & Industrial Millers',
    email: 'h.bello@northernhaulege.com',
    phone: '+233 24 490 1122',
    pickupLocation: 'Tema Oil Refinery Bulk Terminal',
    deliveryLocation: 'Tamale Industrial Light Industrial Area, Northern Region',
    productType: 'DIESEL_AGO',
    quantityLiters: 90000,
    deliveryDate: '2026-08-25',
    frequency: 'WEEKLY',
    distanceKm: 620,
    urgency: 'STANDARD',
    specialRequirements: 'Requires 2x 45,000L B-Train tankers dispatched in convoy. Dedicated high-flow offloading hoses.',
    baseTransportRatePerLiter: 0.065,
    distanceRatePerKm: 3.50,
    urgencySurcharge: 0,
    handlingFee: 250,
    subtotal: 8270,
    taxAmount: 1240.5,
    totalAmount: 9510.5,
    currency: 'USD',
    status: 'CALCULATED',
    validUntil: '2026-09-10',
    notes: 'Quotation includes long-distance transit insurance, escort coordination, and 3 hours offloading allowance.',
    createdAt: '2026-08-17T14:30:00Z'
  },
  {
    id: 'quo-02',
    quoteNumber: 'ART-QUO-2026-0043',
    customerName: 'Sarah Boateng',
    companyName: 'Accra Precast Concrete Works',
    email: 'sboateng@accraprecast.com',
    phone: '+233 20 334 5566',
    pickupLocation: 'Tema Bulk Fuel Depot',
    deliveryLocation: 'Prampram Heavy Casting Yard',
    productType: 'DIESEL_AGO',
    quantityLiters: 18000,
    deliveryDate: '2026-08-21',
    frequency: 'BI_WEEKLY',
    distanceKm: 42,
    urgency: 'URGENT_24H',
    specialRequirements: 'Compact rigid tanker required due to soft unpaved access road on site.',
    baseTransportRatePerLiter: 0.085,
    distanceRatePerKm: 3.50,
    urgencySurcharge: 419,
    handlingFee: 250,
    subtotal: 2346,
    taxAmount: 351.9,
    totalAmount: 2697.9,
    currency: 'USD',
    status: 'PENDING',
    validUntil: '2026-08-28',
    notes: 'Awaiting site manager confirmation of access road bridge weight certification.',
    createdAt: '2026-08-18T07:15:00Z'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-000089',
    invoiceNumber: 'ART-INV-2026-0089',
    deliveryId: 'del-03',
    deliveryNumber: 'ART-2026-000098',
    customerId: 'comp-01',
    companyName: 'GoldRidge Heavy Mining Ltd',
    contactPerson: 'Kwame Ansah (Procurement Manager)',
    billingAddress: 'Plot 14 Industrial Mining Belt, Tarkwa, Western Region',
    customerEmail: 'accounts@goldridge-mining.com',
    customerPhone: '+233 30 290 8811',
    issueDate: '2026-08-16',
    dueDate: '2026-09-15',
    items: [
      {
        description: 'Bulk Petroleum Tanker Haulage (Tema Depot -> Damang Plant) - 45,000 Litres AGO',
        quantity: 45000,
        unit: 'Litres',
        unitPrice: 0.085,
        amount: 3825
      },
      {
        description: 'Dangerous Goods Hazmat Corridor Surcharge & Transit Security Escort',
        quantity: 1,
        unit: 'Trip',
        unitPrice: 400,
        amount: 400
      },
      {
        description: 'Terminal Gantry Meter Calibrated Custody Transfer Verification',
        quantity: 1,
        unit: 'Service',
        unitPrice: 150,
        amount: 150
      }
    ],
    subtotal: 4375,
    transportationFee: 3825,
    additionalCharges: 550,
    discount: 0,
    tax: 656.25,
    total: 5031.25,
    currency: 'USD',
    status: 'ISSUED',
    notes: 'Payment payable via direct corporate bank wire to Armtells Transport Services Ltd. Net 30 days applicable.',
    createdAt: '2026-08-16T12:00:00Z'
  },
  {
    id: 'inv-000085',
    invoiceNumber: 'ART-INV-2026-0085',
    deliveryId: 'del-old-01',
    deliveryNumber: 'ART-2026-000082',
    customerId: 'comp-02',
    companyName: 'Apex Energy Retail Network',
    contactPerson: 'Eric Mensah',
    billingAddress: 'Ring Road Central, Accra',
    customerEmail: 'finance@apexenergygh.com',
    customerPhone: '+233 30 271 6620',
    issueDate: '2026-08-10',
    dueDate: '2026-08-17',
    items: [
      {
        description: 'Bulk PMS Tanker Haulage (Tema -> Spintex Station #14) - 36,000 Litres',
        quantity: 36000,
        unit: 'Litres',
        unitPrice: 0.045,
        amount: 1620
      },
      {
        description: 'Offloading Supervision & Vapor Recovery Connection Levy',
        quantity: 1,
        unit: 'Trip',
        unitPrice: 100,
        amount: 100
      }
    ],
    subtotal: 1720,
    transportationFee: 1620,
    additionalCharges: 100,
    discount: 50,
    tax: 250.5,
    total: 1920.5,
    currency: 'USD',
    status: 'PAID',
    paidAmount: 1920.5,
    paymentMethod: 'Corporate Bank Transfer / Swift',
    paymentDate: '2026-08-14',
    notes: 'Paid in full. Thank you for your business.',
    createdAt: '2026-08-10T14:00:00Z'
  }
];

export const initialSafetyDocuments: SafetyDocument[] = [
  {
    id: 'doc-01',
    title: 'NPA Bulk Road Vehicle (BRV) Petroleum Transport License',
    category: 'LICENSE',
    documentNumber: 'NPA-BRV-LIC-2026-00192',
    issuingAuthority: 'National Petroleum Authority (NPA)',
    issueDate: '2026-01-01',
    expiryDate: '2026-12-31',
    status: 'ACTIVE',
    verificationBadge: 'Verified Operational Standard',
    description: 'Statutory authorization for nationwide bulk transportation of hazardous petroleum products via commercial road tankers.'
  },
  {
    id: 'doc-02',
    title: 'EPA Hazardous Chemical Transportation & Environmental Clearance',
    category: 'PERMIT',
    documentNumber: 'EPA-HAZ-CHEM-2026-8812',
    issuingAuthority: 'Environmental Protection Agency (EPA)',
    issueDate: '2026-01-15',
    expiryDate: '2027-01-14',
    status: 'ACTIVE',
    verificationBadge: 'Verified Regulatory Compliance',
    description: 'Mandatory environmental permit covering hazardous material spill-containment readiness and emergency cleanup protocols.'
  },
  {
    id: 'doc-03',
    title: 'GNFS Petroleum Tanker Flammability & Fire Safety Certificate',
    category: 'CERTIFICATE' as any,
    documentNumber: 'GNFS-FLAM-TANK-2026-4401',
    issuingAuthority: 'Ghana National Fire Service (GNFS)',
    issueDate: '2026-02-01',
    expiryDate: '2027-01-31',
    status: 'ACTIVE',
    verificationBadge: 'Fire Safety Inspected',
    description: 'Rigorous inspection of spark arrestors, double 9kg ABC dry-chemical extinguisher mounts, and emergency electrical master isolators.'
  },
  {
    id: 'doc-04',
    title: 'Comprehensive Bulk Fuel Goods-in-Transit & Spillage Liability Cover',
    category: 'INSURANCE',
    documentNumber: 'INS-GIT-PETRO-2026-9092',
    issuingAuthority: 'Enterprise Insurance Plc / Lloyds Reinsurance Syndicate',
    issueDate: '2026-01-01',
    expiryDate: '2026-12-31',
    status: 'ACTIVE',
    verificationBadge: 'Fully Insured Cargo',
    description: 'Comprehensive policy covering cargo loss, vehicle damage, third-party liability, and environmental remediation costs up to $5,000,000.'
  },
  {
    id: 'doc-05',
    title: 'Fleet Hydrostatic Tank & Pneumatic Valve Recertification',
    category: 'INSPECTION',
    documentNumber: 'HYDRO-INSP-2026-V114',
    issuingAuthority: 'Ghana Standards Authority (GSA) / Bureau Veritas',
    issueDate: '2026-01-20',
    expiryDate: '2026-07-20',
    status: 'ACTIVE',
    verificationBadge: 'Pressure Vessel Certified',
    description: 'Semi-annual non-destructive hydrostatic shell pressure tests and emergency foot-valve leak seal integrity tests.'
  },
  {
    id: 'doc-06',
    title: 'Driver Dangerous Goods (ADR / Hazchem) Certification Program',
    category: 'TRAINING',
    documentNumber: 'DRV-HAZ-TRN-2026-B1',
    issuingAuthority: 'Institute of Petroleum Logistics & Dangerous Goods Safety',
    issueDate: '2026-02-15',
    expiryDate: '2027-02-14',
    status: 'ACTIVE',
    verificationBadge: 'Certified Operators',
    description: 'Quarterly defensive driving, fatigue management, roll-over prevention, vapor hazard management, and emergency spill response training.'
  }
];

export const initialMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maint-01',
    tankerId: 'tanker-01',
    tankerReg: 'GN-4821-23',
    serviceType: 'ROUTINE_SERVICE',
    date: '2026-01-14',
    serviceProvider: 'Volvo Truck Center Ghana, Tema',
    cost: 1450,
    odometerKm: 84200,
    status: 'COMPLETED',
    nextDueDate: '2026-09-20',
    technicianNotes: 'Engine oil, fuel water-separator filters replaced. Brake pad thickness 85%. Pneumatic foot valve pressure tested at 2.5 bar with zero decay.',
    certificateRef: 'VTCG-SVC-2026-118'
  },
  {
    id: 'maint-02',
    tankerId: 'tanker-06',
    tankerReg: 'GT-6019-21',
    serviceType: 'HYDROSTATIC_TEST',
    date: '2026-08-15',
    serviceProvider: 'GSA Accredited Testing Bay, Tema Heavy Industrial Area',
    cost: 2100,
    odometerKm: 142000,
    status: 'IN_PROGRESS',
    nextDueDate: '2027-02-15',
    technicianNotes: 'Compartments 1 through 5 hydrostatic pressure retention test in progress. Replacing 2x bottom-loading API coupler seals.',
    certificateRef: 'GSA-HYD-2026-P99'
  }
];

export const initialCMSContent: CMSContent = {
  headline: 'PETROLEUM LOGISTICS YOU CAN COUNT ON.',
  subheadline: 'Safe, dependable tanker transportation and bulk fuel delivery to filling stations, industrial facilities, construction sites, mining operations and businesses.',
  aboutText: 'Armtells Transport Services specializes in the safe transportation and delivery of petroleum products using modern tanker trucks. We connect approved fuel supply depots with authorized customer storage facilities, ensuring operational discipline, strict safety adherence, and transparent delivery coordination at every stage.',
  whoWeServeText: 'We partner with fuel retail networks, heavy mining operations, construction infrastructure contractors, industrial manufacturing plants, commercial fleet operators, and power generation facilities requiring dependable bulk petroleum logistics.',
  whereWeOperateText: 'Our fleet operates across major industrial transport corridors, connecting key supply hubs (including Tema Oil Refinery and Takoradi Bulk Terminals) to authorized commercial destinations nationwide.',
  howWeWorkText: 'Through a disciplined 5-step operational framework—from initial order validation and terminal clearance to tracked transit, custody dipstick verification, and instant digital proof of delivery.',
  contactPhone: '+233 24 000 1100',
  contactEmergencyPhone: '+233 24 000 9999 (24/7 Dispatch Desk)',
  contactWhatsApp: '+233240001100',
  contactEmail: 'operations@armtells.com',
  officeAddress: 'Armtells Logistics Terminal, Heavy Industrial Area, Plot 8B, Tema, Greater Accra, Ghana',
  depotLocation: 'Tema Depot Staging Hub & Western Regional Corridor Base (Takoradi)',
  businessHours: 'Operations & Dispatch: 24 Hours / 7 Days. Corporate Office: Mon - Fri 08:00 - 17:00 GMT',
  operatingCorridors: [
    'Tema - Greater Accra Metropolitan Corridor',
    'Tema - Takoradi - Tarkwa Mining Belt',
    'Tema - Kumasi - Central Ashanti Commercial Corridor',
    'Eastern Industrial & Power Plant Transit Routes',
    'Northern Corridor Bulk Haulage (Tamale & Beyond)'
  ]
};

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'DELIVERY',
    question: 'What petroleum products does Armtells Transport Services transport?',
    answer: 'Armtells transports Automotive Gas Oil (AGO / Diesel), Premium Motor Spirit (PMS / Petrol), Aviation Turbine Fuel (Jet A-1), Heavy Fuel Oil (HFO), Kerosene, and bulk industrial lubricants using dedicated, compartmentalized road tankers equipped for hazardous materials (Class 3 Flammable Liquids).'
  },
  {
    id: 'faq-02',
    category: 'DELIVERY',
    question: 'Where can you deliver fuel?',
    answer: 'We deliver to authorized customer locations with approved storage facilities, including retail fuel stations, industrial manufacturing plants, commercial construction sites, remote mining operations, factory generator farms, and telecom power hubs.'
  },
  {
    id: 'faq-03',
    category: 'CORPORATE',
    question: 'Can businesses schedule recurring or dedicated tanker deliveries?',
    answer: 'Yes. We offer Corporate Master Logistics Agreements for scheduled weekly, bi-weekly, or dedicated tanker contracts. Dedicated fleet capacity ensures guaranteed turnaround and priority dispatch for continuous commercial operations.'
  },
  {
    id: 'faq-04',
    category: 'QUOTES',
    question: 'How do you calculate transportation quotes?',
    answer: 'Logistics rates are determined by product type, delivery volume, route distance from the designated loading depot (e.g., Tema or Takoradi terminals), site accessibility requirements, and required dispatch urgency. You can request an instant preliminary estimate via our Quote Engine.'
  },
  {
    id: 'faq-05',
    category: 'DELIVERY',
    question: 'How can I track my active delivery?',
    answer: 'Every delivery is assigned a unique Delivery ID (e.g., ART-2026-000101). Customers can enter their ID on our "Track Delivery" page to view real-time stage progress (from depot loading to transit and arrival) along with assigned tanker and driver contact information.'
  },
  {
    id: 'faq-06',
    category: 'SAFETY',
    question: 'How does digital Proof of Delivery (POD) work?',
    answer: 'Upon arrival at your destination, our trained driver conducts joint dipstick/meter readings with your authorized site receiver. Once custody discharge is complete, the receiver signs digitally on the driver mobile interface. A tamper-evident PDF Proof of Delivery is instantly generated and available in the Client Portal.'
  },
  {
    id: 'faq-07',
    category: 'SAFETY',
    question: 'What safety and environmental standards do your tankers meet?',
    answer: 'Our tanker fleet complies with National Petroleum Authority (NPA) and Environmental Protection Agency (EPA) standards. Tankers are equipped with pneumatic emergency foot valves, bottom-loading vapor recovery, double fire extinguishers, spark arrestors, and certified grounding systems.'
  }
];

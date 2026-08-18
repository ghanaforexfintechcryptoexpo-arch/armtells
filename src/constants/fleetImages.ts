/**
 * Centralized Fleet Image Catalog & Fallback Asset Provider
 * Clean, descriptive asset paths without timestamp hashes in application code.
 */

export interface FleetImageConfig {
  id: string;
  name: string;
  vehicleClass: string;
  imageUrl: string;
  fallbackImageUrl: string;
  capacityLiters: number;
}

export const FLEET_IMAGE_CATALOG: Record<string, FleetImageConfig> = {
  'ART-TK-01': {
    id: 'tanker-01',
    name: 'Volvo FH 500 6x4 Heavy Fuel Tanker',
    vehicleClass: 'Class 3 Heavy BRV',
    imageUrl: '/images/fleet/volvo-fh500.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    capacityLiters: 45000
  },
  'ART-TK-02': {
    id: 'tanker-02',
    name: 'Volvo FMX 460 6x4 Heavy Hauler',
    vehicleClass: 'Class 3 Multi-Drop BRV',
    imageUrl: '/images/fleet/volvo-fmx460.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1586191582056-a609d575c3ef?auto=format&fit=crop&w=800&q=80',
    capacityLiters: 36000
  },
  'ART-TK-03': {
    id: 'tanker-03',
    name: 'Mercedes-Benz Actros 3344 6x4',
    vehicleClass: 'Class 3 Fast-Turnaround BRV',
    imageUrl: '/images/fleet/mercedes-actros.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
    capacityLiters: 28000
  },
  'ART-TK-04': {
    id: 'tanker-04',
    name: 'MAN TGS 33.480 6x4 Aluminum Tanker',
    vehicleClass: 'Class 3 Long-Haul Mining BRV',
    imageUrl: '/images/fleet/man-tgs.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=800&q=80',
    capacityLiters: 48000
  },
  'ART-TK-05': {
    id: 'tanker-05',
    name: 'Iveco T-Way 430 Rigid Urban Tanker',
    vehicleClass: 'Class 3 Rigid Site Refueler',
    imageUrl: '/images/fleet/iveco-tway.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1562971179-4ad6903a7ed6?auto=format&fit=crop&w=800&q=80',
    capacityLiters: 18000
  },
  'ART-TK-06': {
    id: 'tanker-06',
    name: 'Volvo FH 500 6x4 Heavy Tanker',
    vehicleClass: 'Class 3 Heavy Fuel Oil (HFO) BRV',
    imageUrl: '/images/fleet/volvo-heavy.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    capacityLiters: 45000
  }
};

export const DEFAULT_FLEET_FALLBACK_IMAGE = '/images/fleet/volvo-fh500.jpg';
export const DEFAULT_ONLINE_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80';

/**
 * Resolves a clean image URL and fallback for any tanker by model name, tankerId, or custom image URL
 */
export function resolveFleetImage(
  tankerIdOrModel?: string,
  customImageUrl?: string
): { imageUrl: string; fallbackImageUrl: string } {
  // If a valid custom URL exists that doesn't reference an old broken local path
  if (customImageUrl && !customImageUrl.includes('_17870555') && !customImageUrl.includes('/src/assets/images/')) {
    return {
      imageUrl: customImageUrl,
      fallbackImageUrl: DEFAULT_ONLINE_FALLBACK_IMAGE
    };
  }

  // Lookup in catalog by tanker ID (e.g. ART-TK-01, tanker-01)
  if (tankerIdOrModel) {
    const key = tankerIdOrModel.toUpperCase().trim();
    if (FLEET_IMAGE_CATALOG[key]) {
      return {
        imageUrl: FLEET_IMAGE_CATALOG[key].imageUrl,
        fallbackImageUrl: FLEET_IMAGE_CATALOG[key].fallbackImageUrl
      };
    }

    // Match by ID
    const entryById = Object.values(FLEET_IMAGE_CATALOG).find(c => c.id.toLowerCase() === tankerIdOrModel.toLowerCase());
    if (entryById) {
      return {
        imageUrl: entryById.imageUrl,
        fallbackImageUrl: entryById.fallbackImageUrl
      };
    }

    // Match by model keyword
    const lower = tankerIdOrModel.toLowerCase();
    if (lower.includes('actros') || lower.includes('mercedes')) {
      return {
        imageUrl: FLEET_IMAGE_CATALOG['ART-TK-03'].imageUrl,
        fallbackImageUrl: FLEET_IMAGE_CATALOG['ART-TK-03'].fallbackImageUrl
      };
    }
    if (lower.includes('fmx')) {
      return {
        imageUrl: FLEET_IMAGE_CATALOG['ART-TK-02'].imageUrl,
        fallbackImageUrl: FLEET_IMAGE_CATALOG['ART-TK-02'].fallbackImageUrl
      };
    }
    if (lower.includes('man') || lower.includes('tgs')) {
      return {
        imageUrl: FLEET_IMAGE_CATALOG['ART-TK-04'].imageUrl,
        fallbackImageUrl: FLEET_IMAGE_CATALOG['ART-TK-04'].fallbackImageUrl
      };
    }
    if (lower.includes('iveco') || lower.includes('t-way')) {
      return {
        imageUrl: FLEET_IMAGE_CATALOG['ART-TK-05'].imageUrl,
        fallbackImageUrl: FLEET_IMAGE_CATALOG['ART-TK-05'].fallbackImageUrl
      };
    }
    if (lower.includes('volvo')) {
      return {
        imageUrl: FLEET_IMAGE_CATALOG['ART-TK-01'].imageUrl,
        fallbackImageUrl: FLEET_IMAGE_CATALOG['ART-TK-01'].fallbackImageUrl
      };
    }
  }

  return {
    imageUrl: DEFAULT_FLEET_FALLBACK_IMAGE,
    fallbackImageUrl: DEFAULT_ONLINE_FALLBACK_IMAGE
  };
}

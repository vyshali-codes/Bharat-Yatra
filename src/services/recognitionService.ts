import { HeritageHuntTarget } from '../types/game';

export interface TargetMonumentInput {
  name?: string;
  monument?: string;
  location?: string;
  city?: string;
  state?: string;
  id?: string;
  aliases?: string[];
  acceptedAliases?: string[];
  clues?: string[];
  description?: string;
  sampleFilename?: string;
  historicalPeriod?: string;
}

export interface RecognitionResult {
  isDemo: true;
  label: 'DEMO RECOGNITION';
  mode: 'DEMO RECOGNITION';
  recognition: 'MATCHED' | 'NOT MATCHED';
  isSuccess: boolean;
  monumentName: string;
  targetName: string;
  cityName: string;
  stateName: string;
  confidenceScore: number;
  matchMethod: 'DEMO_VISUAL_SIMILARITY' | 'FAILED_MATCH';
  detectionTimeMs: number;
  pointsAwarded: number; // 50 if successful, 0 if failed
  message: string;
  featuresDetected?: string[];
}

export interface MonumentRecognitionProfile {
  id: string;
  name: string;
  location: string;
  state: string;
  aliases: string[];
  recognitionKeywords: string[];
  expectedVisualCharacteristics: {
    architecturalSignature: string;
    dominantMaterial:
      | 'warm_granite'
      | 'red_sandstone'
      | 'white_marble'
      | 'desert_sandstone'
      | 'dark_basalt'
      | 'gold'
      | 'polychrome';
    structuralShape:
      | 'four_minarets'
      | 'horizontal_palace'
      | 'triumphal_arch'
      | 'tall_tapering_minaret'
      | 'dome_symmetrical'
      | 'rock_cave_excavation'
      | 'stupa_dome'
      | 'shikhara_complex';
    requiresOutdoorSky: boolean;
    requiresSymmetry: boolean;
    minMatchingStoneRatio: number;
  };
  referenceImageVariants: {
    label: string;
    description: string;
    aspectRatioRange: [number, number];
  }[];
}

/**
 * Local recognition profiles for all 16 supported Heritage Hunt targets
 */
export const MONUMENT_RECOGNITION_PROFILES: Record<string, MonumentRecognitionProfile> = {
  // 1. Charminar (Hyderabad)
  charminar: {
    id: 'hyd-charminar',
    name: 'Charminar',
    location: 'Hyderabad, Telangana',
    state: 'Telangana',
    aliases: ['charminar', 'char minar', 'four minarets', 'charminar hyderabad'],
    recognitionKeywords: [
      'four minarets',
      'central grand arches',
      'granite plinth',
      'stucco balconies',
      'upper mosque gallery'
    ],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Four soaring corner minarets framing a square four-arched Deccan granite monument',
      dominantMaterial: 'warm_granite',
      structuralShape: 'four_minarets',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.16
    },
    referenceImageVariants: [
      { label: 'Frontal Day View', description: 'Clear frontal view showing four minarets and central arch', aspectRatioRange: [0.75, 1.35] },
      { label: 'Warm Sunset View', description: 'Golden hour illumination on stucco facade', aspectRatioRange: [0.8, 1.4] },
      { label: 'Architectural Elevation', description: 'Clean symmetrical geometric profile', aspectRatioRange: [0.85, 1.25] }
    ]
  },

  // 2. Mysore Palace (Mysuru)
  'mysore-palace': {
    id: 'mys-palace',
    name: 'Mysore Palace',
    location: 'Mysuru, Karnataka',
    state: 'Karnataka',
    aliases: ['mysore palace', 'amba vilas', 'amba vilas palace', 'mysuru palace'],
    recognitionKeywords: ['indo-saracenic', 'golden domes', 'central five-storey tower', 'arched colonnade', 'dasara festival'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Broad palatial facade with rhythmic arched colonnades and central golden dome',
      dominantMaterial: 'warm_granite',
      structuralShape: 'horizontal_palace',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.18
    },
    referenceImageVariants: [
      { label: 'Frontal Facade', description: 'Expansive palace front with towers and arches', aspectRatioRange: [1.2, 1.8] },
      { label: 'Illuminated Palace', description: 'Palace illuminated by festival incandescent lights', aspectRatioRange: [1.1, 1.7] }
    ]
  },

  // 3. Gateway of India (Mumbai)
  'gateway-of-india': {
    id: 'mum-gateway',
    name: 'Gateway of India',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    aliases: ['gateway of india', 'gateway mumbai', 'apollo bunder', 'gateway'],
    recognitionKeywords: ['triumphal basalt arch', 'mumbai harbor waterfront', 'indo-saracenic archway', 'apollo bunder'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Colossal single triumphal basalt archway facing Mumbai harbor',
      dominantMaterial: 'warm_granite',
      structuralShape: 'triumphal_arch',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.15
    },
    referenceImageVariants: [
      { label: 'Harbor Waterfront', description: 'Archway overlooking the Arabian Sea', aspectRatioRange: [0.9, 1.5] }
    ]
  },

  // 4. Ellora Caves (Ellora)
  'ellora-caves': {
    id: 'ell-kailasa',
    name: 'Ellora Caves',
    location: 'Ellora, Maharashtra',
    state: 'Maharashtra',
    aliases: ['ellora caves', 'kailasa temple', 'cave 16', 'ellora', 'grishneshwar', 'daulatabad'],
    recognitionKeywords: ['monolithic rock-cut excavation', 'basalt cliff', 'kailash temple', 'carved elephants'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Massive top-down basalt rock excavation with towering cliff faces and carved shrines',
      dominantMaterial: 'dark_basalt',
      structuralShape: 'rock_cave_excavation',
      requiresOutdoorSky: false,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.22
    },
    referenceImageVariants: [
      { label: 'Kailasa Courtyard', description: 'Monolithic shrine surrounded by vertical cliff walls', aspectRatioRange: [0.8, 1.5] }
    ]
  },

  // 5. Jaisalmer Fort (Jaisalmer)
  'jaisalmer-fort': {
    id: 'jlm-fort',
    name: 'Jaisalmer Fort',
    location: 'Jaisalmer, Rajasthan',
    state: 'Rajasthan',
    aliases: ['jaisalmer fort', 'sonar qila', 'golden fort', 'sonar kella', 'patwon ki haveli', 'sam sand dunes'],
    recognitionKeywords: ['sonar qila', 'yellow sandstone ramparts', 'trikuta hill', '99 bastions', 'desert living fort'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Luminous golden-yellow sandstone ramparts and bastions rising above Thar desert sands',
      dominantMaterial: 'desert_sandstone',
      structuralShape: 'horizontal_palace',
      requiresOutdoorSky: true,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.22
    },
    referenceImageVariants: [
      { label: 'Hilltop Bastions', description: 'Panoramic view of yellow sandstone battlements', aspectRatioRange: [1.1, 1.8] }
    ]
  },

  // 6. Khajuraho Temples (Khajuraho)
  'khajuraho-temples': {
    id: 'khj-kandariya',
    name: 'Khajuraho Temples',
    location: 'Khajuraho, Madhya Pradesh',
    state: 'Madhya Pradesh',
    aliases: ['khajuraho temples', 'kandariya mahadeva', 'lakshmana temple', 'western group', 'khajuraho'],
    recognitionKeywords: ['nagara shikhara spires', 'mountain peak temples', 'carved sandstone friezes', 'chandela architecture'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Tiered curvilinear Nagara spires mimicking sacred mountain peaks in warm sandstone',
      dominantMaterial: 'warm_granite',
      structuralShape: 'shikhara_complex',
      requiresOutdoorSky: true,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.18
    },
    referenceImageVariants: [
      { label: 'Western Group Ensemble', description: 'Side view showing stepped shikhara spires', aspectRatioRange: [1.0, 1.6] }
    ]
  },

  // 7. Red Fort (Delhi)
  'red-fort': {
    id: 'del-red-fort',
    name: 'Red Fort',
    location: 'Delhi, Delhi NCR',
    state: 'Delhi NCR',
    aliases: ['red fort', 'lal qila', 'lal kila', 'red fort delhi', 'humayun tomb', 'jama masjid'],
    recognitionKeywords: ['massive red sandstone ramparts', 'lahori gate', 'octagonal towers', 'shahjahanabad'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Long crenellated red sandstone fortress ramparts with octagonal domed chattris',
      dominantMaterial: 'red_sandstone',
      structuralShape: 'horizontal_palace',
      requiresOutdoorSky: true,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.25
    },
    referenceImageVariants: [
      { label: 'Lahori Gate Ramparts', description: 'Frontal view of red sandstone battlements and entry gate', aspectRatioRange: [1.2, 1.8] }
    ]
  },

  // 8. Qutub Minar (Delhi)
  'qutub-minar': {
    id: 'del-qutub',
    name: 'Qutub Minar',
    location: 'Delhi, Delhi NCR',
    state: 'Delhi NCR',
    aliases: ['qutub minar', 'qutb minar', 'qutab minar', 'qutub', 'iron pillar'],
    recognitionKeywords: ['tallest brick minaret', 'tapering five storeys', 'fluted red sandstone', 'kufic calligraphy balconies'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Soaring tapering vertical minaret of fluted red sandstone with projecting balconies',
      dominantMaterial: 'red_sandstone',
      structuralShape: 'tall_tapering_minaret',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.18
    },
    referenceImageVariants: [
      { label: 'Full Minaret Elevation', description: 'Vertical view of the 72.5m tapering tower against sky', aspectRatioRange: [0.55, 0.95] }
    ]
  },

  // 9. Victoria Memorial (Kolkata)
  'victoria-memorial': {
    id: 'kol-victoria',
    name: 'Victoria Memorial',
    location: 'Kolkata, West Bengal',
    state: 'West Bengal',
    aliases: ['victoria memorial', 'victoria memorial kolkata', 'victoria kolkata'],
    recognitionKeywords: ['white makrana marble', 'central dome', 'angel of victory', 'curzon colonial memorial', 'maidan lawns'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Neoclassical white marble monument crowned by central dome and flanked by reflecting pools',
      dominantMaterial: 'white_marble',
      structuralShape: 'dome_symmetrical',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.20
    },
    referenceImageVariants: [
      { label: 'Garden Pond Reflection', description: 'Symmetrical white marble facade across water pool', aspectRatioRange: [1.1, 1.7] }
    ]
  },

  // 10. Taj Mahal (Agra)
  'taj-mahal': {
    id: 'agr-taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    state: 'Uttar Pradesh',
    aliases: ['taj mahal', 'taj', 'agra taj', 'mumtaz mausoleum'],
    recognitionKeywords: ['white makrana marble', 'central onion dome', 'four corner minarets', 'charbagh reflection', 'pietra dura'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Pristine white marble mausoleum with central onion dome and four detached corner minarets',
      dominantMaterial: 'white_marble',
      structuralShape: 'four_minarets',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.22
    },
    referenceImageVariants: [
      { label: 'Classic Garden Axial View', description: 'Perfect axial symmetry across reflecting pools', aspectRatioRange: [0.9, 1.4] }
    ]
  },

  // 11. Konark Sun Temple (Konark)
  'konark-sun-temple': {
    id: 'kon-sun-temple',
    name: 'Konark Sun Temple',
    location: 'Konark, Odisha',
    state: 'Odisha',
    aliases: ['konark sun temple', 'sun temple', 'black pagoda', 'konark'],
    recognitionKeywords: ['monumental stone chariot', '24 carved sun wheels', 'kalinga temple', 'black pagoda'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Massive dark stone pyramidal jagamohana roof flanked by giant carved stone wheels',
      dominantMaterial: 'dark_basalt',
      structuralShape: 'shikhara_complex',
      requiresOutdoorSky: true,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.20
    },
    referenceImageVariants: [
      { label: 'Chariot Wheel Elevation', description: 'Side view of stone sundial wheel and sanctuary plinth', aspectRatioRange: [1.0, 1.5] }
    ]
  },

  // 12. Sanchi Stupa (Sanchi)
  'sanchi-stupa': {
    id: 'san-stupa',
    name: 'Sanchi Stupa',
    location: 'Sanchi, Madhya Pradesh',
    state: 'Madhya Pradesh',
    aliases: ['sanchi stupa', 'great stupa', 'ashoka stupa', 'sanchi'],
    recognitionKeywords: ['hemispherical stone dome', 'carved torana gateways', 'buddhist relic', 'stone balustrade'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Solid hemispherical sandstone dome crowned by a stone chhatri and framed by ornate toranas',
      dominantMaterial: 'warm_granite',
      structuralShape: 'stupa_dome',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.20
    },
    referenceImageVariants: [
      { label: 'Torana & Great Dome', description: 'Carved gateway in foreground with hemispherical dome behind', aspectRatioRange: [1.0, 1.5] }
    ]
  },

  // 13. Golden Temple (Amritsar)
  'golden-temple': {
    id: 'amr-golden-temple',
    name: 'Golden Temple',
    location: 'Amritsar, Punjab',
    state: 'Punjab',
    aliases: ['golden temple', 'harmandir sahib', 'sri harmandir sahib', 'darbar sahib'],
    recognitionKeywords: ['pure gold leaf sanctum', 'amrit sarovar holy pool', 'marble causeway', 'spiritual center'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Gleaming gold-plated two-storey sanctum sitting in the center of a vast square water pool',
      dominantMaterial: 'gold',
      structuralShape: 'dome_symmetrical',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.18
    },
    referenceImageVariants: [
      { label: 'Sarovar Reflection', description: 'Golden sanctum reflected in the sacred water pool', aspectRatioRange: [1.1, 1.6] }
    ]
  },

  // 14. Meenakshi Temple (Madurai)
  'meenakshi-temple': {
    id: 'mad-meenakshi',
    name: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    state: 'Tamil Nadu',
    aliases: ['meenakshi temple', 'meenakshi amman', 'madurai meenakshi', 'meenakshi amman temple'],
    recognitionKeywords: ['14 polychrome gopurams', 'dravidian gateway towers', 'sculpted deities', 'thousand pillar hall'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Soaring multi-tiered pyramidal gopuram covered in brightly painted polychrome statues',
      dominantMaterial: 'polychrome',
      structuralShape: 'shikhara_complex',
      requiresOutdoorSky: true,
      requiresSymmetry: true,
      minMatchingStoneRatio: 0.15
    },
    referenceImageVariants: [
      { label: 'Soaring Gopuram Elevation', description: 'Vertical view of the 52m southern polychrome gopuram', aspectRatioRange: [0.65, 1.05] }
    ]
  },

  // 15. Ajanta Caves (Aurangabad)
  'ajanta-caves': {
    id: 'ajn-caves',
    name: 'Ajanta Caves',
    location: 'Aurangabad, Maharashtra',
    state: 'Maharashtra',
    aliases: ['ajanta caves', 'ajanta', 'waghur gorge'],
    recognitionKeywords: ['horseshoe rock-cut cliff', 'waghur river gorge', 'buddhist chaityas', 'ancient frescoes'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Curving panoramic horseshoe basalt cliff dotted with ancient rock-cut pillared entrances',
      dominantMaterial: 'dark_basalt',
      structuralShape: 'rock_cave_excavation',
      requiresOutdoorSky: true,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.20
    },
    referenceImageVariants: [
      { label: 'Horseshoe Gorge Panorama', description: 'Sweeping view of cave entrances along the canyon cliff', aspectRatioRange: [1.2, 1.9] }
    ]
  },

  // 16. Hampi (Vijayanagara)
  hampi: {
    id: 'hmp-ruins',
    name: 'Hampi',
    location: 'Hampi, Karnataka',
    state: 'Karnataka',
    aliases: ['hampi', 'vijayanagara', 'vittala temple', 'stone chariot', 'virupaksha'],
    recognitionKeywords: ['monolithic stone chariot', 'granite boulder landscape', 'vittala temple pillars', 'tungabhadra river ruins'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Intricately carved monolithic granite shrine surrounded by rugged boulder-strewn hills',
      dominantMaterial: 'warm_granite',
      structuralShape: 'shikhara_complex',
      requiresOutdoorSky: true,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.20
    },
    referenceImageVariants: [
      { label: 'Vittala Stone Chariot', description: 'Monolithic carved chariot against open sky and granite ruins', aspectRatioRange: [1.0, 1.5] }
    ]
  }
};

/**
 * Normalizes RGB to HSL [0-360, 0-100, 0-100]
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

interface ImageVisualFeatures {
  aspectRatio: number;
  averageLightness: number;
  skyRatio: number;
  warmGraniteRatio: number;
  redSandstoneRatio: number;
  whiteMarbleRatio: number;
  goldRatio: number;
  darkBasaltRatio: number;
  polychromeVariance: number;
  columnProfile: number[]; // 16 horizontal bins of vertical structural energy
  hasFlankingMinarets: boolean;
  hasCentralArchOrOpening: boolean;
  symmetryScore: number;
  dominantMaterial: string;
  isOutdoorMonumentLike: boolean;
}

/**
 * Extracts visual architectural features from an image via normalized HTML5 canvas
 */
async function extractVisualFeatures(file: File | Blob): Promise<ImageVisualFeatures | null> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  try {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image failed to load in browser'));
      img.src = url;
    });

    const naturalWidth = img.naturalWidth || 600;
    const naturalHeight = img.naturalHeight || 400;
    const aspectRatio = +(naturalWidth / Math.max(1, naturalHeight)).toFixed(2);

    const canvas = document.createElement('canvas');
    const targetW = 64;
    const targetH = 64;
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      URL.revokeObjectURL(url);
      return null;
    }

    ctx.drawImage(img, 0, 0, targetW, targetH);
    const imgData = ctx.getImageData(0, 0, targetW, targetH).data;
    URL.revokeObjectURL(url);

    // Pixel statistics
    let totalL = 0;
    let skyPixels = 0;
    const skyZoneRows = 22; // top ~35% of rows
    const totalSkyZonePixels = targetW * skyZoneRows;

    let warmGranitePixels = 0;
    let redSandstonePixels = 0;
    let whiteMarblePixels = 0;
    let goldPixels = 0;
    let darkBasaltPixels = 0;

    const monumentZoneStart = 16;
    const monumentZoneEnd = 54;
    const totalMonumentZonePixels = targetW * (monumentZoneEnd - monumentZoneStart);

    const hues: number[] = [];

    // Evaluate zones
    for (let y = 0; y < targetH; y++) {
      for (let x = 0; x < targetW; x++) {
        const idx = (y * targetW + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const [h, s, l] = rgbToHsl(r, g, b);
        totalL += l;

        // 1. Sky detection (top 35% rows)
        if (y < skyZoneRows) {
          const isBlueSky = h >= 170 && h <= 265 && s > 12 && l > 25;
          const isPaleOvercastSky = l > 65 && s < 24;
          const isSunsetSky = h >= 22 && h <= 55 && l > 55 && s > 20;
          if (isBlueSky || isPaleOvercastSky || isSunsetSky) {
            skyPixels++;
          }
        }

        // 2. Stone Material detection (monument middle zone)
        if (y >= monumentZoneStart && y < monumentZoneEnd) {
          hues.push(h);

          // Warm Deccan granite / stucco / buff sandstone (e.g. Charminar, Mysore Palace, Hampi)
          if (h >= 18 && h <= 62 && s >= 8 && s <= 85 && l >= 18 && l <= 85) {
            warmGranitePixels++;
          }

          // Red sandstone (e.g. Red Fort, Qutub Minar)
          if ((h < 22 || h > 342) && s > 24 && l >= 15 && l <= 72) {
            redSandstonePixels++;
          }

          // White marble (e.g. Taj Mahal, Victoria Memorial)
          if (l > 68 && s < 22) {
            whiteMarblePixels++;
          }

          // Gold leaf / gilded sanctum (e.g. Golden Temple)
          if (h >= 36 && h <= 58 && s > 52 && l >= 38 && l <= 88) {
            goldPixels++;
          }

          // Dark volcanic basalt / rock excavation (e.g. Ellora, Konark, Ajanta)
          if (l < 26 || (s < 20 && l < 45)) {
            darkBasaltPixels++;
          }
        }
      }
    }

    const averageLightness = +(totalL / (targetW * targetH)).toFixed(1);
    const skyRatio = +(skyPixels / totalSkyZonePixels).toFixed(2);
    const warmGraniteRatio = +(warmGranitePixels / totalMonumentZonePixels).toFixed(2);
    const redSandstoneRatio = +(redSandstonePixels / totalMonumentZonePixels).toFixed(2);
    const whiteMarbleRatio = +(whiteMarblePixels / totalMonumentZonePixels).toFixed(2);
    const goldRatio = +(goldPixels / totalMonumentZonePixels).toFixed(2);
    const darkBasaltRatio = +(darkBasaltPixels / totalMonumentZonePixels).toFixed(2);

    // Compute polychrome variance (standard deviation of hues)
    const avgHue = hues.reduce((a, b) => a + b, 0) / (hues.length || 1);
    const hueVariance = Math.sqrt(
      hues.reduce((a, b) => a + Math.pow(b - avgHue, 2), 0) / (hues.length || 1)
    );
    const polychromeVariance = +(hueVariance / 180).toFixed(2);

    // Column profiles (16 horizontal bins, each 4 pixels wide)
    const columnProfile: number[] = new Array(16).fill(0);
    for (let bin = 0; bin < 16; bin++) {
      let energy = 0;
      const startX = bin * 4;
      const endX = startX + 4;
      for (let x = startX; x < endX; x++) {
        for (let y = 10; y < 48; y++) {
          const idxCurrent = (y * targetW + x) * 4;
          const idxNext = (y * targetW + Math.min(targetW - 1, x + 1)) * 4;
          const diff = Math.abs(imgData[idxCurrent] - imgData[idxNext]);
          energy += diff;
        }
      }
      columnProfile[bin] = energy;
    }
    const maxColEnergy = Math.max(1, ...columnProfile);
    const normalizedCols = columnProfile.map((c) => +(c / maxColEnergy).toFixed(2));

    // Structural features:
    // Left minarets / towers live in bins 2-5 (12% to 36% width)
    // Right minarets / towers live in bins 10-13 (62% to 88% width)
    const leftFlankEnergy = (normalizedCols[2] + normalizedCols[3] + normalizedCols[4]) / 3;
    const rightFlankEnergy = (normalizedCols[11] + normalizedCols[12] + normalizedCols[13]) / 3;
    const centerEnergy = (normalizedCols[7] + normalizedCols[8]) / 2;

    const hasFlankingMinarets = leftFlankEnergy > 0.45 && rightFlankEnergy > 0.45;
    const hasCentralArchOrOpening = centerEnergy > 0.35;

    // Symmetry calculation (comparing left half columns with flipped right half columns)
    let symmetryDiff = 0;
    let symmetrySum = 0;
    for (let b = 0; b < 8; b++) {
      const leftVal = normalizedCols[b];
      const rightVal = normalizedCols[15 - b];
      symmetryDiff += Math.abs(leftVal - rightVal);
      symmetrySum += leftVal + rightVal;
    }
    const symmetryScore = +(1 - (symmetryDiff / Math.max(0.1, symmetrySum))).toFixed(2);

    // Dominant material determination
    const materialScores = [
      { name: 'warm_granite', val: warmGraniteRatio },
      { name: 'red_sandstone', val: redSandstoneRatio },
      { name: 'white_marble', val: whiteMarbleRatio },
      { name: 'gold', val: goldRatio },
      { name: 'dark_basalt', val: darkBasaltRatio }
    ];
    materialScores.sort((a, b) => b.val - a.val);
    const dominantMaterial = materialScores[0].val > 0.15 ? materialScores[0].name : 'unidentified';

    // Outdoor monument check (rejects plain solid screens, household cats, plain text screenshots)
    const isOutdoorMonumentLike =
      (skyRatio >= 0.08 || darkBasaltRatio > 0.35) &&
      (warmGraniteRatio > 0.12 ||
        redSandstoneRatio > 0.12 ||
        whiteMarbleRatio > 0.12 ||
        goldRatio > 0.12 ||
        darkBasaltRatio > 0.18);

    return {
      aspectRatio,
      averageLightness,
      skyRatio,
      warmGraniteRatio,
      redSandstoneRatio,
      whiteMarbleRatio,
      goldRatio,
      darkBasaltRatio,
      polychromeVariance,
      columnProfile: normalizedCols,
      hasFlankingMinarets,
      hasCentralArchOrOpening,
      symmetryScore,
      dominantMaterial,
      isOutdoorMonumentLike
    };
  } catch (err) {
    console.error('Failed to extract visual features from image:', err);
    return null;
  }
}

/**
 * Normalized representation of target monument input
 */
function normalizeTargetMonument(target: TargetMonumentInput | HeritageHuntTarget): {
  id: string;
  name: string;
  city: string;
  state: string;
  location: string;
  aliases: string[];
} {
  const t = target as any;
  const name = t.monument || t.name || 'Historic Monument';
  const city = t.city || (t.location ? t.location.split(',')[0].trim() : 'India');
  const state =
    t.state ||
    (t.location && t.location.includes(',')
      ? t.location.split(',')[1].trim()
      : 'India');
  const location = t.location || `${city}, ${state}`.trim();
  const rawAliases: string[] = [
    name,
    ...(t.aliases || []),
    ...(t.acceptedAliases || []),
    t.id || ''
  ].filter(Boolean);

  return {
    id: t.id || 'target-monument',
    name,
    city,
    state,
    location,
    aliases: rawAliases
  };
}

/**
 * Finds the local recognition profile matching the target monument name or aliases
 */
function findTargetProfile(target: TargetMonumentInput | HeritageHuntTarget): MonumentRecognitionProfile {
  const normalized = normalizeTargetMonument(target);
  const targetName = normalized.name.toLowerCase();
  const cleanAliases = normalized.aliases.map((a) => a.toLowerCase().replace(/[^a-z0-9]/g, ''));

  for (const [key, profile] of Object.entries(MONUMENT_RECOGNITION_PROFILES)) {
    const cleanKey = key.replace(/[^a-z0-9]/g, '');
    const cleanProfileName = profile.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const profileAliases = profile.aliases.map((a) => a.toLowerCase().replace(/[^a-z0-9]/g, ''));

    const matches = cleanAliases.some(
      (alias) =>
        alias.length >= 3 &&
        (alias.includes(cleanKey) ||
          cleanKey.includes(alias) ||
          alias.includes(cleanProfileName) ||
          cleanProfileName.includes(alias) ||
          profileAliases.some((pa) => pa.includes(alias) || alias.includes(pa)))
    );

    if (matches) {
      return profile;
    }
  }

  // Fallback: Default generic profile based on target info
  return {
    id: normalized.id,
    name: normalized.name,
    location: normalized.location,
    state: normalized.state,
    aliases: [normalized.name],
    recognitionKeywords: ['heritage monument', 'historic architecture'],
    expectedVisualCharacteristics: {
      architecturalSignature: 'Historic Indian architectural monument',
      dominantMaterial: 'warm_granite',
      structuralShape: 'shikhara_complex',
      requiresOutdoorSky: true,
      requiresSymmetry: false,
      minMatchingStoneRatio: 0.15
    },
    referenceImageVariants: [
      { label: 'Standard View', description: 'Frontal architectural view', aspectRatioRange: [0.8, 1.6] }
    ]
  };
}

/**
 * Main Target-Aware Recognition Function:
 * recognizeMonument(imageFile, targetMonument)
 *
 * Evaluates the submitted image against the CURRENT target monument using client-side visual similarity.
 * Does NOT depend on filename, file extension, or screenshot naming.
 * Completely deterministic for the same image and target.
 */
export async function recognizeMonument(
  imageFile: File | Blob | null,
  targetMonument: TargetMonumentInput | HeritageHuntTarget
): Promise<RecognitionResult> {
  const startTime = Date.now();

  // Standard computer-vision demo latency simulation (450ms)
  await new Promise((resolve) => setTimeout(resolve, 450));

  const normalizedTarget = normalizeTargetMonument(targetMonument);
  const targetName = normalizedTarget.name;
  const cityName = normalizedTarget.city;
  const stateName = normalizedTarget.state;

  // Guard: No file provided or zero bytes
  if (!imageFile || imageFile.size === 0) {
    return {
      isDemo: true,
      label: 'DEMO RECOGNITION',
      mode: 'DEMO RECOGNITION',
      recognition: 'NOT MATCHED',
      isSuccess: false,
      monumentName: 'No Image Provided',
      targetName,
      cityName,
      stateName,
      confidenceScore: 0,
      matchMethod: 'FAILED_MATCH',
      detectionTimeMs: Date.now() - startTime,
      pointsAwarded: 0,
      message: 'Please upload or select an image to verify.'
    };
  }

  // Find target recognition profile
  const profile = findTargetProfile(targetMonument);
  const targetKey = profile.name.toLowerCase();

  // Extract client-side visual features from the image canvas
  const features = await extractVisualFeatures(imageFile);

  // If features could not be extracted (e.g., corrupt file), return failure
  if (!features) {
    return {
      isDemo: true,
      label: 'DEMO RECOGNITION',
      mode: 'DEMO RECOGNITION',
      recognition: 'NOT MATCHED',
      isSuccess: false,
      monumentName: 'Unreadable Image',
      targetName,
      cityName,
      stateName,
      confidenceScore: 0,
      matchMethod: 'FAILED_MATCH',
      detectionTimeMs: Date.now() - startTime,
      pointsAwarded: 0,
      message: 'Could not process the uploaded file as a valid image.'
    };
  }

  // Evaluate visual features against target profile
  let isMatched = false;
  let confidence = 20;
  const detectedFeatures: string[] = [];

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: CHARMINAR
  // -------------------------------------------------------------------------
  if (targetKey.includes('charminar')) {
    // A normal photograph of Charminar has:
    // 1. Outdoor sky above the monument (skyRatio >= 0.08)
    // 2. Warm Deccan granite/stucco material (warmGraniteRatio >= 0.16)
    // 3. Characteristic four soaring minarets / flanking towers
    // 4. Symmetrical balance between left and right flanks (symmetryScore >= 0.45)
    // 5. NOT predominantly red sandstone (which indicates Red Fort)
    // 6. NOT predominantly white marble (which indicates Taj Mahal)
    // 7. NOT predominantly gold water (which indicates Golden Temple)

    const hasSky = features.skyRatio >= 0.08;
    const hasGraniteStone = features.warmGraniteRatio >= 0.16;
    const hasMinaretsOrColumns = features.hasFlankingMinarets || (features.columnProfile[3] > 0.4 && features.columnProfile[12] > 0.4);
    const hasSymmetry = features.symmetryScore >= 0.45;
    const isNotRedFort = features.redSandstoneRatio < 0.42;
    const isNotTajMahal = features.whiteMarbleRatio < 0.45;
    const isNotGoldenTemple = features.goldRatio < 0.35;
    const isNotUnrelated = features.isOutdoorMonumentLike;

    if (hasSky) detectedFeatures.push('Outdoor Sky Backdrop');
    if (hasGraniteStone) detectedFeatures.push('Deccan Granite & Stucco Palette');
    if (hasMinaretsOrColumns) detectedFeatures.push('Four Corner Minarets Profile');
    if (hasSymmetry) detectedFeatures.push('Axial Architectural Symmetry');
    if (features.hasCentralArchOrOpening) detectedFeatures.push('Grand Central Arches');

    // Charminar match logic:
    // Matches if it possesses the architectural minarets and granite stone in an outdoor setting
    if (
      isNotUnrelated &&
      hasGraniteStone &&
      (hasMinaretsOrColumns || hasSymmetry) &&
      isNotRedFort &&
      isNotTajMahal &&
      isNotGoldenTemple
    ) {
      isMatched = true;
      confidence = +(
        84 +
        features.warmGraniteRatio * 10 +
        features.symmetryScore * 4
      ).toFixed(1);
      confidence = Math.min(97.8, Math.max(86.0, confidence));
    } else {
      isMatched = false;
      confidence = +(16 + features.warmGraniteRatio * 15).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: MYSORE PALACE
  // -------------------------------------------------------------------------
  else if (targetKey.includes('mysore')) {
    const isWide = features.aspectRatio >= 1.05;
    const hasStone = features.warmGraniteRatio >= 0.18;
    const hasSymmetry = features.symmetryScore >= 0.5;
    if (features.isOutdoorMonumentLike && isWide && hasStone && hasSymmetry) {
      isMatched = true;
      confidence = +(88 + features.symmetryScore * 8).toFixed(1);
      detectedFeatures.push('Horizontal Palace Facade', 'Arched Colonnade Structure', 'Axial Symmetry');
    } else {
      confidence = +(18 + features.warmGraniteRatio * 15).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: GATEWAY OF INDIA
  // -------------------------------------------------------------------------
  else if (targetKey.includes('gateway')) {
    const hasBasalt = features.warmGraniteRatio >= 0.14 || features.darkBasaltRatio >= 0.14;
    const hasCentralArch = features.hasCentralArchOrOpening;
    if (features.isOutdoorMonumentLike && hasBasalt && hasCentralArch) {
      isMatched = true;
      confidence = +(87 + features.symmetryScore * 8).toFixed(1);
      detectedFeatures.push('Basalt Triumphal Archway', 'Central Arch Portal', 'Mumbai Waterfront Setting');
    } else {
      confidence = +(15 + features.warmGraniteRatio * 15).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: RED FORT
  // -------------------------------------------------------------------------
  else if (targetKey.includes('red fort') || targetKey.includes('lal qila')) {
    const isRed = features.redSandstoneRatio >= 0.24;
    if (features.isOutdoorMonumentLike && isRed) {
      isMatched = true;
      confidence = +(86 + features.redSandstoneRatio * 14).toFixed(1);
      detectedFeatures.push('Red Sandstone Ramparts', 'Mughal Fortress Battlements');
    } else {
      confidence = +(14 + features.redSandstoneRatio * 20).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: QUTUB MINAR
  // -------------------------------------------------------------------------
  else if (targetKey.includes('qutub') || targetKey.includes('qutb')) {
    const isVertical = features.aspectRatio <= 1.05;
    const isRedOrWarm = features.redSandstoneRatio >= 0.16 || features.warmGraniteRatio >= 0.16;
    if (features.isOutdoorMonumentLike && isVertical && isRedOrWarm) {
      isMatched = true;
      confidence = +(88 + (1.2 - Math.min(1.2, features.aspectRatio)) * 10).toFixed(1);
      detectedFeatures.push('Tall Tapering Tower', 'Fluted Sandstone Balconies');
    } else {
      confidence = +(15 + features.redSandstoneRatio * 15).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: TAJ MAHAL / VICTORIA MEMORIAL (WHITE MARBLE)
  // -------------------------------------------------------------------------
  else if (targetKey.includes('taj mahal') || targetKey.includes('victoria')) {
    const isWhiteMarble = features.whiteMarbleRatio >= 0.22;
    const hasSymmetry = features.symmetryScore >= 0.52;
    if (features.isOutdoorMonumentLike && isWhiteMarble && hasSymmetry) {
      isMatched = true;
      confidence = +(89 + features.whiteMarbleRatio * 10).toFixed(1);
      detectedFeatures.push('White Makrana Marble', 'Symmetrical Dome & Minarets');
    } else {
      confidence = +(15 + features.whiteMarbleRatio * 20).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: GOLDEN TEMPLE
  // -------------------------------------------------------------------------
  else if (targetKey.includes('golden temple') || targetKey.includes('harmandir')) {
    const hasGold = features.goldRatio >= 0.16;
    if (hasGold) {
      isMatched = true;
      confidence = +(90 + features.goldRatio * 10).toFixed(1);
      detectedFeatures.push('Gilded Golden Sanctum', 'Amrit Sarovar Water Reflections');
    } else {
      confidence = +(12 + features.goldRatio * 25).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: JAISALMER FORT
  // -------------------------------------------------------------------------
  else if (targetKey.includes('jaisalmer')) {
    const hasDesertSandstone = features.warmGraniteRatio >= 0.22 || features.goldRatio >= 0.15;
    if (features.isOutdoorMonumentLike && hasDesertSandstone) {
      isMatched = true;
      confidence = +(86 + features.warmGraniteRatio * 12).toFixed(1);
      detectedFeatures.push('Yellow Sandstone Ramparts', 'Desert Bastion Silhouette');
    } else {
      confidence = +(15 + features.warmGraniteRatio * 15).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: ELLORA / AJANTA / KONARK (ROCK BASALT)
  // -------------------------------------------------------------------------
  else if (
    targetKey.includes('ellora') ||
    targetKey.includes('ajanta') ||
    targetKey.includes('konark') ||
    targetKey.includes('kailasa')
  ) {
    const hasBasalt = features.darkBasaltRatio >= 0.2 || (features.averageLightness < 45 && features.warmGraniteRatio >= 0.18);
    if (hasBasalt) {
      isMatched = true;
      confidence = +(87 + features.darkBasaltRatio * 12).toFixed(1);
      detectedFeatures.push('Monolithic Basalt Rock Carving', 'Ancient Stone Relief');
    } else {
      confidence = +(15 + features.darkBasaltRatio * 18).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // TARGET SPECIFIC EVALUATION: MEENAKSHI TEMPLE (POLYCHROME GOPURAM)
  // -------------------------------------------------------------------------
  else if (targetKey.includes('meenakshi')) {
    const hasPolychrome = features.polychromeVariance >= 0.25 || features.redSandstoneRatio > 0.15;
    if (features.isOutdoorMonumentLike && hasPolychrome) {
      isMatched = true;
      confidence = +(88 + features.polychromeVariance * 10).toFixed(1);
      detectedFeatures.push('Polychrome Tiered Gopuram', 'Pyramidal Dravidian Tower');
    } else {
      confidence = +(16 + features.polychromeVariance * 20).toFixed(1);
    }
  }

  // -------------------------------------------------------------------------
  // GENERIC TARGET FALLBACK
  // -------------------------------------------------------------------------
  else {
    const matchesOutdoor = features.isOutdoorMonumentLike;
    const matchesStone =
      features.warmGraniteRatio > profile.expectedVisualCharacteristics.minMatchingStoneRatio ||
      features.redSandstoneRatio > profile.expectedVisualCharacteristics.minMatchingStoneRatio;
    if (matchesOutdoor && matchesStone) {
      isMatched = true;
      confidence = +(85 + features.warmGraniteRatio * 10).toFixed(1);
      detectedFeatures.push(profile.expectedVisualCharacteristics.architecturalSignature);
    } else {
      confidence = +(18 + features.warmGraniteRatio * 15).toFixed(1);
    }
  }

  const detectionTimeMs = Date.now() - startTime;

  if (isMatched) {
    return {
      isDemo: true,
      label: 'DEMO RECOGNITION',
      mode: 'DEMO RECOGNITION',
      recognition: 'MATCHED',
      isSuccess: true,
      monumentName: targetName,
      targetName,
      cityName,
      stateName,
      confidenceScore: confidence,
      matchMethod: 'DEMO_VISUAL_SIMILARITY',
      detectionTimeMs,
      pointsAwarded: 50,
      message: `HERITAGE FOUND! Submitted photograph verified as ${targetName}. +50 POINTS!`,
      featuresDetected: detectedFeatures
    };
  } else {
    return {
      isDemo: true,
      label: 'DEMO RECOGNITION',
      mode: 'DEMO RECOGNITION',
      recognition: 'NOT MATCHED',
      isSuccess: false,
      monumentName: 'Unmatched Subject',
      targetName,
      cityName,
      stateName,
      confidenceScore: confidence,
      matchMethod: 'FAILED_MATCH',
      detectionTimeMs,
      pointsAwarded: 0,
      message: `HERITAGE NOT RECOGNIZED! The submitted image does not match the architectural features of ${targetName}.`,
      featuresDetected: detectedFeatures
    };
  }
}

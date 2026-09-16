/**
 * Accurate Geo-Projected India Map Asset
 *
 * Bundled offline vector representation of India's geographic boundary.
 * Projects latitude/longitude to SVG viewport (viewBox: 0 0 900 1050)
 * using an equidistant cylindrical / Plate Carrée geographic projection.
 */

export const MAP_CONFIG = {
  viewBox: '0 0 920 1060',
  width: 920,
  height: 1060,
  minLng: 68.0,
  maxLng: 97.6,
  minLat: 7.8,
  maxLat: 37.6,
  paddingX: 45,
  paddingY: 35,
  usableWidth: 830,
  usableHeight: 990
};

/**
 * Converts real-world geographic coordinates (latitude, longitude)
 * into accurate SVG pixel coordinates (x, y).
 */
export function projectGeoCoord(lat: number, lng: number): { x: number; y: number } {
  const { minLng, maxLng, minLat, maxLat, paddingX, paddingY, usableWidth, usableHeight } = MAP_CONFIG;

  const x = paddingX + ((lng - minLng) / (maxLng - minLng)) * usableWidth;
  const y = paddingY + ((maxLat - lat) / (maxLat - minLat)) * usableHeight;

  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10
  };
}

/**
 * Highly detailed, geographically accurate SVG path points for the border of India,
 * including Ladakh & Jammu and Kashmir in the North, Gujarat Rann of Kutch & Kathiawar in the West,
 * Cape Comorin / Kanyakumari in the South, Coromandel Coast, Odisha, West Bengal,
 * Siliguri corridor, and the Seven Sister states of the Northeast (Assam, Meghalaya, Arunachal,
 * Nagaland, Manipur, Mizoram, Tripura).
 */
const INDIA_BORDER_POINTS: [number, number][] = [
  // Northern Ladakh / Karakoram / Siachen
  [35.5, 77.0], [35.8, 77.8], [35.6, 78.8], [35.2, 79.2], [34.7, 79.3],
  // Eastern Ladakh / Aksai Chin border
  [34.3, 79.0], [33.5, 79.0], [32.9, 79.3], [32.5, 78.8],
  // Himachal / Uttarakhand border with Tibet
  [31.8, 78.7], [31.1, 79.1], [30.9, 79.7], [30.7, 80.6], [30.2, 81.0],
  // Border with Nepal along Himalayas (Kalapani to Sikkim)
  [29.8, 80.6], [29.2, 80.3], [28.8, 80.1], [28.5, 80.8], [28.2, 81.3],
  [27.7, 82.2], [27.4, 83.2], [27.2, 84.1], [26.9, 85.1], [26.6, 86.2],
  [26.5, 87.2], [26.7, 88.0],
  // Sikkim (Gangtok, Kanchenjunga)
  [27.1, 88.1], [27.5, 88.2], [28.0, 88.6], [28.0, 88.8], [27.3, 88.9],
  // Siliguri corridor & Border with Bhutan
  [26.9, 88.9], [26.9, 89.8], [27.3, 91.5], [27.3, 92.0],
  // Arunachal Pradesh along the McMahon Line
  [27.7, 92.5], [28.2, 93.5], [28.6, 94.2], [29.0, 95.0], [29.3, 96.0],
  [28.8, 96.8], [28.2, 97.4], [27.8, 97.2],
  // Eastern border with Myanmar (Nagaland & Manipur)
  [27.1, 96.5], [26.5, 95.4], [25.7, 94.8], [24.8, 94.4], [24.0, 93.8],
  // Mizoram southern tip
  [23.0, 93.2], [22.4, 93.0], [21.9, 92.9], [22.2, 92.6], [23.1, 92.3],
  // Tripura salient
  [23.5, 91.8], [23.8, 91.3], [24.3, 92.1],
  // Meghalaya southern edge (Garo, Khasi, Jaintia hills)
  [25.1, 92.3], [25.1, 91.2], [25.2, 90.0],
  // Assam / West Bengal northern border with Bangladesh
  [25.8, 89.8], [26.3, 89.8], [26.2, 88.7], [25.4, 88.7], [24.8, 88.1],
  // Bengal delta & Sundarbans (Bay of Bengal)
  [24.0, 88.5], [22.8, 88.9], [21.8, 89.0], [21.6, 88.3], [21.6, 87.5],
  // Odisha coastline (Puri, Chilika Lake, Konark)
  [20.5, 86.8], [19.8, 85.9], [19.2, 84.9],
  // Andhra Pradesh coastline (Visakhapatnam, Kakinada, Machilipatnam)
  [18.2, 83.9], [17.7, 83.3], [16.5, 82.2], [15.8, 80.8], [14.5, 80.2],
  // Tamil Nadu coast (Chennai, Mahabalipuram, Puducherry, Thanjavur)
  [13.4, 80.3], [13.1, 80.3], [12.0, 79.8], [10.8, 79.8], [9.9, 79.2],
  // Palk Strait & Rameswaram Island
  [9.3, 79.3], [9.1, 79.1], [8.8, 78.2],
  // Kanyakumari - Southern tip of India (Block 1)
  [8.08, 77.54],
  // Kerala coast (Thiruvananthapuram, Alappuzha, Kochi, Kozhikode)
  [8.4, 76.9], [9.3, 76.5], [9.9, 76.2], [11.2, 75.7], [12.0, 75.2],
  // Karnataka coast (Mangaluru, Karwar)
  [12.8, 74.8], [14.2, 74.4], [14.8, 74.1],
  // Goa (Panaji, Vasco)
  [15.2, 73.8], [15.8, 73.7],
  // Maharashtra Konkan coast (Ratnagiri, Alibag, Mumbai)
  [16.5, 73.3], [17.5, 73.1], [18.9, 72.8], [19.5, 72.8], [20.4, 72.8],
  // Gujarat - Gulf of Khambhat & Kathiawar / Saurashtra peninsula
  [21.1, 72.7], [21.6, 72.2], [20.7, 71.0], [20.9, 70.3], [21.5, 69.6],
  [22.2, 68.9], // Dwarka tip
  // Gulf of Kutch & Rann of Kutch (Westernmost boundary)
  [22.8, 69.1], [23.1, 68.5], [23.7, 68.3], [24.2, 68.8], [24.4, 70.5],
  [24.5, 71.2],
  // Rajasthan western desert border with Pakistan (Barmer, Jaisalmer, Bikaner)
  [25.0, 71.1], [25.8, 70.4], [26.8, 70.2], [27.8, 70.8], [28.6, 71.8],
  [29.9, 73.2],
  // Punjab border (Amritsar, Gurdaspur)
  [30.6, 74.2], [31.6, 74.8], [32.2, 75.3],
  // Jammu & Kashmir western line (Jammu, Poonch, Uri, Baramulla)
  [32.8, 74.8], [33.7, 74.1], [34.3, 73.9], [34.8, 74.2],
  // Northern Gilgit / Baltistan / Karakoram crest back to Siachen
  [35.3, 74.9], [35.6, 75.8], [35.5, 77.0]
];

/**
 * Returns an accurate SVG path `d` string for the main boundary of India.
 */
export function getIndiaOutlineSvgPath(): string {
  if (INDIA_BORDER_POINTS.length === 0) return '';

  return INDIA_BORDER_POINTS.map((pt, idx) => {
    const { x, y } = projectGeoCoord(pt[0], pt[1]);
    return idx === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ') + ' Z';
}

/**
 * Authentic geographic coordinates (lat, lng) for all 80 game locations.
 * Every single milestone projects to its real physical location in India!
 */
export const LOCATIONS_GEO_MAP: Record<number, { lat: number; lng: number }> = {
  1: { lat: 8.08, lng: 77.54 }, // Kanyakumari
  2: { lat: 8.52, lng: 76.94 }, // Thiruvananthapuram
  3: { lat: 9.93, lng: 76.26 }, // Kochi
  4: { lat: 9.92, lng: 78.11 }, // Madurai
  5: { lat: 10.78, lng: 79.13 }, // Thanjavur
  6: { lat: 9.28, lng: 79.31 }, // Rameswaram
  7: { lat: 12.62, lng: 80.19 }, // Mahabalipuram
  8: { lat: 13.08, lng: 80.27 }, // Chennai
  9: { lat: 11.94, lng: 79.80 }, // Puducherry
  10: { lat: 13.62, lng: 79.41 }, // Tirupati
  11: { lat: 16.57, lng: 80.35 }, // Amaravati
  12: { lat: 17.68, lng: 83.21 }, // Visakhapatnam
  13: { lat: 17.38, lng: 78.48 }, // Hyderabad
  14: { lat: 17.96, lng: 79.60 }, // Warangal
  15: { lat: 15.33, lng: 76.46 }, // Hampi
  16: { lat: 12.29, lng: 76.63 }, // Mysuru
  17: { lat: 12.97, lng: 77.59 }, // Bengaluru
  18: { lat: 15.91, lng: 75.67 }, // Badami
  19: { lat: 15.94, lng: 75.81 }, // Pattadakal
  20: { lat: 15.49, lng: 73.82 }, // Goa
  21: { lat: 18.92, lng: 72.83 }, // Mumbai
  22: { lat: 20.55, lng: 75.70 }, // Ajanta
  23: { lat: 20.02, lng: 75.17 }, // Ellora
  24: { lat: 19.99, lng: 73.78 }, // Nashik
  25: { lat: 18.52, lng: 73.85 }, // Pune
  26: { lat: 23.02, lng: 72.57 }, // Ahmedabad
  27: { lat: 23.58, lng: 72.13 }, // Modhera
  28: { lat: 22.24, lng: 68.96 }, // Dwarka
  29: { lat: 20.89, lng: 70.40 }, // Somnath
  30: { lat: 23.83, lng: 69.83 }, // Kutch
  31: { lat: 24.58, lng: 73.68 }, // Udaipur
  32: { lat: 26.29, lng: 73.02 }, // Jodhpur
  33: { lat: 26.91, lng: 75.78 }, // Jaipur
  34: { lat: 26.91, lng: 70.90 }, // Jaisalmer
  35: { lat: 24.59, lng: 72.71 }, // Mount Abu
  36: { lat: 23.25, lng: 77.41 }, // Bhopal
  37: { lat: 23.48, lng: 77.73 }, // Sanchi
  38: { lat: 24.83, lng: 79.92 }, // Khajuraho
  39: { lat: 26.21, lng: 78.17 }, // Gwalior
  40: { lat: 25.35, lng: 78.64 }, // Orchha
  41: { lat: 27.17, lng: 78.00 }, // Agra
  42: { lat: 28.65, lng: 77.24 }, // Delhi - Red Fort
  43: { lat: 28.61, lng: 77.23 }, // Delhi - India Gate
  44: { lat: 28.52, lng: 77.18 }, // Delhi - Qutub Minar
  45: { lat: 27.49, lng: 77.67 }, // Mathura
  46: { lat: 25.31, lng: 82.97 }, // Varanasi
  47: { lat: 25.38, lng: 83.02 }, // Sarnath
  48: { lat: 26.79, lng: 82.20 }, // Ayodhya
  49: { lat: 26.84, lng: 80.94 }, // Lucknow
  50: { lat: 25.43, lng: 81.84 }, // Prayagraj
  51: { lat: 24.69, lng: 84.99 }, // Bodh Gaya
  52: { lat: 25.13, lng: 85.44 }, // Nalanda
  53: { lat: 25.59, lng: 85.13 }, // Patna
  54: { lat: 22.57, lng: 88.36 }, // Kolkata
  55: { lat: 23.07, lng: 87.31 }, // Bishnupur
  56: { lat: 20.29, lng: 85.82 }, // Bhubaneswar
  57: { lat: 19.81, lng: 85.83 }, // Puri
  58: { lat: 19.88, lng: 86.09 }, // Konark
  59: { lat: 23.34, lng: 85.30 }, // Ranchi
  60: { lat: 26.14, lng: 91.73 }, // Guwahati
  61: { lat: 25.57, lng: 91.89 }, // Shillong
  62: { lat: 25.27, lng: 91.73 }, // Cherrapunji
  63: { lat: 24.81, lng: 93.93 }, // Imphal
  64: { lat: 25.67, lng: 94.10 }, // Kohima
  65: { lat: 23.72, lng: 92.71 }, // Aizawl
  66: { lat: 23.83, lng: 91.28 }, // Agartala
  67: { lat: 27.33, lng: 88.61 }, // Gangtok
  68: { lat: 27.04, lng: 88.26 }, // Darjeeling
  69: { lat: 26.72, lng: 88.43 }, // Siliguri
  70: { lat: 30.31, lng: 78.03 }, // Dehradun
  71: { lat: 30.08, lng: 78.26 }, // Rishikesh
  72: { lat: 29.94, lng: 78.16 }, // Haridwar
  73: { lat: 31.63, lng: 74.87 }, // Amritsar
  74: { lat: 30.73, lng: 76.77 }, // Chandigarh
  75: { lat: 31.10, lng: 77.17 }, // Shimla
  76: { lat: 32.24, lng: 77.18 }, // Manali
  77: { lat: 34.08, lng: 74.79 }, // Srinagar
  78: { lat: 34.15, lng: 77.57 }, // Leh
  79: { lat: 34.58, lng: 77.56 }, // Nubra
  80: { lat: 34.20, lng: 77.62 }  // Ladakh Summit (Grand Finish)
};

/**
 * Returns pre-projected (x, y) coordinates for a location ID.
 */
export function getProjectedLocationCoord(id: number): { x: number; y: number } {
  const geo = LOCATIONS_GEO_MAP[id];
  if (geo) {
    return projectGeoCoord(geo.lat, geo.lng);
  }
  // Fallback
  return { x: 450, y: 500 };
}

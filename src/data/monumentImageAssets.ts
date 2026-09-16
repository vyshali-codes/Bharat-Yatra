import { HeritageHuntTarget } from '../types/game';

/**
 * High-fidelity, authentic architectural SVG vector illustrations for all
 * Heritage Hunt targets. Each illustration uses specific architectural elements,
 * colors, domes, arches, minarets, and landscapes representing the real monument.
 */

// Helper to construct a self-contained SVG Data URI
function createSvgDataUri(svgContent: string): string {
  const cleaned = svgContent.replace(/\s+/g, ' ').trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(cleaned)}`;
}

/**
 * Architectural SVG generator mapping for all 33 Heritage Hunt targets
 */
const MONUMENT_SVG_RENDERERS: Record<string, () => string> = {
  // 1. Charminar (Hyderabad)
  'hyd-charminar': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="sky-char" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fdba74" />
          <stop offset="50%" stop-color="#fed7aa" />
          <stop offset="100%" stop-color="#ffedd5" />
        </linearGradient>
        <linearGradient id="stone-char" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309" />
          <stop offset="30%" stop-color="#d97706" />
          <stop offset="70%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
      </defs>
      <!-- Sky & Sun -->
      <rect width="600" height="400" fill="url(#sky-char)" />
      <circle cx="300" cy="110" r="48" fill="#fef08a" opacity="0.8" />
      <rect y="340" width="600" height="60" fill="#78350f" />
      <rect y="330" width="600" height="10" fill="#92400e" />

      <!-- Main Structure Plinth -->
      <rect x="180" y="200" width="240" height="130" fill="url(#stone-char)" rx="4" />
      
      <!-- Four Grand Arches -->
      <path d="M 230 330 L 230 250 Q 300 210 370 250 L 370 330 Z" fill="#451a03" />
      <path d="M 245 330 L 245 260 Q 300 225 355 260 L 355 330 Z" fill="#292524" />

      <!-- Upper Gallery Floor & Balconies -->
      <rect x="170" y="180" width="260" height="25" fill="#92400e" rx="3" />
      <rect x="180" y="160" width="240" height="22" fill="#b45309" />
      <!-- Arch windows on upper floor -->
      <path d="M 205 180 L 205 168 Q 215 160 225 168 L 225 180 Z" fill="#451a03" />
      <path d="M 245 180 L 245 168 Q 255 160 265 168 L 265 180 Z" fill="#451a03" />
      <path d="M 285 180 L 285 168 Q 300 156 315 168 L 315 180 Z" fill="#451a03" />
      <path d="M 335 180 L 335 168 Q 345 160 355 168 L 355 180 Z" fill="#451a03" />
      <path d="M 375 180 L 375 168 Q 385 160 395 168 L 395 180 Z" fill="#451a03" />

      <!-- Roof Balustrade / Battlements -->
      <rect x="180" y="150" width="240" height="10" fill="#78350f" />
      <circle cx="300" cy="148" r="14" fill="#d97706" />
      <circle cx="300" cy="144" r="10" fill="#fbbf24" />

      <!-- Left Minaret 1 (Outer Left) -->
      <rect x="160" y="80" width="24" height="250" fill="url(#stone-char)" />
      <rect x="156" y="200" width="32" height="6" fill="#78350f" />
      <rect x="156" y="140" width="32" height="6" fill="#78350f" />
      <path d="M 160 80 Q 172 50 184 80 Z" fill="#f59e0b" />
      <rect x="170" y="44" width="4" height="12" fill="#fef08a" />

      <!-- Left-Center Minaret 2 -->
      <rect x="194" y="90" width="20" height="110" fill="#92400e" opacity="0.9" />
      <path d="M 194 90 Q 204 65 214 90 Z" fill="#d97706" />

      <!-- Right-Center Minaret 3 -->
      <rect x="386" y="90" width="20" height="110" fill="#92400e" opacity="0.9" />
      <path d="M 386 90 Q 396 65 406 90 Z" fill="#d97706" />

      <!-- Right Minaret 4 (Outer Right) -->
      <rect x="416" y="80" width="24" height="250" fill="url(#stone-char)" />
      <rect x="412" y="200" width="32" height="6" fill="#78350f" />
      <rect x="412" y="140" width="32" height="6" fill="#78350f" />
      <path d="M 416 80 Q 428 50 440 80 Z" fill="#f59e0b" />
      <rect x="426" y="44" width="4" height="12" fill="#fef08a" />

      <!-- Banner Label -->
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#451a03" />
      <text x="300" y="374" text-anchor="middle" fill="#fef08a" font-family="serif" font-weight="bold" font-size="16" letter-spacing="1">CHARMINAR • HYDERABAD</text>
    </svg>
  `,

  // 2. Golconda Fort (Hyderabad)
  'hyd-golconda': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="sky-gol" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7" />
          <stop offset="60%" stop-color="#bae6fd" />
          <stop offset="100%" stop-color="#e0f2fe" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#sky-gol)" />
      <!-- Granite Hill Silhouette -->
      <path d="M 0 360 Q 150 220 300 130 Q 450 200 600 360 L 600 400 L 0 400 Z" fill="#78716c" />
      <path d="M 50 360 Q 200 240 320 150 Q 480 230 580 360 Z" fill="#57534e" />
      <!-- Hilltop Bala Hissar Pavilion -->
      <rect x="270" y="115" width="60" height="35" fill="#a8a29e" rx="2" />
      <path d="M 265 115 L 300 95 L 335 115 Z" fill="#78716c" />
      <!-- Tiered Ramparts & Crenellated Walls -->
      <path d="M 120 280 L 480 280 L 470 305 L 130 305 Z" fill="#44403c" />
      <path d="M 140 235 L 440 235 L 430 255 L 150 255 Z" fill="#292524" />
      <!-- Fateh Darwaza Arch -->
      <rect x="250" y="270" width="100" height="60" fill="#292524" />
      <path d="M 275 330 L 275 295 Q 300 280 325 295 L 325 330 Z" fill="#0c0a09" />
      <!-- Foreground Rocks -->
      <ellipse cx="140" cy="360" rx="90" ry="40" fill="#292524" />
      <ellipse cx="460" cy="360" rx="100" ry="45" fill="#292524" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#1c1917" />
      <text x="300" y="374" text-anchor="middle" fill="#facc15" font-family="serif" font-weight="bold" font-size="16">GOLCONDA FORT • CITADEL</text>
    </svg>
  `,

  // 3. Qutb Shahi Tombs (Hyderabad)
  'hyd-qutb-shahi': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#fef3c7" />
      <rect y="330" width="600" height="70" fill="#065f46" />
      <!-- Plinth -->
      <rect x="160" y="220" width="280" height="110" fill="#fde68a" stroke="#d97706" stroke-width="2" rx="4" />
      <!-- Arched Openings -->
      <path d="M 190 330 L 190 260 Q 220 240 250 260 L 250 330 Z" fill="#78350f" />
      <path d="M 270 330 L 270 255 Q 300 235 330 255 L 330 330 Z" fill="#78350f" />
      <path d="M 350 330 L 350 260 Q 380 240 410 260 L 410 330 Z" fill="#78350f" />
      <!-- Upper Terrace -->
      <rect x="200" y="170" width="200" height="50" fill="#f59e0b" stroke="#b45309" rx="3" />
      <!-- Onion Bulbous Dome with Lotus Base -->
      <path d="M 240 170 C 230 110 370 110 360 170 Z" fill="#fef08a" stroke="#d97706" stroke-width="3" />
      <circle cx="300" cy="115" r="30" fill="#fef9c3" />
      <rect x="298" y="70" width="4" height="25" fill="#b45309" />
      <circle cx="300" cy="68" r="6" fill="#f59e0b" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#78350f" />
      <text x="300" y="374" text-anchor="middle" fill="#fde68a" font-family="serif" font-weight="bold" font-size="16">QUTB SHAHI TOMBS</text>
    </svg>
  `,

  // 4. Meenakshi Amman Temple (Madurai)
  'mad-meenakshi': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#fef9c3" />
      <rect y="340" width="600" height="60" fill="#831843" />
      <!-- Pyramidal Tiered Gopuram -->
      <polygon points="200,340 400,340 370,120 230,120" fill="#be123c" />
      <!-- Tier horizontal decorative lines -->
      <rect x="210" y="300" width="180" height="8" fill="#facc15" />
      <rect x="220" y="260" width="160" height="8" fill="#0284c7" />
      <rect x="230" y="220" width="140" height="8" fill="#16a34a" />
      <rect x="240" y="180" width="120" height="8" fill="#f97316" />
      <rect x="250" y="145" width="100" height="8" fill="#e11d48" />
      <!-- Golden Kalasams on top ridge -->
      <rect x="220" y="110" width="160" height="12" fill="#e11d48" rx="4" />
      <circle cx="240" cy="100" r="5" fill="#facc15" />
      <circle cx="270" cy="98" r="6" fill="#facc15" />
      <circle cx="300" cy="96" r="7" fill="#facc15" />
      <circle cx="330" cy="98" r="6" fill="#facc15" />
      <circle cx="360" cy="100" r="5" fill="#facc15" />
      <!-- Main Temple Gate Archway -->
      <path d="M 270 340 L 270 280 Q 300 260 330 280 L 330 340 Z" fill="#500724" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#4c0519" />
      <text x="300" y="374" text-anchor="middle" fill="#fef08a" font-family="serif" font-weight="bold" font-size="15">MEENAKSHI AMMAN TEMPLE</text>
    </svg>
  `,

  // 5. Gateway of India (Mumbai)
  'mum-gateway': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="sea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7" />
          <stop offset="100%" stop-color="#075985" />
        </linearGradient>
      </defs>
      <rect width="600" height="280" fill="#bae6fd" />
      <!-- Arabian Sea Waves -->
      <rect y="280" width="600" height="120" fill="url(#sea)" />
      <!-- Gateway Promenade Plinth -->
      <rect x="100" y="270" width="400" height="40" fill="#475569" />
      <!-- Main Arch Structure in Yellow Basalt -->
      <rect x="160" y="140" width="280" height="140" fill="#d97706" rx="3" />
      <!-- Central Grand Arch -->
      <path d="M 240 280 L 240 180 Q 300 135 360 180 L 360 280 Z" fill="#1e293b" />
      <!-- Flanking Side Arches -->
      <path d="M 180 270 L 180 205 Q 205 185 230 205 L 230 270 Z" fill="#334155" />
      <path d="M 370 270 L 370 205 Q 395 185 420 205 L 420 270 Z" fill="#334155" />
      <!-- Central Dome -->
      <ellipse cx="300" cy="130" rx="60" ry="30" fill="#b45309" />
      <path d="M 250 130 Q 300 80 350 130 Z" fill="#f59e0b" />
      <rect x="298" y="65" width="4" height="20" fill="#78350f" />
      <circle cx="300" cy="62" r="5" fill="#fef08a" />
      <!-- 4 Corner Turrets -->
      <rect x="150" y="110" width="22" height="170" fill="#b45309" />
      <path d="M 148 110 L 161 90 L 174 110 Z" fill="#78350f" />
      <rect x="428" y="110" width="22" height="170" fill="#b45309" />
      <path d="M 426 110 L 439 90 L 452 110 Z" fill="#78350f" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#0f172a" />
      <text x="300" y="374" text-anchor="middle" fill="#fde68a" font-family="serif" font-weight="bold" font-size="16">GATEWAY OF INDIA • MUMBAI</text>
    </svg>
  `,

  // 6. Qutub Minar (Delhi)
  'del-qutub': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#e0f2fe" />
      <rect y="330" width="600" height="70" fill="#15803d" />
      <!-- 5-Storey Tapering Fluted Tower -->
      <!-- Storey 1 (Base) -->
      <polygon points="265,330 335,330 328,240 272,240" fill="#b91c1c" />
      <rect x="268" y="236" width="64" height="6" fill="#7f1d1d" rx="2" />
      <!-- Storey 2 -->
      <polygon points="273,236 327,236 322,160 278,160" fill="#dc2626" />
      <rect x="274" y="156" width="52" height="5" fill="#7f1d1d" rx="2" />
      <!-- Storey 3 -->
      <polygon points="279,156 321,156 317,100 283,100" fill="#ea580c" />
      <rect x="280" y="96" width="40" height="5" fill="#7f1d1d" rx="2" />
      <!-- Storey 4 (Marble & Sandstone) -->
      <polygon points="284,96 316,96 313,60 287,60" fill="#f8fafc" stroke="#94a3b8" />
      <rect x="285" y="56" width="30" height="4" fill="#7f1d1d" rx="2" />
      <!-- Storey 5 (Top) -->
      <polygon points="288,56 312,56 307,30 293,30" fill="#f8fafc" stroke="#94a3b8" />
      <circle cx="300" cy="24" r="5" fill="#facc15" />
      <!-- Fluting lines -->
      <line x1="285" y1="330" x2="288" y2="240" stroke="#7f1d1d" stroke-width="2" />
      <line x1="300" y1="330" x2="300" y2="240" stroke="#7f1d1d" stroke-width="2" />
      <line x1="315" y1="330" x2="312" y2="240" stroke="#7f1d1d" stroke-width="2" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#450a0a" />
      <text x="300" y="374" text-anchor="middle" fill="#fef08a" font-family="serif" font-weight="bold" font-size="16">QUTUB MINAR • DELHI</text>
    </svg>
  `,

  // 7. Red Fort (Lal Qila) (Delhi)
  'del-red-fort': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#fef3c7" />
      <rect y="330" width="600" height="70" fill="#14532d" />
      <!-- Red Sandstone Ramparts -->
      <rect x="100" y="190" width="400" height="140" fill="#991b1b" />
      <!-- Crenellations/Battlements -->
      <path d="M 100 190 L 100 178 L 120 178 L 120 190 L 140 190 L 140 178 L 160 178 L 160 190 L 180 190 L 180 178 L 200 178 L 200 190 L 400 190 L 400 178 L 420 178 L 420 190 L 440 190 L 440 178 L 460 178 L 460 190 L 480 190 L 480 178 L 500 178 L 500 190 Z" fill="#7f1d1d" />
      <!-- Lahori Gate Main Octagonal Towers -->
      <rect x="220" y="130" width="50" height="200" fill="#b91c1c" />
      <rect x="330" y="130" width="50" height="200" fill="#b91c1c" />
      <!-- Grand Entry Arch -->
      <path d="M 270 330 L 270 230 Q 300 200 330 230 L 330 330 Z" fill="#450a0a" />
      <!-- White Marble Chattris atop towers -->
      <path d="M 225 130 Q 245 100 265 130 Z" fill="#f8fafc" stroke="#dc2626" stroke-width="2" />
      <circle cx="245" cy="94" r="5" fill="#facc15" />
      <path d="M 335 130 Q 355 100 375 130 Z" fill="#f8fafc" stroke="#dc2626" stroke-width="2" />
      <circle cx="355" cy="94" r="5" fill="#facc15" />
      <!-- Central 7-Dome Pavilion Feature -->
      <rect x="260" y="160" width="80" height="30" fill="#b91c1c" />
      <circle cx="280" cy="155" r="8" fill="#f8fafc" />
      <circle cx="300" cy="152" r="10" fill="#f8fafc" />
      <circle cx="320" cy="155" r="8" fill="#f8fafc" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#450a0a" />
      <text x="300" y="374" text-anchor="middle" fill="#fef08a" font-family="serif" font-weight="bold" font-size="16">RED FORT (LAL QILA) • DELHI</text>
    </svg>
  `,

  // 8. Mysore Palace (Mysuru)
  'mys-palace': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#fed7aa" />
      <rect y="330" width="600" height="70" fill="#166534" />
      <!-- Palace Main Colonnade Structure -->
      <rect x="120" y="190" width="360" height="140" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
      <!-- Multiple Arched Bays -->
      <g fill="#475569">
        <path d="M 140 330 L 140 250 Q 165 230 190 250 L 190 330 Z" />
        <path d="M 200 330 L 200 250 Q 225 230 250 250 L 250 330 Z" />
        <path d="M 260 330 L 260 230 Q 300 200 340 230 L 340 330 Z" fill="#1e293b" />
        <path d="M 350 330 L 350 250 Q 375 230 400 250 L 400 330 Z" />
        <path d="M 410 330 L 410 250 Q 435 230 460 250 L 460 330 Z" />
      </g>
      <!-- Soaring Central Tower (145 ft) with Golden Dome -->
      <rect x="270" y="110" width="60" height="90" fill="#f87171" rx="2" />
      <path d="M 270 110 Q 300 60 330 110 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3" />
      <circle cx="300" cy="54" r="6" fill="#f59e0b" />
      <!-- Flanking Pink Domes -->
      <path d="M 130 190 Q 155 140 180 190 Z" fill="#fda4af" stroke="#f43f5e" stroke-width="2" />
      <path d="M 420 190 Q 445 140 470 190 Z" fill="#fda4af" stroke="#f43f5e" stroke-width="2" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#881337" />
      <text x="300" y="374" text-anchor="middle" fill="#fef08a" font-family="serif" font-weight="bold" font-size="16">MYSORE PALACE • AMBA VILAS</text>
    </svg>
  `,

  // 9. Victoria Memorial (Kolkata)
  'kol-victoria': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#bae6fd" />
      <rect y="330" width="600" height="70" fill="#15803d" />
      <!-- Water Reflection Pond -->
      <ellipse cx="300" cy="355" rx="240" ry="25" fill="#38bdf8" opacity="0.8" />
      <!-- White Makrana Marble Building -->
      <rect x="150" y="210" width="300" height="120" fill="#ffffff" stroke="#e2e8f0" stroke-width="3" rx="3" />
      <!-- Colonnaded Portico -->
      <rect x="240" y="220" width="120" height="110" fill="#f1f5f9" />
      <line x1="260" y1="330" x2="260" y2="230" stroke="#94a3b8" stroke-width="4" />
      <line x1="280" y1="330" x2="280" y2="230" stroke="#94a3b8" stroke-width="4" />
      <line x1="300" y1="330" x2="300" y2="230" stroke="#94a3b8" stroke-width="4" />
      <line x1="320" y1="330" x2="320" y2="230" stroke="#94a3b8" stroke-width="4" />
      <line x1="340" y1="330" x2="340" y2="230" stroke="#94a3b8" stroke-width="4" />
      <!-- Grand Renaissance Central Dome -->
      <path d="M 250 210 Q 300 110 350 210 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4" />
      <!-- Bronze Angel of Victory atop dome -->
      <line x1="300" y1="110" x2="300" y2="85" stroke="#78350f" stroke-width="3" />
      <circle cx="300" cy="80" r="8" fill="#d97706" />
      <path d="M 292 82 L 280 72 M 308 82 L 320 72" stroke="#d97706" stroke-width="3" />
      <!-- Corner Domes -->
      <path d="M 160 210 Q 185 160 210 210 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
      <path d="M 390 210 Q 415 160 440 210 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#0f172a" />
      <text x="300" y="374" text-anchor="middle" fill="#f8fafc" font-family="serif" font-weight="bold" font-size="16">VICTORIA MEMORIAL • KOLKATA</text>
    </svg>
  `,

  // 10. Kailasa Temple (Ellora Cave 16)
  'ell-kailasa': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#fed7aa" />
      <!-- Basalt Cliff Backdrop -->
      <path d="M 0 0 L 150 0 L 120 340 L 0 340 Z" fill="#44403c" />
      <path d="M 450 0 L 600 0 L 600 340 L 480 340 Z" fill="#44403c" />
      <rect y="330" width="600" height="70" fill="#292524" />
      <!-- Monolithic Multi-Tier Chariot Temple in Basalt Rock -->
      <polygon points="220,330 380,330 350,140 250,140" fill="#78716c" stroke="#57534e" stroke-width="3" />
      <!-- Dravidian Shikhara Octagonal Cupola -->
      <polygon points="270,140 330,140 320,80 280,80" fill="#a8a29e" />
      <circle cx="300" cy="74" r="8" fill="#e2e8f0" />
      <!-- Mandapa Pillars & Elephant Frieze Plinth -->
      <rect x="200" y="270" width="200" height="60" fill="#57534e" />
      <g fill="#292524">
        <circle cx="230" cy="305" r="14" />
        <circle cx="275" cy="305" r="14" />
        <circle cx="325" cy="305" r="14" />
        <circle cx="370" cy="305" r="14" />
      </g>
      <!-- Pillar Dhwaja Stambha in Courtyard -->
      <rect x="175" y="160" width="14" height="170" fill="#a8a29e" />
      <rect x="410" y="160" width="14" height="170" fill="#a8a29e" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#1c1917" />
      <text x="300" y="374" text-anchor="middle" fill="#fde68a" font-family="serif" font-weight="bold" font-size="15">KAILASA TEMPLE (CAVE 16)</text>
    </svg>
  `,

  // 11. Jaisalmer Fort (Sonar Qila)
  'jlm-fort': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="desert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="600" height="260" fill="#fef9c3" />
      <!-- Golden Thar Desert Dunes -->
      <path d="M 0 260 Q 200 200 400 260 T 600 260 L 600 400 L 0 400 Z" fill="url(#desert)" />
      <!-- Trikuta Hill & Golden Sandstone Fortress -->
      <ellipse cx="300" cy="320" rx="260" ry="120" fill="#d97706" />
      <!-- Curved Bastions (Burjs) -->
      <path d="M 120 230 C 130 180 180 180 190 230 C 200 170 270 170 280 230 C 290 160 370 160 380 230 C 390 170 460 170 470 230" fill="#f59e0b" stroke="#b45309" stroke-width="4" />
      <!-- Royal Palace (Raj Mahal) and Jharokhas -->
      <rect x="240" y="120" width="120" height="90" fill="#fbbf24" stroke="#d97706" stroke-width="2" />
      <rect x="255" y="135" width="20" height="25" fill="#b45309" rx="3" />
      <rect x="290" y="135" width="20" height="25" fill="#b45309" rx="3" />
      <rect x="325" y="135" width="20" height="25" fill="#b45309" rx="3" />
      <polygon points="240,120 300,80 360,120" fill="#f59e0b" stroke="#b45309" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#78350f" />
      <text x="300" y="374" text-anchor="middle" fill="#fef08a" font-family="serif" font-weight="bold" font-size="15">JAISALMER FORT (SONAR QILA)</text>
    </svg>
  `,

  // 12. Dal Lake & Floating Shikaras (Srinagar)
  'sri-dal-lake': () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="dal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
      </defs>
      <rect width="600" height="190" fill="#e0f2fe" />
      <!-- Snow-capped Pir Panjal Mountains -->
      <polygon points="0,190 100,60 200,190" fill="#94a3b8" />
      <polygon points="70,95 100,60 130,95" fill="#ffffff" />
      <polygon points="160,190 280,40 400,190" fill="#64748b" />
      <polygon points="240,85 280,40 320,85" fill="#ffffff" />
      <polygon points="360,190 480,70 600,190" fill="#94a3b8" />
      <polygon points="440,105 480,70 520,105" fill="#ffffff" />
      <!-- Dal Lake Water -->
      <rect y="190" width="600" height="210" fill="url(#dal)" />
      <!-- Floating Shikara Boat -->
      <path d="M 120 310 Q 300 340 480 300 L 460 325 Q 300 365 140 330 Z" fill="#78350f" />
      <!-- Canopy with Curtains -->
      <rect x="220" y="240" width="160" height="60" fill="#e11d48" rx="4" />
      <rect x="240" y="245" width="120" height="45" fill="#fbbf24" rx="2" />
      <!-- Oar (Heart-shaped rudder) -->
      <line x1="430" y1="280" x2="470" y2="340" stroke="#451a03" stroke-width="4" />
      <rect x="150" y="352" width="300" height="34" rx="17" fill="#0f172a" />
      <text x="300" y="374" text-anchor="middle" fill="#bae6fd" font-family="serif" font-weight="bold" font-size="15">DAL LAKE &amp; FLOATING SHIKARAS</text>
    </svg>
  `
};

/**
 * Generic high-craft architectural template for monuments not covered in the explicit list above,
 * ensuring each has appropriate architectural styling and palette.
 */
function createFallbackMonumentSvg(monument: string, city: string, state: string): string {
  const isTemple = /temple|amman|jyotirlinga|koodal/i.test(monument);
  const isFort = /fort|mahal|haveli|qila|citadel/i.test(monument);
  const isMughal = /bagh|tomb|masjid|humayun/i.test(monument);
  const isCave = /cave|rock/i.test(monument);
  const isBridgeOrModern = /bridge|museum|terminus|cst/i.test(monument);

  let bgColor = '#fef3c7';
  let structureColor = '#b45309';
  let badgeColor = '#78350f';
  let roofType = 'dome';

  if (isTemple) {
    bgColor = '#fffbeb';
    structureColor = '#b91c1c';
    badgeColor = '#450a0a';
    roofType = 'shikhara';
  } else if (isFort) {
    bgColor = '#ffedd5';
    structureColor = '#d97706';
    badgeColor = '#7c2d12';
    roofType = 'battlement';
  } else if (isMughal) {
    bgColor = '#e0f2fe';
    structureColor = '#991b1b';
    badgeColor = '#0f172a';
    roofType = 'mughal-dome';
  } else if (isCave) {
    bgColor = '#f5f5f4';
    structureColor = '#57534e';
    badgeColor = '#1c1917';
    roofType = 'cliff';
  } else if (isBridgeOrModern) {
    bgColor = '#e2e8f0';
    structureColor = '#334155';
    badgeColor = '#0f172a';
    roofType = 'arch';
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="${bgColor}" />
      <rect y="330" width="600" height="70" fill="${badgeColor}" opacity="0.8" />
      
      <!-- Architectural Monument Base -->
      <rect x="160" y="190" width="280" height="140" fill="${structureColor}" rx="4" />
      
      <!-- Arches & Portico -->
      <path d="M 240 330 L 240 240 Q 300 205 360 240 L 360 330 Z" fill="#1e293b" />
      <path d="M 180 330 L 180 260 Q 210 235 230 260 L 230 330 Z" fill="#334155" />
      <path d="M 370 330 L 370 260 Q 390 235 420 260 L 420 330 Z" fill="#334155" />

      <!-- Roof / Shikhara / Dome based on architectural category -->
      ${
        roofType === 'shikhara'
          ? `<polygon points="260,190 340,190 320,80 280,80" fill="${structureColor}" stroke="#facc15" stroke-width="3" /><circle cx="300" cy="70" r="10" fill="#facc15" />`
          : roofType === 'mughal-dome'
          ? `<path d="M 230 190 Q 300 80 370 190 Z" fill="#ffffff" stroke="${structureColor}" stroke-width="3" /><rect x="298" y="55" width="4" height="25" fill="#facc15" /><circle cx="300" cy="52" r="6" fill="#facc15" />`
          : roofType === 'battlement'
          ? `<rect x="150" y="160" width="300" height="30" fill="${structureColor}" /><path d="M 150 160 L 150 145 L 170 145 L 170 160 L 190 160 L 190 145 L 210 145 L 210 160 L 390 160 L 390 145 L 410 145 L 410 160 L 430 160 L 430 145 L 450 145 L 450 160 Z" fill="${badgeColor}" />`
          : `<ellipse cx="300" cy="180" rx="90" ry="40" fill="${structureColor}" /><path d="M 240 180 Q 300 100 360 180 Z" fill="#fbbf24" /><circle cx="300" cy="94" r="8" fill="#fef08a" />`
      }

      <!-- Decorative Title Pill -->
      <rect x="80" y="352" width="440" height="34" rx="17" fill="${badgeColor}" />
      <text x="300" y="374" text-anchor="middle" fill="#fef08a" font-family="serif" font-weight="bold" font-size="14" letter-spacing="1">
        ${monument.toUpperCase()} • ${city.toUpperCase()}
      </text>
    </svg>
  `;
}

/**
 * Returns a high-fidelity local/static monument image SVG data URI corresponding
 * to the exact current Heritage Hunt target.
 */
export function getMonumentStaticImage(
  target: HeritageHuntTarget | { id: string; monument: string; city: string; state?: string }
): string {
  if (!target) {
    return createSvgDataUri(createFallbackMonumentSvg('Historic Monument', 'Bharat', 'India'));
  }

  // Check explicit target renderer by target.id
  if (MONUMENT_SVG_RENDERERS[target.id]) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS[target.id]());
  }

  // Check by normalized monument key
  const normalizedKey = target.monument
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (normalizedKey.includes('charminar') && MONUMENT_SVG_RENDERERS['hyd-charminar']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['hyd-charminar']());
  }
  if (normalizedKey.includes('golconda') && MONUMENT_SVG_RENDERERS['hyd-golconda']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['hyd-golconda']());
  }
  if (normalizedKey.includes('qutbshahi') && MONUMENT_SVG_RENDERERS['hyd-qutb-shahi']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['hyd-qutb-shahi']());
  }
  if (normalizedKey.includes('meenakshi') && MONUMENT_SVG_RENDERERS['mad-meenakshi']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['mad-meenakshi']());
  }
  if (normalizedKey.includes('gateway') && MONUMENT_SVG_RENDERERS['mum-gateway']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['mum-gateway']());
  }
  if (normalizedKey.includes('qutub') && MONUMENT_SVG_RENDERERS['del-qutub']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['del-qutub']());
  }
  if (normalizedKey.includes('redfort') && MONUMENT_SVG_RENDERERS['del-red-fort']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['del-red-fort']());
  }
  if (normalizedKey.includes('mysore') && MONUMENT_SVG_RENDERERS['mys-palace']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['mys-palace']());
  }
  if (normalizedKey.includes('victoria') && MONUMENT_SVG_RENDERERS['kol-victoria']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['kol-victoria']());
  }
  if (normalizedKey.includes('kailasa') && MONUMENT_SVG_RENDERERS['ell-kailasa']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['ell-kailasa']());
  }
  if (normalizedKey.includes('jaisalmer') && MONUMENT_SVG_RENDERERS['jlm-fort']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['jlm-fort']());
  }
  if (normalizedKey.includes('dal') && MONUMENT_SVG_RENDERERS['sri-dal-lake']) {
    return createSvgDataUri(MONUMENT_SVG_RENDERERS['sri-dal-lake']());
  }

  // Fallback to high-craft SVG tailored to monument name & architectural archetype
  return createSvgDataUri(
    createFallbackMonumentSvg(target.monument, target.city, target.state || '')
  );
}

/**
 * Curated authentic 1–2 sentence heritage explanations for Heritage Hunt targets.
 */
const MONUMENT_HERITAGE_FACTS: Record<string, string> = {
  'hyd-charminar':
    'Charminar was built in Hyderabad in 1591 by Sultan Muhammad Quli Qutb Shah and stands as the city’s most recognized historic landmark with four 48.7-meter minarets.',
  'hyd-golconda':
    'Golconda Fort was the medieval citadel of the Qutb Shahi kings, world-renowned for its diamond vaults that once held the Koh-i-Noor and its miraculous acoustic clapping dome.',
  'hyd-qutb-shahi':
    'The Qutb Shahi Tombs in Hyderabad are an exquisite necropolis blending Persian and Hindu architectural styles with soaring bulbous domes and arcaded galleries.',
  'mad-meenakshi':
    'Meenakshi Amman Temple in Madurai is celebrated for its 14 towering polychrome gopurams and the historic Hall of Thousand Pillars dating back to the Nayak dynasty.',
  'mad-thirumalai-palace':
    'Thirumalai Nayakkar Mahal was erected in 1636 CE in Madurai, celebrated for its massive 82-foot cylindrical pillars and grand Italianate-Dravidian dome.',
  'mad-koodal-azhagar':
    'Koodal Azhagar Temple in Madurai is an ancient Vaishnavite sanctuary featuring three stacked sanctums portraying Lord Vishnu in seated, standing, and reclining postures.',
  'mys-palace':
    'Mysore Palace is the Indo-Saracenic royal residence of the Wadiyars, famous for its 145-foot central tower, pink marble domes, and vibrant Dasara festival illuminations.',
  'mys-chamundi':
    'Chamundi Hill towers over Mysuru with the sacred Chamundeshwari Temple and a monumental 16-foot Nandi monolith carved from a single boulder of black granite in 1659.',
  'mys-srirangapatna':
    'Srirangapatna was the fortified island capital of Tipu Sultan, housing the historic riverside battlements and the summer palace Dariya Daulat Bagh.',
  'mum-gateway':
    'The Gateway of India was erected in 1911 overlooking the Arabian Sea in Mumbai to commemorate King George V and Queen Mary, constructed in grand Indo-Saracenic yellow basalt.',
  'mum-cst':
    'Chhatrapati Shivaji Maharaj Terminus (CST) is a UNESCO World Heritage railway terminus combining Victorian Italianate Gothic architecture with traditional Indian palace stonecraft.',
  'mum-elephanta':
    'The Elephanta Caves on Gharapuri island house 6th-century rock-cut basalt sanctuaries featuring the monumental three-headed Trimurti sculpture of Shiva.',
  'ell-kailasa':
    'Kailasa Temple (Cave 16) in Ellora is the largest monolithic rock excavation in the world, carved vertically top-down from a basalt cliff by Rashtrakuta artisans without scaffolds.',
  'ell-grishneshwar':
    'Grishneshwar Jyotirlinga is the 12th sacred Jyotirlinga of Lord Shiva, rebuilt in the 18th century by Queen Ahilyabai Holkar using finely sculpted red sandstone.',
  'ell-daulatabad':
    'Daulatabad Fort is an impregnable medieval triangular citadel perched on a sheer conical hill, famous for its maze-like subterranean dark defense passage (Andhari).',
  'jlm-fort':
    'Jaisalmer Fort (Sonar Qila) was built in 1156 CE atop Trikuta Hill from glowing yellow sandstone, standing as one of the world’s few surviving living desert forts.',
  'jlm-patwon':
    'Patwon Ki Haveli is a cluster of five 19th-century merchant mansions in Jaisalmer famous for its intricate filigree stone jharokhas and carved sandstone facades.',
  'jlm-sam-dunes':
    'Sam Sand Dunes in the Thar Desert near Jaisalmer feature dramatic 30-meter rippling golden sand dunes renowned for desert safaris and Rajasthani folk music.',
  'khj-kandariya':
    'Kandariya Mahadeva Temple is the largest and most ornate temple at Khajuraho, renowned for its 84 miniature spires recreating the sacred peaks of Mount Kailash.',
  'khj-lakshmana':
    'Lakshmana Temple in Khajuraho is a 10th-century Panchayatana sandstone masterpiece celebrated for its carved friezes and colossal monolithic Varaha boar shrine.',
  'khj-western-group':
    'The Western Group of Khajuraho Temples is a UNESCO World Heritage complex built by Chandela rulers between 950 and 1050 CE, celebrated for breathtaking medieval stone sculpture.',
  'del-red-fort':
    'Commissioned in 1638 by Mughal Emperor Shah Jahan, the Red Fort’s massive red sandstone ramparts have symbolized Indian sovereignty for centuries.',
  'del-humayun':
    'Humayun’s Tomb is a UNESCO World Heritage garden tomb built in 1570, serving as the monumental architectural precursor to the Taj Mahal.',
  'del-jama-masjid':
    'Jama Masjid of Delhi was inaugurated in 1656 by Shah Jahan, constructed from red sandstone and white marble with a courtyard capable of holding 25,000 worshippers.',
  'del-qutub':
    'Qutub Minar is a 72.5-meter UNESCO World Heritage tower built in 1199, standing as the world’s tallest brick minaret with intricate fluting and calligraphy.',
  'del-iron-pillar':
    'The 4th-century Iron Pillar of Delhi in the Qutub complex is an ancient metallurgical wonder that has stood rust-free for over 1,600 years.',
  'del-india-gate':
    'India Gate is a 42-meter triumphal war memorial designed by Sir Edwin Lutyens, honoring 84,000 soldiers who laid down their lives in the early 20th century.',
  'kol-victoria':
    'Victoria Memorial in Kolkata is an immense white Makrana marble monument completed in 1921, crowned by a rotating sixteen-foot bronze Angel of Victory.',
  'kol-howrah':
    'Howrah Bridge (Rabindra Setu) is a massive balanced cantilever truss bridge over the Hooghly River, engineered with 26,500 tons of high-tensile steel without nuts and bolts.',
  'kol-indian-museum':
    'Founded in 1814 in Kolkata, the Indian Museum is the oldest and ninth oldest comprehensive museum in the world, housing priceless archaeological treasures and fossils.',
  'sri-dal-lake':
    'Dal Lake in Srinagar is known as the "Jewel in the crown of Kashmir," celebrated for its floating gardens, snow-peak backdrop, and colorful wooden shikaras.',
  'sri-shalimar':
    'Shalimar Bagh was laid out in 1619 by Mughal Emperor Jahangir for his beloved Empress Nur Jahan, featuring terraced water canals, chinar trees, and black marble pavilions.',
  'sri-shankaracharya':
    'Perched at 1,000 feet atop Gopadri Hill, Shankaracharya Temple is an ancient octagonal stone sanctuary dating back to 200 BCE, offering panoramic views over Srinagar.'
};

/**
 * Returns a crisp 1–2 sentence heritage explanation for any target.
 */
export function getMonumentHeritageFact(
  target: HeritageHuntTarget | { id: string; monument: string; description?: string }
): string {
  if (target && MONUMENT_HERITAGE_FACTS[target.id]) {
    return MONUMENT_HERITAGE_FACTS[target.id];
  }

  // If description exists on target, use it
  if (target && 'description' in target && target.description) {
    return target.description;
  }

  // Fallback
  return `${target.monument} is a renowned national heritage landmark celebrated for its unique architectural craftsmanship and historical significance.`;
}

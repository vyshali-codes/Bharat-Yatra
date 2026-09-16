import { Monument } from '../types/game';

export const MONUMENTS_DATA: Monument[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra',
    state: 'Uttar Pradesh',
    description: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of Mughal Emperor Shah Jahan in memory of his favourite wife Mumtaz Mahal.',
    historicalFacts: [
      'Commissioned by Mughal Emperor Shah Jahan in 1631.',
      'Constructed with translucent white Makrana marble from Rajasthan.',
      'Employs pietra dura (parchin kari) floral stone inlay techniques.',
      'Recognized as a UNESCO World Heritage Site and one of the New 7 Wonders of the World.'
    ],
    heritageImportance: 'Masterpiece of Mughal architecture combining Persian, Islamic, and Indian artistic traditions with flawless symmetry.',
    iconType: 'mausoleum',
    accentColor: '#f59e0b'
  },
  {
    id: 'charminar',
    name: 'Charminar',
    location: 'Hyderabad',
    state: 'Telangana',
    description: 'A grand monument and mosque built in 1591 by Muhammad Quli Qutb Shah, the fifth ruler of the Qutb Shahi dynasty, to commemorate the end of a deadly plague.',
    historicalFacts: [
      'Constructed in 1591 at the intersection of historic trade routes.',
      'Stands on four grand arches each spanning 11 meters wide.',
      'The four ornate minarets soar to a height of 48.7 meters.',
      'Features a 400-year-old mosque on the top floor.'
    ],
    heritageImportance: 'The global emblem of Hyderabad and a landmark of Indo-Islamic architecture with Persian stucco artistry.',
    iconType: 'arch',
    accentColor: '#0284c7'
  },
  {
    id: 'gateway-of-india',
    name: 'Gateway of India',
    location: 'Mumbai',
    state: 'Maharashtra',
    description: 'An iconic 20th-century arch monument overlooking the Arabian Sea, constructed to commemorate the visit of King George V and Queen Mary in 1911.',
    historicalFacts: [
      'Designed by Scottish architect George Wittet in Indo-Saracenic style.',
      'Built with yellow basalt and reinforced concrete on the Apollo Bunder waterfront.',
      'Central dome measures 15 meters in diameter and rises 26 meters high.',
      'The last British troops (First Battalion, Somerset Light Infantry) departed India through this arch in 1948.'
    ],
    heritageImportance: 'Chief maritime ceremonial entrance to India, symbolizing historic transitions in modern Indian history.',
    iconType: 'monument',
    accentColor: '#ea580c'
  },
  {
    id: 'india-gate',
    name: 'India Gate',
    location: 'New Delhi',
    state: 'Delhi NCR',
    description: 'A 42-meter-high triumphal arch honoring 84,000 soldiers of the British Indian Army who lost their lives during the First World War and Third Anglo-Afghan War.',
    historicalFacts: [
      'Designed by Sir Edwin Lutyens and completed in 1931.',
      'Inscribed with the names of over 13,000 individual servicemen.',
      'Housed the Amar Jawan Jyoti (Flame of the Immortal Soldier) for five decades.',
      'Stands at the eastern terminus of Kartavya Path (formerly Rajpath).'
    ],
    heritageImportance: 'National symbol of collective memory, valor, and sacrifice in the defense of the nation.',
    iconType: 'arch',
    accentColor: '#ef4444'
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar',
    location: 'New Delhi',
    state: 'Delhi NCR',
    description: 'A 72.5-meter towering minaret of red sandstone and marble, the tallest brick minaret in the world, surrounded by several ancient and medieval structures.',
    historicalFacts: [
      'Construction initiated by Qutb-ud-din Aibak in 1199 and continued by Shams-ud-din Iltutmish.',
      'Features five distinct tapering storeys with projecting cantilevered balconies.',
      'Accompanied by the 4th-century Gupta-era rustless Iron Pillar of Delhi.',
      'Inscribed with ornate Kufic calligraphy and geometric honeycomb patterns.'
    ],
    heritageImportance: 'UNESCO World Heritage Site showcasing the earliest synthesis of Islamic and indigenous stone-carving traditions in India.',
    iconType: 'tower',
    accentColor: '#8b5cf6'
  },
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    location: 'Konark',
    state: 'Odisha',
    description: 'A 13th-century CE temple dedicated to the Sun God Surya, built by King Narasimhadeva I of the Eastern Ganga Dynasty in the shape of a monumental 24-wheeled chariot.',
    historicalFacts: [
      'Built circa 1250 CE on the shores of the Bay of Bengal.',
      'The 24 carved stone wheels function as accurate solar sundials.',
      'Pulled by seven sculptured horses representing the days of the week.',
      'Sailors historically referred to it as the "Black Pagoda" because of its dark granite silhouette.'
    ],
    heritageImportance: 'Pinnacle of Kalinga temple architecture and a UNESCO World Heritage cultural wonder.',
    iconType: 'temple',
    accentColor: '#d97706'
  },
  {
    id: 'hampi',
    name: 'Hampi (Vijayanagara)',
    location: 'Hampi',
    state: 'Karnataka',
    description: 'The spectacular capital ruins of the Vijayanagara Empire situated on the banks of the Tungabhadra River, renowned for monolithic sculptures and boulder landscapes.',
    historicalFacts: [
      'Flourished between the 14th and 16th centuries as one of the richest cities in the world.',
      'Contains the celebrated stone chariot inside the Vijaya Vittala Temple.',
      'Vittala Temple complex features musical granite pillars that resonate with notes when struck.',
      'UNESCO World Heritage Site spread across over 4,100 hectares.'
    ],
    heritageImportance: 'One of the largest open-air archaeological museums in the world reflecting South Indian royal splendor.',
    iconType: 'ruins',
    accentColor: '#ca8a04'
  },
  {
    id: 'sanchi-stupa',
    name: 'Sanchi Stupa',
    location: 'Sanchi',
    state: 'Madhya Pradesh',
    description: 'The Great Stupa at Sanchi is one of the oldest stone structures in India, originally commissioned by Mauryan Emperor Ashoka the Great in the 3rd century BCE.',
    historicalFacts: [
      'Encloses sacred Buddhist relics beneath a solid hemispherical dome.',
      'Surrounded by four elaborately carved stone toranas (ceremonial gateways).',
      'The carvings narrate the Jataka tales and life episodes of Gautama Buddha.',
      'Discovered and documented for modern antiquity in 1818 by General Henry Taylor.'
    ],
    heritageImportance: 'Foundational benchmark of Indian Buddhist monumental art and UNESCO World Heritage sanctuary.',
    iconType: 'stupa',
    accentColor: '#16a34a'
  },
  {
    id: 'golden-temple',
    name: 'Golden Temple (Harmandir Sahib)',
    location: 'Amritsar',
    state: 'Punjab',
    description: 'Sri Harmandir Sahib is the holiest Gurdwara and spiritual center of Sikhism, famous for its gold-plated dome and surrounding holy Amrit Sarovar lake.',
    historicalFacts: [
      'Founded by the fourth Sikh Guru, Guru Ram Das Ji, in 1577.',
      'Foundation stone laid by the revered Sufi saint Hazrat Mian Mir in 1589.',
      'Maharaja Ranjit Singh covered the upper sanctum with 400 kg of pure gold leaf in 1830.',
      'The community Langar kitchen serves over 100,000 free hot meals daily without discrimination.'
    ],
    heritageImportance: 'Supreme living sanctuary of universal brotherhood, equality, selfless community service, and divine contemplation.',
    iconType: 'temple',
    accentColor: '#eab308'
  },
  {
    id: 'meenakshi-temple',
    name: 'Meenakshi Amman Temple',
    location: 'Madurai',
    state: 'Tamil Nadu',
    description: 'A historic Hindu temple on the southern bank of the Vaigai River in Madurai, dedicated to Meenakshi (a form of Parvati) and Sundareswarar (Shiva).',
    historicalFacts: [
      'Celebrated for 14 towering gopurams decorated with thousands of painted mythological stucco figures.',
      'Contains the celebrated Hall of Thousand Pillars (Ayiram Kaal Mandapam) sculpted in 1569.',
      'Historic heart around which the lotus-shaped city of Madurai was geometrically laid out.',
      'Attracts tens of thousands of visitors daily with continuous traditional rites.'
    ],
    heritageImportance: 'Crown jewel of Dravidian architecture and the living soul of ancient Tamil cultural heritage.',
    iconType: 'temple',
    accentColor: '#9333ea'
  },
  {
    id: 'mysore-palace',
    name: 'Mysore Palace (Amba Vilas)',
    location: 'Mysuru',
    state: 'Karnataka',
    description: 'The historic royal residence of the Wadiyar dynasty, built in the magnificent Indo-Saracenic style with domes, turrets, arches, and colonnades.',
    historicalFacts: [
      'Designed by British architect Henry Irwin and completed in 1912.',
      'Illuminated by nearly 100,000 incandescent light bulbs during Dasara festival.',
      'Houses the legendary solid gold Golden Throne (Chinnada Simhasana).',
      'One of the most visited monuments in India, rivaling the Taj Mahal in annual footfall.'
    ],
    heritageImportance: 'Exquisite synthesis of Hindu, Mughal, Rajput, and Gothic architectural elegance.',
    iconType: 'palace',
    accentColor: '#059669'
  },
  {
    id: 'victoria-memorial',
    name: 'Victoria Memorial',
    location: 'Kolkata',
    state: 'West Bengal',
    description: 'A large marble building in Central Kolkata, built between 1906 and 1921, dedicated to the memory of Queen Victoria and currently an expansive museum.',
    historicalFacts: [
      'Conceived by Lord Curzon and designed by architect William Emerson.',
      'Constructed with white Makrana marble from the same quarries as the Taj Mahal.',
      'Crowned by a rotating sixteen-foot bronze Angel of Victory atop the central dome.',
      'Surrounded by 64 acres of lush landscaped gardens and ornamental water pools.'
    ],
    heritageImportance: 'Premier architectural testament to the British colonial period and museum of fine arts in Bengal.',
    iconType: 'memorial',
    accentColor: '#0d9488'
  },
  {
    id: 'red-fort',
    name: 'Red Fort (Lal Qila)',
    location: 'Delhi',
    state: 'Delhi NCR',
    description: 'A historic fortified palace complex constructed in red sandstone, serving as the main residence of the Mughal Emperors for nearly 200 years.',
    historicalFacts: [
      'Inaugurated by Mughal Emperor Shah Jahan in 1648.',
      'Contains the Diwan-i-Aam (Hall of Public Audience) and Diwan-i-Khas (Private Audience).',
      'The Lahori Gate is the site where the Prime Minister addresses the nation every Independence Day.',
      'Designated a UNESCO World Heritage Site in 2007.'
    ],
    heritageImportance: 'Sovereign architectural symbol of Indian national independence and Mughal civic grandeur.',
    iconType: 'fort',
    accentColor: '#dc2626'
  },
  {
    id: 'ajanta-caves',
    name: 'Ajanta Caves',
    location: 'Chhatrapati Sambhajinagar (Aurangabad)',
    state: 'Maharashtra',
    description: 'Approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, carved into a dramatic horseshoe-shaped cliff above the Waghur River.',
    historicalFacts: [
      'Discovered accidentally in 1819 by a British cavalry officer, John Smith, while hunting tigers.',
      'Features world-renowned fresco-style tempera paintings depicting Jataka legends.',
      'Created in two major phases: Hinayana/Theravada phase followed by Mahayana phase.',
      'Masterpieces include the serene murals of Padmapani and Vajrapani Bodhisattvas.'
    ],
    heritageImportance: 'The supreme surviving masterpieces of classical Indian religious painting and sculpture.',
    iconType: 'cave',
    accentColor: '#7c3aed'
  },
  {
    id: 'ellora-caves',
    name: 'Ellora Caves',
    location: 'Chhatrapati Sambhajinagar (Aurangabad)',
    state: 'Maharashtra',
    description: 'A colossal complex of 34 major rock-cut monasteries and temples carved side-by-side into the Charanandri hills, representing Buddhist, Hindu, and Jain traditions.',
    historicalFacts: [
      'Spans over five centuries of construction (6th to 10th century CE).',
      'Cave 16 features the Kailash Temple, the largest monolithic rock excavation in the world.',
      'Excavated top-down from vertical volcanic basalt without scaffolds.',
      'Testifies to the peaceful coexistence and patronage of three major Indian faiths.'
    ],
    heritageImportance: 'Unequalled zenith of rock-cut architectural audacity and harmonious religious synthesis.',
    iconType: 'cave',
    accentColor: '#b45309'
  }
];

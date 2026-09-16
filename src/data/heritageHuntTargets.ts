import { HeritageHuntTarget } from '../types/game';

/**
 * Structured Heritage Hunt Targets Database
 * Covers all 10 Heritage Hunt milestone blocks:
 * 13: Hyderabad
 * 16: Mysuru
 * 21: Mumbai
 * 23: Ellora
 * 34: Jaisalmer
 * 38: Khajuraho
 * 42: Delhi (Red Fort)
 * 44: Delhi (Qutub Minar)
 * 54: Kolkata
 * 77: Srinagar
 *
 * Each location has multiple heritage targets, each with 3 distinct clues,
 * accepted aliases, descriptions, and sample filenames.
 */
export const HERITAGE_HUNT_TARGETS: HeritageHuntTarget[] = [
  // --- BLOCK 4: MADURAI ---
  {
    id: 'mad-meenakshi',
    locationId: 4,
    city: 'Madurai',
    state: 'Tamil Nadu',
    monument: 'Meenakshi Amman Temple',
    clues: [
      'I am an ancient temple complex on the banks of the Vaigai River, famous for 14 towering, richly sculpted gopurams.',
      'My tallest southern tower rises to 52 meters, adorned with thousands of colorful mythological figures and deities.',
      'Celebrated for the Hall of Thousand Pillars (Aayiram Kaal Mandapam) carved from granite, I am the spiritual heart of the city.'
    ],
    acceptedAliases: ['meenakshi temple', 'meenakshi amman', 'madurai meenakshi', 'meenakshi'],
    description: 'Dravidian temple masterpiece featuring fourteen majestic polychrome gopurams and the sacred Golden Lotus tank.',
    historicalPeriod: 'Pandya & Nayak Dynasty (16th–17th Century)',
    sampleFilename: 'meenakshi_temple.jpg'
  },
  {
    id: 'mad-thirumalai-palace',
    locationId: 4,
    city: 'Madurai',
    state: 'Tamil Nadu',
    monument: 'Thirumalai Nayakkar Mahal',
    clues: [
      'I am a 17th-century palace built by a Nayak king with Italian and Dravidian architectural influences, renowned for giant cylindrical pillars.',
      'My grand Swarga Vilasam (Celestial Pavilion) features an arcaded interior supported by massive pillars over 20 meters high.',
      'Commissioned in 1636 CE, I stood as a wonder of the South, celebrated for my massive stucco dome without any supporting rafters.'
    ],
    acceptedAliases: ['thirumalai palace', 'thirumalai nayakkar mahal', 'nayak palace', 'nayakkar mahal'],
    description: 'Grand Indo-Saracenic palace celebrated for its massive 82-foot columns and soaring stuccowork dome.',
    historicalPeriod: 'Madurai Nayak Dynasty (1636 CE)',
    sampleFilename: 'thirumalai_nayakkar_mahal.jpg'
  },
  {
    id: 'mad-koodal-azhagar',
    locationId: 4,
    city: 'Madurai',
    state: 'Tamil Nadu',
    monument: 'Koodal Azhagar Temple',
    clues: [
      'I am an ancient Vishnu sanctuary in central Madurai featuring three distinct postures of the deity sculpted on three stacked tiers.',
      'Pilgrims climb my tiers to view Lord Vishnu in seated, standing, and reclining (Anantasayana) sanctums.',
      'Mentioned in ancient Sangam literature like the Silappatikaram, I am one of the 108 sacred Divya Desams.'
    ],
    acceptedAliases: ['koodal azhagar', 'koodal azhagar temple', 'koodal alagar'],
    description: 'Unique multi-tiered Dravidian temple featuring three sanctums depicting seated, standing, and reclining forms of Vishnu.',
    historicalPeriod: 'Pandya / Vijayanagara Era',
    sampleFilename: 'koodal_azhagar.jpg'
  },

  // --- BLOCK 13: HYDERABAD ---
  {
    id: 'hyd-charminar',
    locationId: 13,
    city: 'Hyderabad',
    state: 'Telangana',
    monument: 'Charminar',
    clues: [
      'I stand at the heart of Hyderabad. Four towering minarets define my silhouette. Can you identify me?',
      'My name literally translates to "four towers". I was commissioned in 1591 by Sultan Muhammad Quli Qutb Shah to commemorate the eradication of a deadly plague.',
      'I stand at the historic crossroads of ancient Deccan trade routes, crowned by four graceful arches and a four-century-old upper-level mosque.'
    ],
    acceptedAliases: ['charminar', 'char minar', 'four minarets', 'charminar hyderabad'],
    description: 'Iconic 16th-century square monument with four graceful 48.7m minarets built by the Qutb Shahi dynasty.',
    historicalPeriod: 'Qutb Shahi Dynasty (1591 CE)',
    sampleFilename: 'charminar.jpg'
  },
  {
    id: 'hyd-golconda',
    locationId: 13,
    city: 'Hyderabad',
    state: 'Telangana',
    monument: 'Golconda Fort',
    clues: [
      'I am a medieval citadel perched on a 120-meter granite hill, renowned for my diamond vaults and miraculous acoustic clapping portico.',
      'World-famous diamonds like the Koh-i-Noor and Hope Diamond once passed through my fortified royal vaults.',
      'A single handclap beneath my entry dome (Fateh Darwaza) can be heard distinctly 1 kilometer away at the hilltop Bala Hissar pavilion.'
    ],
    acceptedAliases: ['golconda', 'golconda fort', 'golkonda', 'golconda hyderabad'],
    description: 'Historic fortified citadel of the Kakatiyas and Qutb Shahis, world-famous for its acoustic engineering and diamond heritage.',
    historicalPeriod: 'Kakatiya & Qutb Shahi (13th–16th Century)',
    sampleFilename: 'golconda_fort.jpg'
  },
  {
    id: 'hyd-qutb-tombs',
    locationId: 13,
    city: 'Hyderabad',
    state: 'Telangana',
    monument: 'Qutb Shahi Tombs',
    clues: [
      'I am a peaceful cluster of domed mausoleums nestled in Ibrahim Bagh, honoring the founding sultans of Hyderabad.',
      'My ornate grey granite domes blend Persian, Pathan, and Hindu architectural styles, surrounded by landscaped royal gardens.',
      'Located just outside the Golconda ramparts, my grand domed pavilions commemorate seven generations of Deccan rulers.'
    ],
    acceptedAliases: ['qutb shahi tombs', 'qutub shahi tombs', 'seven tombs', 'ibrahim bagh'],
    description: 'Exquisite ensemble of royal mausoleums exhibiting Indo-Persian architecture and stone carving.',
    historicalPeriod: 'Qutb Shahi Sultanate (16th–17th Century)',
    sampleFilename: 'qutb_shahi_tombs.jpg'
  },

  // --- BLOCK 16: MYSURU ---
  {
    id: 'mys-palace',
    locationId: 16,
    city: 'Mysuru',
    state: 'Karnataka',
    monument: 'Mysore Palace (Amba Vilas)',
    clues: [
      'I am the opulent Indo-Saracenic royal seat of the Wadiyar dynasty, illuminated by nearly 100,000 light bulbs during the Dasara festival.',
      'Designed by British architect Henry Irwin with domes, turrets, and gilded halls, I house the fabled solid gold Golden Throne.',
      'I stand in the center of Mysuru as one of India\'s most visited royal palaces, famous for royal processions and stained glass ceilings.'
    ],
    acceptedAliases: ['mysore palace', 'amba vilas', 'amba vilas palace', 'mysuru palace'],
    description: 'Magnificent royal residence combining Hindu, Mughal, Rajput, and Gothic architectural splendor.',
    historicalPeriod: 'Wadiyar Dynasty (Completed 1912 CE)',
    sampleFilename: 'mysore_palace.jpg'
  },
  {
    id: 'mys-chamundi-nandi',
    locationId: 16,
    city: 'Mysuru',
    state: 'Karnataka',
    monument: 'Chamundi Hill & Monolithic Nandi',
    clues: [
      'I overlook the royal city of Mysuru from a sacred hilltop 1,000 meters above sea level, crowned by a Dravidian temple.',
      'Halfway up my flight of 1,000 ancient stone steps rests a colossal 16-foot monolithic granite Nandi bull carved in 1659.',
      'My summit enshrines the guardian warrior goddess Chamundeshwari who defeated the demon king Mahishasura.'
    ],
    acceptedAliases: ['chamundi hill', 'chamundeshwari temple', 'chamundi nandi', 'mysore nandi'],
    description: 'Sacred hill and 16-foot monolithic Nandi sculpture overlooking the historic plains of Mysuru.',
    historicalPeriod: 'Wadiyar & Ganga Dynasty Heritage',
    sampleFilename: 'chamundi_hill.jpg'
  },
  {
    id: 'mys-srirangapatna',
    locationId: 16,
    city: 'Mysuru',
    state: 'Karnataka',
    monument: 'Srirangapatna Fort & Dariya Daulat Bagh',
    clues: [
      'I am an island fortress encircled by the sacred Kaveri River near Mysuru, once the fortified capital of Tipu Sultan.',
      'My summer palace is constructed purely of teakwood and covered with vivid frescoes depicting the Battle of Pollilur.',
      'Known as the "Tiger of Mysore\'s" stronghold, my river bastions witnessed epic Anglo-Mysore confrontations.'
    ],
    acceptedAliases: ['srirangapatna', 'dariya daulat bagh', 'tipu sultan palace', 'srirangapatna fort'],
    description: 'Historic island fortress and summer palace preserving teakwood architecture and mural paintings.',
    historicalPeriod: 'Kingdom of Mysore (18th Century CE)',
    sampleFilename: 'srirangapatna.jpg'
  },

  // --- BLOCK 21: MUMBAI ---
  {
    id: 'mum-gateway',
    locationId: 21,
    city: 'Mumbai',
    state: 'Maharashtra',
    monument: 'Gateway of India',
    clues: [
      'I am a majestic 26-meter basalt triumphal arch overlooking Mumbai harbor on the waterfront of the Arabian Sea.',
      'Built in Indo-Saracenic style to commemorate the royal visit of King George V in 1911, the last British regiment departed through me in 1948.',
      'Designed by George Wittet, I stand at Apollo Bunder facing the open sea, flanked by the historic Taj Mahal Palace Hotel.'
    ],
    acceptedAliases: ['gateway of india', 'gateway mumbai', 'apollo bunder arch', 'gateway'],
    description: 'Premier maritime ceremonial archway of India built from yellow basalt on Mumbai\'s waterfront.',
    historicalPeriod: 'Indo-Saracenic Colonial (1924 CE)',
    sampleFilename: 'gateway_of_india.jpg'
  },
  {
    id: 'mum-cst',
    locationId: 21,
    city: 'Mumbai',
    state: 'Maharashtra',
    monument: 'Chhatrapati Shivaji Maharaj Terminus (CST)',
    clues: [
      'I am a UNESCO World Heritage railway terminus combining Victorian Gothic revival architecture with traditional Indian palace crafts.',
      'Adorned with gargoyles, stained glass rose windows, and a majestic stone dome crowned by the figure of Progress, I was formerly known as Victoria Terminus.',
      'Designed by Frederick William Stevens, my grand railway hall is the beating heart of Mumbai\'s transit heritage.'
    ],
    acceptedAliases: ['cst', 'csmt', 'victoria terminus', 'vt station', 'chhatrapati shivaji terminus'],
    description: 'Victorian Gothic architectural masterpiece and bustling historic railway headquarters.',
    historicalPeriod: 'Victorian Gothic Revival (1887 CE)',
    sampleFilename: 'cst_station.jpg'
  },
  {
    id: 'mum-elephanta',
    locationId: 21,
    city: 'Mumbai',
    state: 'Maharashtra',
    monument: 'Elephanta Caves (Gharapuri)',
    clues: [
      'I am an island of rock-cut cave sanctuaries situated 10 kilometers offshore in Mumbai harbor, reachable by ferry.',
      'My central basalt cavern houses the celebrated 6-meter-tall Sadashiva Trimurti depicting the three faces of Lord Shiva.',
      'Dating from the 5th to 8th century, Portuguese explorers named me after a colossal stone elephant found at my shores.'
    ],
    acceptedAliases: ['elephanta', 'elephanta caves', 'trimurti cave', 'gharapuri'],
    description: 'UNESCO World Heritage rock-cut cave temples dedicated to Shiva, famous for the colossal Trimurti sculpture.',
    historicalPeriod: 'Kalachuri & Rashtrakuta Dynasties (5th–8th Century CE)',
    sampleFilename: 'elephanta_caves.jpg'
  },

  // --- BLOCK 23: ELLORA ---
  {
    id: 'ell-kailasa',
    locationId: 23,
    city: 'Ellora',
    state: 'Maharashtra',
    monument: 'Kailasa Temple (Cave 16)',
    clues: [
      'I am the world\'s largest monolithic rock excavation, carved vertically top-down from a single volcanic basalt cliff.',
      'Commissioned by Rashtrakuta King Krishna I, 200,000 tonnes of rock were meticulously chiseled away without building scaffolds.',
      'I stand inside Cave 16 of Ellora as a multi-storey sanctuary replicating Mount Kailash, decorated with life-sized stone elephants.'
    ],
    acceptedAliases: ['kailasa temple', 'kailash temple', 'cave 16', 'ellora kailash'],
    description: 'Colossal top-down rock-cut monolithic Hindu temple dedicated to Lord Shiva.',
    historicalPeriod: 'Rashtrakuta Dynasty (8th Century CE)',
    sampleFilename: 'kailasa_temple.jpg'
  },
  {
    id: 'ell-grishneshwar',
    locationId: 23,
    city: 'Ellora',
    state: 'Maharashtra',
    monument: 'Grishneshwar Jyotirlinga',
    clues: [
      'I am the 12th and final sacred Jyotirlinga shrine of India, located just minutes from the rock-cut caves of Ellora.',
      'Constructed with red volcanic stone and carved with five-tiered shikhara spires, I was lovingly restored by Queen Ahilyabai Holkar in the 18th century.',
      'Devout pilgrims visit my sanctum to receive blessings of Lord Shiva right beneath the historic Charanandri hills.'
    ],
    acceptedAliases: ['grishneshwar', 'grishneshwar temple', 'ghrushneshwar', 'grishneshwar jyotirlinga'],
    description: 'Ancient red-basalt Jyotirlinga temple rebuilt in pre-modern Maratha temple architectural style.',
    historicalPeriod: 'Maratha Era (18th Century CE Restoration)',
    sampleFilename: 'grishneshwar.jpg'
  },
  {
    id: 'ell-daulatabad',
    locationId: 23,
    city: 'Ellora',
    state: 'Maharashtra',
    monument: 'Daulatabad Fort (Devagiri)',
    clues: [
      'I am a formidable triangular fortress built upon an isolated 200-meter conical hill rising between Ellora and Aurangabad.',
      'I am famous for an impregnable defense system featuring a moat full of crocodiles and a pitch-black subterranean maze called the Andhari.',
      'Muhammad bin Tughluq famously attempted to shift his empire\'s imperial capital from Delhi to my hill in 1327 CE.'
    ],
    acceptedAliases: ['daulatabad', 'daulatabad fort', 'devagiri', 'deogiri'],
    description: 'One of the most powerful medieval hill fortresses in India, known for genius deceptive defensive architecture.',
    historicalPeriod: 'Yadava & Tughluq Dynasties (12th–14th Century CE)',
    sampleFilename: 'daulatabad_fort.jpg'
  },

  // --- BLOCK 34: JAISALMER ---
  {
    id: 'jai-fort',
    locationId: 34,
    city: 'Jaisalmer',
    state: 'Rajasthan',
    monument: 'Jaisalmer Fort (Sonar Qila)',
    clues: [
      'I am the famous Golden Fort rising like a desert mirage from the Thar Desert\'s Trikuta Hill, glowing amber at sunset.',
      'Built of yellow sandstone without any mortar, I am one of the world\'s rare "living forts" where one-fourth of the old city\'s population still resides.',
      'Founded in 1156 CE by Rajput ruler Rawal Jaisal, my triple-ring ramparts and 99 bastions guarded desert trade routes.'
    ],
    acceptedAliases: ['jaisalmer fort', 'sonar qila', 'golden fort', 'sonar kella'],
    description: 'UNESCO World Heritage living hill fort made of shimmering golden-yellow sandstone.',
    historicalPeriod: 'Bhati Rajput Dynasty (1156 CE)',
    sampleFilename: 'jaisalmer_fort.jpg'
  },
  {
    id: 'jai-patwon-haveli',
    locationId: 34,
    city: 'Jaisalmer',
    state: 'Rajasthan',
    monument: 'Patwon Ki Haveli',
    clues: [
      'I am an ensemble of five magnificent merchant mansions renowned for the finest hand-carved sandstone jharokha balconies in Rajasthan.',
      'Commissioned by a wealthy brocade and jewelry merchant for his five sons, my stone latticework looks like delicate golden lace.',
      'I stand in the narrow lanes of Jaisalmer, showcasing 60 ornate balconies and painted ceiling murals.'
    ],
    acceptedAliases: ['patwon ki haveli', 'patwa haveli', 'patwon haveli', 'jaisalmer haveli'],
    description: 'Cluster of five opulent 19th-century mansions showcasing peerless Rajasthani stone filigree work.',
    historicalPeriod: 'Rajasthani Merchant Era (1805 CE)',
    sampleFilename: 'patwon_haveli.jpg'
  },
  {
    id: 'jai-sam-dunes',
    locationId: 34,
    city: 'Jaisalmer',
    state: 'Rajasthan',
    monument: 'Sam Sand Dunes (Thar Desert)',
    clues: [
      'I am an expansive stretch of wind-rippled golden sand dunes located on the edge of the Desert National Park near Jaisalmer.',
      'Famous for camel caravans, Kalbelia folk performances, and mesmerizing orange desert sunsets.',
      'My golden dunes shift and reform constantly with the Thar desert wind, offering starry night skies to desert travelers.'
    ],
    acceptedAliases: ['sam sand dunes', 'sam dunes', 'thar desert dunes', 'jaisalmer dunes'],
    description: 'Iconic undulating desert sand dunes of the Great Indian Desert west of Jaisalmer.',
    historicalPeriod: 'Natural & Cultural Desert Heritage',
    sampleFilename: 'sam_dunes.jpg'
  },

  // --- BLOCK 38: KHAJURAHO ---
  {
    id: 'khaj-kandariya',
    locationId: 38,
    city: 'Khajuraho',
    state: 'Madhya Pradesh',
    monument: 'Kandariya Mahadeva Temple',
    clues: [
      'I am the largest, tallest, and most ornate Hindu temple in the Western Group of Khajuraho.',
      'My soaring shikhara spire rises 31 meters, designed as a mountain range to replicate the sacred peaks of Mount Kailash.',
      'Built by Chandela ruler Vidyadhara, my interior and exterior sandstone walls are sculpted with more than 800 celestial figures and dancers.'
    ],
    acceptedAliases: ['kandariya mahadeva', 'kandariya temple', 'kandariya', 'khajuraho mahadeva'],
    description: 'Culmination of Central Indian Nagara temple architecture with intricately sculpted sandstone facades.',
    historicalPeriod: 'Chandela Dynasty (c. 1030 CE)',
    sampleFilename: 'kandariya_mahadeva.jpg'
  },
  {
    id: 'khaj-lakshmana',
    locationId: 38,
    city: 'Khajuraho',
    state: 'Madhya Pradesh',
    monument: 'Lakshmana Temple',
    clues: [
      'I am a magnificent panchayatana sandstone temple dedicated to Vaikuntha Vishnu at Khajuraho, built around 954 CE.',
      'My continuous plinth frieze depicts royal battle processions, hunts, musicians, and marching elephant cavalry.',
      'Commissioned by Chandela King Yashovarman, my sanctum preserves an intact four-armed, three-headed sculpture of Vishnu.'
    ],
    acceptedAliases: ['lakshmana temple', 'laxman temple', 'lakshman temple khajuraho'],
    description: 'One of the best preserved early Nagara temples in Khajuraho featuring complete subsidiary corner shrines.',
    historicalPeriod: 'Chandela Dynasty (954 CE)',
    sampleFilename: 'lakshmana_temple.jpg'
  },
  {
    id: 'khaj-western-group',
    locationId: 38,
    city: 'Khajuraho',
    state: 'Madhya Pradesh',
    monument: 'Western Group of Khajuraho Temples',
    clues: [
      'I am a UNESCO World Heritage complex of Nagara-style sandstone temples built between 950 and 1050 CE in the Chhatarpur district.',
      'Built by the Chandela Rajput kings, my surviving monuments celebrate spiritual pursuit, classical music, dance, and human emotion.',
      'Set within manicured lawns, my temples like Chitragupta and Devi Jagadambi attract art lovers from across the globe.'
    ],
    acceptedAliases: ['western group of temples', 'khajuraho temples', 'khajuraho group', 'western temples'],
    description: 'Celebrated UNESCO World Heritage ensemble of Nagara stone temples in Madhya Pradesh.',
    historicalPeriod: 'Chandela Golden Era (10th–11th Century CE)',
    sampleFilename: 'khajuraho_group.jpg'
  },

  // --- BLOCK 42: DELHI (RED FORT MILESTONE) ---
  {
    id: 'del-red-fort',
    locationId: 42,
    city: 'Delhi',
    state: 'Delhi NCR',
    monument: 'Red Fort (Lal Qila)',
    clues: [
      'I am the historic red sandstone citadel in Old Delhi from whose ramparts India\'s Prime Minister unfurls the national tricolor every Independence Day.',
      'Commissioned by Mughal Emperor Shah Jahan in 1638 when he shifted his capital to Shahjahanabad, my walls span over 2 kilometers.',
      'My Lahori Gate, Diwan-i-Aam, and pristine marble Diwan-i-Khas represent the architectural zenith of the Mughal Empire.'
    ],
    acceptedAliases: ['red fort', 'lal qila', 'lal kila', 'red fort delhi'],
    description: 'UNESCO World Heritage palatial fortified residence of Mughal emperors for two centuries.',
    historicalPeriod: 'Mughal Dynasty (Shah Jahan, 1648 CE)',
    sampleFilename: 'red_fort.jpg'
  },
  {
    id: 'del-humayun-tomb',
    locationId: 42,
    city: 'Delhi',
    state: 'Delhi NCR',
    monument: 'Humayun\'s Tomb',
    clues: [
      'I am a grand red sandstone and white marble garden mausoleum in Delhi, recognized as the chief architectural precursor to the Taj Mahal.',
      'Commissioned in 1558 by Empress Bega Begum, I was the first monumental four-quadrant charbagh garden tomb in India.',
      'My high double dome, symmetrical arched alcoves, and Persian water channels established the classic Mughal funerary style.'
    ],
    acceptedAliases: ['humayun tomb', "humayun's tomb", 'humayuns tomb', 'maqbara humayun'],
    description: 'First grand Mughal garden tomb in India, featuring Persian charbagh symmetry and high marble dome.',
    historicalPeriod: 'Early Mughal Period (1570 CE)',
    sampleFilename: 'humayuns_tomb.jpg'
  },
  {
    id: 'del-jama-masjid',
    locationId: 42,
    city: 'Delhi',
    state: 'Delhi NCR',
    monument: 'Jama Masjid',
    clues: [
      'I am one of India\'s largest and most majestic mosques, built of red sandstone and white marble directly facing the Red Fort.',
      'Inaugurated by Mughal Emperor Shah Jahan in 1656, my vast sandstone courtyard can accommodate over 25,000 worshippers.',
      'Flanked by two 40-meter-tall striped minarets and crowned by three bulbous marble domes, I dominate Old Delhi\'s skyline.'
    ],
    acceptedAliases: ['jama masjid', 'masjid-i jehan-numa', 'jama masjid delhi'],
    description: 'Grand imperial Friday mosque built by Shah Jahan with expansive red sandstone courtyards.',
    historicalPeriod: 'Mughal Dynasty (1656 CE)',
    sampleFilename: 'jama_masjid.jpg'
  },

  // --- BLOCK 44: DELHI (QUTUB MINAR MILESTONE) ---
  {
    id: 'del-qutub-minar',
    locationId: 44,
    city: 'Delhi',
    state: 'Delhi NCR',
    monument: 'Qutub Minar',
    clues: [
      'I am the world\'s tallest brick minaret, soaring 72.5 meters into the Delhi sky with five distinct tapering storeys.',
      'Begun by Qutb-ud-din Aibak in 1199 CE and continued by Iltutmish, my red sandstone flutings are carved with Kufic calligraphy.',
      'I stand surrounded by medieval monuments including the Alai Darwaza in South Delhi\'s UNESCO World Heritage complex.'
    ],
    acceptedAliases: ['qutub minar', 'qutb minar', 'qutab minar', 'qutub'],
    description: 'World\'s tallest brick minaret exhibiting early Indo-Islamic stone carvings and balcony cantilevers.',
    historicalPeriod: 'Delhi Sultanate (1199 CE onwards)',
    sampleFilename: 'qutub_minar.jpg'
  },
  {
    id: 'del-iron-pillar',
    locationId: 44,
    city: 'Delhi',
    state: 'Delhi NCR',
    monument: 'Iron Pillar of Delhi',
    clues: [
      'I am a 7.2-meter-tall metallurgical marvel standing in the Qutub complex, completely rust-free despite 1,600 years of exposure to rain and sun.',
      'Inscribed with ancient Sanskrit Brahmi verses praising King Chandra (Gupta Emperor Chandragupta II Vikramaditya).',
      'Scientists worldwide marvel at the ancient Indian blacksmithing craftsmanship that formed my rust-resistant passive film.'
    ],
    acceptedAliases: ['iron pillar', 'iron pillar of delhi', 'ashoka iron pillar', 'qutub iron pillar'],
    description: 'Fourth-century CE metallurgical wonder of high-phosphorus wrought iron that has resisted corrosion for 16 centuries.',
    historicalPeriod: 'Gupta Empire (c. 400 CE)',
    sampleFilename: 'iron_pillar.jpg'
  },
  {
    id: 'del-india-gate',
    locationId: 44,
    city: 'Delhi',
    state: 'Delhi NCR',
    monument: 'India Gate',
    clues: [
      'I am a 42-meter-high triumphal arch of Bharatpur stone standing proudly at the eastern terminus of Kartavya Path.',
      'Designed by Sir Edwin Lutyens, my sandstone walls are inscribed with the names of over 13,000 soldiers who fell in World War I.',
      'For fifty years I sheltered the Amar Jawan Jyoti eternal flame honoring the nation\'s immortal defenders.'
    ],
    acceptedAliases: ['india gate', 'all india war memorial', 'delhi gate memorial'],
    description: 'Sovereign memorial arch honoring Indian soldiers, designed in classical triumphal architecture.',
    historicalPeriod: 'Lutyens\' Delhi Era (1931 CE)',
    sampleFilename: 'india_gate.jpg'
  },

  // --- BLOCK 54: KOLKATA ---
  {
    id: 'kol-victoria',
    locationId: 54,
    city: 'Kolkata',
    state: 'West Bengal',
    monument: 'Victoria Memorial',
    clues: [
      'I am a monumental white Makrana marble palace museum set amidst 64 acres of landscaped gardens in the heart of Kolkata.',
      'Designed by William Emerson with a rotating 16-foot bronze Angel of Victory perched atop my 184-foot central dome.',
      'Completed in 1921, my grand royal galleries house priceless historic paintings, manuscripts, and rare artifacts.'
    ],
    acceptedAliases: ['victoria memorial', 'victoria memorial kolkata', 'victoria hall'],
    description: 'Magnificent white Makrana marble memorial and museum combining Indo-Saracenic and British classical design.',
    historicalPeriod: 'Colonial Era (Completed 1921 CE)',
    sampleFilename: 'victoria_memorial.jpg'
  },
  {
    id: 'kol-howrah-bridge',
    locationId: 54,
    city: 'Kolkata',
    state: 'West Bengal',
    monument: 'Howrah Bridge (Rabindra Setu)',
    clues: [
      'I am an iconic balanced cantilever steel bridge spanning 705 meters across the Hooghly River without a single nut or bolt.',
      'Built with high-tensile alloy steel (Tiscrom) fabricated in India, I link the twin cities of Kolkata and Howrah.',
      'Commissioned in 1943, I am one of the world\'s busiest bridges, carrying over 100,000 vehicles and hundreds of thousands of pedestrians daily.'
    ],
    acceptedAliases: ['howrah bridge', 'rabindra setu', 'hooghly bridge', 'howrah cantilever'],
    description: 'Iconic cantilever steel marvel spanning the sacred Hooghly River, defining the Kolkata skyline.',
    historicalPeriod: 'Modern Engineering Marvel (1943 CE)',
    sampleFilename: 'howrah_bridge.jpg'
  },
  {
    id: 'kol-indian-museum',
    locationId: 54,
    city: 'Kolkata',
    state: 'West Bengal',
    monument: 'Indian Museum (Jadu Ghar)',
    clues: [
      'I am the oldest and largest museum in India, founded on Park Street in Kolkata by the Asiatic Society in 1814.',
      'Affectionately called "Jadu Ghar" (House of Wonders), my Italianate colonnades house an Egyptian mummy, Bharhut Buddhist railings, and fossilized dinosaurs.',
      'I am the ninth oldest museum in the world, preserving over 100,000 rare cultural artifacts across 35 grand galleries.'
    ],
    acceptedAliases: ['indian museum', 'jadu ghar', 'kolkata museum', 'asiatic society museum'],
    description: 'Oldest museum in the Asia-Pacific region, home to rare antiquities, Buddhist art, and natural history specimens.',
    historicalPeriod: 'Asiatic Society Era (Founded 1814 CE)',
    sampleFilename: 'indian_museum.jpg'
  },

  // --- BLOCK 77: SRINAGAR ---
  {
    id: 'sri-dal-lake',
    locationId: 77,
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    monument: 'Dal Lake & Floating Shikaras',
    clues: [
      'I am the "Jewel in the crown of Kashmir", a serene glacial lake famous for hand-carved cedarwood houseboats and colorful wooden shikaras.',
      'Framed by the snow-dusted peaks of the Zabarwan mountain range, my floating vegetable and flower markets come alive at sunrise.',
      'Water lilies, lotus gardens, and reflection of chinar trees make me the world-famous aquatic heart of Srinagar.'
    ],
    acceptedAliases: ['dal lake', 'dal lake srinagar', 'shikara', 'kashmir dal lake'],
    description: 'World-renowned Himalayan urban lake featuring living houseboats, floating gardens, and wooden shikaras.',
    historicalPeriod: 'Natural & Kashmiri Royal Heritage',
    sampleFilename: 'dal_lake.jpg'
  },
  {
    id: 'sri-shalimar-bagh',
    locationId: 77,
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    monument: 'Shalimar Bagh (Mughal Gardens)',
    clues: [
      'I am a terraced Mughal garden paradise built on the northeast shore of Dal Lake by Emperor Jahangir for his beloved wife Nur Jahan in 1619.',
      'Fed by a crystal mountain stream, my four terraced levels feature water cascades, black marble pavilions, and stately chinar trees.',
      'Known as the "Abode of Love", I represent the supreme Persian-inspired garden architecture of the Kashmir Valley.'
    ],
    acceptedAliases: ['shalimar bagh', 'shalimar garden', 'mughal gardens srinagar', 'shalimar kashmir'],
    description: 'Exquisite four-tier Mughal royal garden showcasing Persian charbagh water engineering and mountain vistas.',
    historicalPeriod: 'Mughal Empire (Jahangir, 1619 CE)',
    sampleFilename: 'shalimar_bagh.jpg'
  },
  {
    id: 'sri-shankaracharya',
    locationId: 77,
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    monument: 'Shankaracharya Temple (Gopadri Hill)',
    clues: [
      'I am an ancient stone temple dedicated to Lord Shiva, perched atop Gopadri Hill 1,000 feet above the Srinagar valley.',
      'The revered Advaita philosopher Adi Shankaracharya meditated here during his spiritual visit to Kashmir in the 8th century.',
      'Built on an octagonal stone plinth, my summit terrace offers a breathtaking panoramic vista of Dal Lake and Srinagar.'
    ],
    acceptedAliases: ['shankaracharya temple', 'gopadri hill', 'shankaracharya hill', 'jyesthesvara temple'],
    description: 'Historic hilltop stone temple offering panoramic views over the Kashmir Valley and Dal Lake.',
    historicalPeriod: 'Early Historic / 9th Century CE',
    sampleFilename: 'shankaracharya_temple.jpg'
  }
];

/**
 * Helper to dynamically select a Heritage Hunt target for a given location ID,
 * avoiding immediate repetition based on used target/clue IDs.
 */
export function getHeritageHuntChallenge(
  locationId: number,
  cityName?: string,
  recentlyUsedTargetIds: string[] = [],
  recentlyUsedClueIndices: Record<string, number> = {}
): {
  target: HeritageHuntTarget;
  clue: string;
  clueIndex: number;
} {
  let matchingTargets = HERITAGE_HUNT_TARGETS.filter((t) => t.locationId === locationId);
  if (cityName && (matchingTargets.length === 0 || cityName.toLowerCase() === 'hyderabad')) {
    const cityMatches = HERITAGE_HUNT_TARGETS.filter(
      (t) => t.city.toLowerCase() === cityName.toLowerCase()
    );
    if (cityMatches.length > 0) {
      matchingTargets = cityMatches;
    }
  }

  // Fallback to Hyderabad Charminar if somehow unknown location
  const pool = matchingTargets.length > 0 ? matchingTargets : [HERITAGE_HUNT_TARGETS[3]];


  // Prioritize targets not recently used
  const unusedTargets = pool.filter((t) => !recentlyUsedTargetIds.includes(t.id));
  const selectedTarget =
    unusedTargets.length > 0
      ? unusedTargets[Math.floor(Math.random() * unusedTargets.length)]
      : pool[Math.floor(Math.random() * pool.length)];

  // Select a clue, preferring a different clue index than recently shown
  const lastClueIdx = recentlyUsedClueIndices[selectedTarget.id] ?? -1;
  const availableClueIndices = selectedTarget.clues
    .map((_, i) => i)
    .filter((i) => i !== lastClueIdx);

  const chosenClueIdx =
    availableClueIndices.length > 0
      ? availableClueIndices[Math.floor(Math.random() * availableClueIndices.length)]
      : Math.floor(Math.random() * selectedTarget.clues.length);

  return {
    target: selectedTarget,
    clue: selectedTarget.clues[chosenClueIdx],
    clueIndex: chosenClueIdx
  };
}

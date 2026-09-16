import { LocationData, SpecialBlockType, CategoryType } from '../types/game';

// Exact 80 locations specified in user prompt
export const LOCATIONS_DATA: LocationData[] = [
  {
    id: 1,
    city: 'Kanyakumari',
    state: 'Tamil Nadu',
    heritageSite: 'Vivekananda Rock',
    description: 'The southern tip of mainland India where three water bodies merge, famous for Swami Vivekananda Memorial.',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 440, y: 980 }
  },
  {
    id: 2,
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    heritageSite: 'Padmanabhaswamy Temple',
    description: 'Ancient temple renowned for Chera-Dravidian architecture and timeless vault treasures.',
    specialBlock: 'Normal',
    questionCategory: 'Monuments',
    mapCoord: { x: 400, y: 950 }
  },
  {
    id: 3,
    city: 'Kochi',
    state: 'Kerala',
    heritageSite: 'Fort Kochi',
    description: 'Historic spice port showcasing Portuguese, Dutch, British colonial architecture and Chinese fishing nets.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 380, y: 890 }
  },
  {
    id: 4,
    city: 'Madurai',
    state: 'Tamil Nadu',
    heritageSite: 'Meenakshi Amman Temple',
    description: 'Celebrated temple city on the Vaigai River with towering vibrant multi-tiered gopurams.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 450, y: 900 }
  },
  {
    id: 5,
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    heritageSite: 'Brihadeeswarar Temple',
    description: 'Magnificent Chola granite masterpiece built by Raja Raja Chola I, UNESCO World Heritage site.',
    specialBlock: 'Normal',
    questionCategory: 'Monuments',
    mapCoord: { x: 480, y: 860 }
  },
  {
    id: 6,
    city: 'Rameswaram',
    state: 'Tamil Nadu',
    heritageSite: 'Ramanathaswamy Temple',
    description: 'Historic pilgrimage destination renowned for the longest pillared corridor among Hindu temples.',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 500, y: 910 }
  },
  {
    id: 7,
    city: 'Mahabalipuram',
    state: 'Tamil Nadu',
    heritageSite: 'Shore Temple',
    description: 'Pallava coastal rock-cut sanctuary standing resiliently against Coromandel sea waves.',
    specialBlock: 'Heritage Challenge',
    questionCategory: 'Monuments',
    mapCoord: { x: 510, y: 800 }
  },
  {
    id: 8,
    city: 'Chennai',
    state: 'Tamil Nadu',
    heritageSite: 'Marina / Cultural Heritage',
    description: 'Gateway to South Indian classical arts, Bharatanatyam, and Carnatic music traditions.',
    specialBlock: 'Normal',
    questionCategory: 'Dance',
    mapCoord: { x: 520, y: 770 }
  },
  {
    id: 9,
    city: 'Puducherry',
    state: 'Puducherry',
    heritageSite: 'French Quarter',
    description: 'Coastal colonial enclave featuring French boulevard architecture, Sri Aurobindo Ashram, and vibrant bougainvillea.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 515, y: 825 }
  },
  {
    id: 10,
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    heritageSite: 'Venkateswara Temple',
    description: 'Revered Tirumala hilltop shrine situated in the Seshachalam Hills, visited by millions of pilgrims annually.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 490, y: 740 }
  },
  {
    id: 11,
    city: 'Amaravati',
    state: 'Andhra Pradesh',
    heritageSite: 'Buddhist Heritage',
    description: 'Ancient capital of Satavahanas on Krishna River, home to legendary carved marble Mahachaitya stupa remnants.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 520, y: 690 }
  },
  {
    id: 12,
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    heritageSite: 'Coastal Heritage',
    description: 'Natural harbor flanked by Eastern Ghats, Borra Caves, and ancient Buddhist heritage hills like Thotlakonda.',
    specialBlock: 'Normal',
    questionCategory: 'Geography',
    mapCoord: { x: 600, y: 640 }
  },
  {
    id: 13,
    city: 'Hyderabad',
    state: 'Telangana',
    heritageSite: 'Charminar',
    description: 'Iconic 16th-century square monument with four graceful minarets built by Sultan Muhammad Quli Qutb Shah.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 460, y: 650 }
  },
  {
    id: 14,
    city: 'Warangal',
    state: 'Telangana',
    heritageSite: 'Warangal Fort',
    description: 'Kakatiya dynasty bastion famous for intricately sculpted ceremonial stone gateways (Kakatiya Kala Thoranam).',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 490, y: 620 }
  },
  {
    id: 15,
    city: 'Hampi',
    state: 'Karnataka',
    heritageSite: 'Vijayanagara Heritage',
    description: 'Epic UNESCO landscape of giant boulders, stone chariot, and royal pavilions from the Vijayanagara Empire.',
    specialBlock: 'Golden Heritage',
    questionCategory: 'Monuments',
    mapCoord: { x: 410, y: 720 }
  },
  {
    id: 16,
    city: 'Mysuru',
    state: 'Karnataka',
    heritageSite: 'Mysore Palace',
    description: 'Opulent Indo-Saracenic royal seat of the Wodeyars, celebrated for grand Dasara celebrations illuminated by 100,000 bulbs.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 415, y: 830 }
  },
  {
    id: 17,
    city: 'Bengaluru',
    state: 'Karnataka',
    heritageSite: 'Modern + Cultural Heritage',
    description: 'Garden city bridging Kempe Gowda historical towers, Tipu Sultan Palace, and contemporary scientific innovation.',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 440, y: 790 }
  },
  {
    id: 18,
    city: 'Badami',
    state: 'Karnataka',
    heritageSite: 'Cave Temples',
    description: 'Ancient Chalukya capital nestled in red sandstone ravines, featuring 6th-century rock-cut cave sanctuaries.',
    specialBlock: 'Knowledge Ladder',
    questionCategory: 'History',
    mapCoord: { x: 380, y: 690 }
  },
  {
    id: 19,
    city: 'Pattadakal',
    state: 'Karnataka',
    heritageSite: 'Chalukyan Temples',
    description: 'UNESCO World Heritage ensemble representing harmonious blending of Rekha-Nagara and Dravidian temple styles.',
    specialBlock: 'Heritage Challenge',
    questionCategory: 'Art',
    mapCoord: { x: 385, y: 670 }
  },
  {
    id: 20,
    city: 'Goa',
    state: 'Goa',
    heritageSite: 'Portuguese Heritage',
    description: 'Lush Konkan coastline featuring Basilica of Bom Jesus, Se Cathedral, and multicultural Indo-Portuguese traditions.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 340, y: 720 }
  },
  {
    id: 21,
    city: 'Mumbai',
    state: 'Maharashtra',
    heritageSite: 'Gateway of India',
    description: 'Majestic basalt triumphal arch overlooking the Arabian Sea, standing beside Victorian Gothic heritage precincts.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 320, y: 610 }
  },
  {
    id: 22,
    city: 'Ajanta',
    state: 'Maharashtra',
    heritageSite: 'Ajanta Caves',
    description: 'Thirty rock-cut Buddhist prayer halls carved into a horseshoe cliff, home to world-renowned ancient murals.',
    specialBlock: 'Golden Heritage',
    questionCategory: 'Art',
    mapCoord: { x: 410, y: 550 }
  },
  {
    id: 23,
    city: 'Ellora',
    state: 'Maharashtra',
    heritageSite: 'Ellora Caves',
    description: 'UNESCO rock-cut sanctuary featuring Kailash Temple, carved top-down from a single monolithic basalt rock.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 390, y: 565 }
  },
  {
    id: 24,
    city: 'Nashik',
    state: 'Maharashtra',
    heritageSite: 'Trimbakeshwar',
    description: 'Ancient Jyotirlinga temple on Godavari River, epic center of Kumbh Mela and Ramayana Panchavati legend.',
    specialBlock: 'Myth/Misinformation Trap',
    questionCategory: 'Heritage',
    mapCoord: { x: 350, y: 580 }
  },
  {
    id: 25,
    city: 'Pune',
    state: 'Maharashtra',
    heritageSite: 'Maratha Heritage',
    description: 'Historic seat of the Peshwas featuring Shaniwar Wada, Sinhagad Fort, and vibrant Ganesh Chaturthi festivities.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 360, y: 640 }
  },
  {
    id: 26,
    city: 'Ahmedabad',
    state: 'Gujarat',
    heritageSite: 'Historic City',
    description: 'India’s first UNESCO World Heritage City, celebrated for pols, stepwells, Sabarmati Ashram, and textile traditions.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 290, y: 500 }
  },
  {
    id: 27,
    city: 'Modhera',
    state: 'Gujarat',
    heritageSite: 'Sun Temple',
    description: 'Solanki architectural marvel dedicated to Surya, positioned so first sun rays hit the inner sanctum on equinoxes.',
    specialBlock: 'Heritage Challenge',
    questionCategory: 'Monuments',
    mapCoord: { x: 280, y: 470 }
  },
  {
    id: 28,
    city: 'Dwarka',
    state: 'Gujarat',
    heritageSite: 'Dwarkadhish Temple',
    description: 'Ancient sacred kingdom of Lord Krishna on the Arabian coast, one of the four principal Char Dham sites.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 210, y: 510 }
  },
  {
    id: 29,
    city: 'Somnath',
    state: 'Gujarat',
    heritageSite: 'Somnath Temple',
    description: 'First among the twelve sacred Aadi Jyotirlingas, overlooking the ocean at Prabhas Patan.',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 230, y: 560 }
  },
  {
    id: 30,
    city: 'Kutch',
    state: 'Gujarat',
    heritageSite: 'Rann of Kutch',
    description: 'Vast salt marsh shimmering under the full moon during Rann Utsav, celebrated for Rogan art and Kutchi embroidery.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Art',
    mapCoord: { x: 220, y: 450 }
  },
  {
    id: 31,
    city: 'Udaipur',
    state: 'Rajasthan',
    heritageSite: 'City Palace',
    description: 'The City of Lakes, featuring the grand Mewar palace complex perched over Lake Pichola.',
    specialBlock: 'Normal',
    questionCategory: 'Monuments',
    mapCoord: { x: 310, y: 440 }
  },
  {
    id: 32,
    city: 'Jodhpur',
    state: 'Rajasthan',
    heritageSite: 'Mehrangarh Fort',
    description: 'The Blue City crowned by Mehrangarh, one of India’s largest hill fortresses rising 400 feet above the city.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 290, y: 390 }
  },
  {
    id: 33,
    city: 'Jaipur',
    state: 'Rajasthan',
    heritageSite: 'Amber Fort',
    description: 'The UNESCO Pink City with Amber Fort, Hawa Mahal, and Jantar Mantar astronomical observatory.',
    specialBlock: 'Heritage Challenge',
    questionCategory: 'Monuments',
    mapCoord: { x: 350, y: 370 }
  },
  {
    id: 34,
    city: 'Jaisalmer',
    state: 'Rajasthan',
    heritageSite: 'Jaisalmer Fort',
    description: 'The Golden City in the Thar Desert with a living golden sandstone fort and carved havelis.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 230, y: 360 }
  },
  {
    id: 35,
    city: 'Mount Abu',
    state: 'Rajasthan',
    heritageSite: 'Dilwara Temples',
    description: 'World-renowned Jain pilgrimage sanctuary with exquisite, translucent white marble carving work.',
    specialBlock: 'Normal',
    questionCategory: 'Art',
    mapCoord: { x: 280, y: 430 }
  },
  {
    id: 36,
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    heritageSite: 'Madhya Pradesh Heritage',
    description: 'City of lakes housing the Upper Lake, Bharat Bhavan arts center, and gateway to prehistoric Bhimbetka caves.',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 420, y: 490 }
  },
  {
    id: 37,
    city: 'Sanchi',
    state: 'Madhya Pradesh',
    heritageSite: 'Sanchi Stupa',
    description: 'Oldest stone structure in India commissioned by Emperor Ashoka, with four legendary carved toranas (gateways).',
    specialBlock: 'Golden Heritage',
    questionCategory: 'Monuments',
    mapCoord: { x: 430, y: 470 }
  },
  {
    id: 38,
    city: 'Khajuraho',
    state: 'Madhya Pradesh',
    heritageSite: 'Khajuraho Temples',
    description: 'Chandela dynasty temples renowned worldwide for graceful Nagara architecture and expressive sculpture.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Art',
    mapCoord: { x: 470, y: 430 }
  },
  {
    id: 39,
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    heritageSite: 'Gwalior Fort',
    description: 'Described by Babur as the pearl among fortresses of Hind, home to Man Singh Palace and Tansen classical music heritage.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 400, y: 380 }
  },
  {
    id: 40,
    city: 'Orchha',
    state: 'Madhya Pradesh',
    heritageSite: 'Orchha Fort',
    description: 'Bundela capital on Betwa river with Jahangir Mahal, Raja Mahal, and the Ram Raja Temple.',
    specialBlock: 'Knowledge Ladder',
    questionCategory: 'History',
    mapCoord: { x: 430, y: 410 }
  },
  {
    id: 41,
    city: 'Agra',
    state: 'Uttar Pradesh',
    heritageSite: 'Taj Mahal',
    description: 'Immortal white marble mausoleum on the Yamuna river, UNESCO World Heritage site and Wonder of the World.',
    specialBlock: 'Golden Heritage',
    questionCategory: 'Monuments',
    mapCoord: { x: 400, y: 340 }
  },
  {
    id: 42,
    city: 'Delhi',
    state: 'Delhi NCR',
    heritageSite: 'Red Fort',
    description: 'Mughal citadel of red sandstone where the Prime Minister hoists the National Flag on Independence Day.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'History',
    mapCoord: { x: 380, y: 290 }
  },
  {
    id: 43,
    city: 'Delhi',
    state: 'Delhi NCR',
    heritageSite: 'India Gate',
    description: 'National war memorial arch honoring 84,000 soldiers with the eternal Amar Jawan Jyoti flame.',
    specialBlock: 'Normal',
    questionCategory: 'Monuments',
    mapCoord: { x: 395, y: 300 }
  },
  {
    id: 44,
    city: 'Delhi',
    state: 'Delhi NCR',
    heritageSite: 'Qutub Minar',
    description: 'World’s tallest brick minaret at 72.5 meters, accompanied by the rust-resistant ancient Iron Pillar of Delhi.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 385, y: 310 }
  },
  {
    id: 45,
    city: 'Mathura',
    state: 'Uttar Pradesh',
    heritageSite: 'Krishna Heritage',
    description: 'Birthplace of Lord Krishna along the Yamuna, renowned for Janmashtami celebrations and Lathmar Holi.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 410, y: 330 }
  },
  {
    id: 46,
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    heritageSite: 'Ghats',
    description: 'One of the world’s oldest continuously inhabited living cities, famous for its 84 sacred Ganga ghats and evening aarti.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 530, y: 400 }
  },
  {
    id: 47,
    city: 'Sarnath',
    state: 'Uttar Pradesh',
    heritageSite: 'Buddhist Heritage',
    description: 'Deer park where Lord Buddha gave his first sermon (Dhammacakkappavattana Sutta); origin of the Ashoka Lion Capital.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 535, y: 395 }
  },
  {
    id: 48,
    city: 'Ayodhya',
    state: 'Uttar Pradesh',
    heritageSite: 'Ram Heritage',
    description: 'Sacred birthplace of Lord Rama along the Sarayu River, legendary kingdom of the ancient Ikshvaku dynasty.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 500, y: 360 }
  },
  {
    id: 49,
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    heritageSite: 'Awadhi Heritage',
    description: 'City of Nawabs, celebrated for Bara Imambara, Chikankari embroidery, Kathak dance, and Tehzeeb culture.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 470, y: 360 }
  },
  {
    id: 50,
    city: 'Prayagraj',
    state: 'Uttar Pradesh',
    heritageSite: 'Sangam',
    description: 'Sacred confluence of Ganga, Yamuna, and mythical Saraswati, venue of the mega Maha Kumbh Mela.',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 490, y: 410 }
  },
  {
    id: 51,
    city: 'Bodh Gaya',
    state: 'Bihar',
    heritageSite: 'Mahabodhi Temple',
    description: 'Holiest Buddhist pilgrimage site where Siddhartha Gautama attained supreme enlightenment under the Bodhi Tree.',
    specialBlock: 'Heritage Challenge',
    questionCategory: 'Monuments',
    mapCoord: { x: 570, y: 430 }
  },
  {
    id: 52,
    city: 'Nalanda',
    state: 'Bihar',
    heritageSite: 'Ancient University',
    description: 'Ancient residential monastic university of Buddhist learning that drew scholars from China, Korea, and Tibet.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 580, y: 415 }
  },
  {
    id: 53,
    city: 'Patna',
    state: 'Bihar',
    heritageSite: 'Mauryan Heritage',
    description: 'Ancient Pataliputra, seat of Chandragupta Maurya and Ashoka, and birthplace of Guru Gobind Singh Ji.',
    specialBlock: 'Myth/Misinformation Trap',
    questionCategory: 'History',
    mapCoord: { x: 560, y: 390 }
  },
  {
    id: 54,
    city: 'Kolkata',
    state: 'West Bengal',
    heritageSite: 'Victoria Memorial',
    description: 'Cultural capital of India, featuring Victoria Memorial, Howrah Bridge, Tagore’s legacy, and grand Durga Puja.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 650, y: 500 }
  },
  {
    id: 55,
    city: 'Bishnupur',
    state: 'West Bengal',
    heritageSite: 'Terracotta Temples',
    description: 'Malla kingdom town renowned for exquisite 17th-century terracotta temples and traditional Baluchari sarees.',
    specialBlock: 'Normal',
    questionCategory: 'Art',
    mapCoord: { x: 625, y: 490 }
  },
  {
    id: 56,
    city: 'Bhubaneswar',
    state: 'Odisha',
    heritageSite: 'Temple Heritage',
    description: 'The Temple City of India, featuring Lingaraj Temple, Rajarani Temple, and classic Odissi dance centers.',
    specialBlock: 'Normal',
    questionCategory: 'Dance',
    mapCoord: { x: 610, y: 570 }
  },
  {
    id: 57,
    city: 'Puri',
    state: 'Odisha',
    heritageSite: 'Jagannath Temple',
    description: 'Holy coastal city famous for the grand Ratha Yatra (Chariot Festival) of Lord Jagannath, Balabhadra, and Subhadra.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 625, y: 600 }
  },
  {
    id: 58,
    city: 'Konark',
    state: 'Odisha',
    heritageSite: 'Sun Temple',
    description: 'Architectural masterpiece crafted as a colossal 24-wheeled chariot of Surya driven by seven galloping horses.',
    specialBlock: 'Golden Heritage',
    questionCategory: 'Monuments',
    mapCoord: { x: 640, y: 580 }
  },
  {
    id: 59,
    city: 'Ranchi',
    state: 'Jharkhand',
    heritageSite: 'Tribal Heritage',
    description: 'Heart of Chota Nagpur plateau honoring Birsa Munda and celebrating Sohrai and Khovar tribal mural art.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 570, y: 470 }
  },
  {
    id: 60,
    city: 'Guwahati',
    state: 'Assam',
    heritageSite: 'Kamakhya Temple',
    description: 'Gateway to Northeast India perched on Nilachal Hill along the Brahmaputra, host to the Ambubachi Mela.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 740, y: 370 }
  },
  {
    id: 61,
    city: 'Shillong',
    state: 'Meghalaya',
    heritageSite: 'Khasi Heritage',
    description: 'Scotland of the East, famed for Khasi matrilineal culture, music, and sacred groves.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 730, y: 395 }
  },
  {
    id: 62,
    city: 'Cherrapunji',
    state: 'Meghalaya',
    heritageSite: 'Natural Heritage',
    description: 'Sohra, famous for living root bridges engineered by Khasi tribes and breathtaking rainfall waterfalls.',
    specialBlock: 'Normal',
    questionCategory: 'Geography',
    mapCoord: { x: 730, y: 420 }
  },
  {
    id: 63,
    city: 'Imphal',
    state: 'Manipur',
    heritageSite: 'Manipuri Culture',
    description: 'Home of classical Manipuri Raas Leela dance, Kangla Fort, and Loktak Lake with floating phumdis.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Dance',
    mapCoord: { x: 800, y: 400 }
  },
  {
    id: 64,
    city: 'Kohima',
    state: 'Nagaland',
    heritageSite: 'Naga Heritage',
    description: 'Land of warrior tribes and the vibrant Hornbill Festival celebrating indigenous music, craft, and dance.',
    specialBlock: 'Normal',
    questionCategory: 'Culture',
    mapCoord: { x: 810, y: 360 }
  },
  {
    id: 65,
    city: 'Aizawl',
    state: 'Mizoram',
    heritageSite: 'Mizo Culture',
    description: 'Serene hill capital famous for the graceful bamboo Cheraw dance and community solidarity spirit of Tlawmngaihna.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Dance',
    mapCoord: { x: 775, y: 435 }
  },
  {
    id: 66,
    city: 'Agartala',
    state: 'Tripura',
    heritageSite: 'Ujjayanta Palace',
    description: 'Former royal palace of the Tripura Kingdom featuring Mughal gardens and indigenous Manikya dynasty traditions.',
    specialBlock: 'Normal',
    questionCategory: 'History',
    mapCoord: { x: 735, y: 450 }
  },
  {
    id: 67,
    city: 'Gangtok',
    state: 'Sikkim',
    heritageSite: 'Sikkimese Heritage',
    description: 'Himalayan Buddhist center overlooking Mount Kangchenjunga, home to Enchey and Rumtek monasteries.',
    specialBlock: 'Normal',
    questionCategory: 'Geography',
    mapCoord: { x: 670, y: 330 }
  },
  {
    id: 68,
    city: 'Darjeeling',
    state: 'West Bengal',
    heritageSite: 'Himalayan Culture',
    description: 'Queen of Hills, home to the UNESCO Darjeeling Himalayan Toy Train, tea gardens, and views of Kanchenjunga.',
    specialBlock: 'Normal',
    questionCategory: 'Heritage',
    mapCoord: { x: 660, y: 350 }
  },
  {
    id: 69,
    city: 'Siliguri',
    state: 'West Bengal',
    heritageSite: 'Gateway to Himalayas',
    description: 'Crucial Chicken’s Neck corridor connecting the Northeast states with the rest of the Indian subcontinent.',
    specialBlock: 'Knowledge Ladder',
    questionCategory: 'Geography',
    mapCoord: { x: 650, y: 365 }
  },
  {
    id: 70,
    city: 'Dehradun',
    state: 'Uttarakhand',
    heritageSite: 'Himalayan Heritage',
    description: 'Picturesque Doon Valley city nestled between the Ganga and Yamuna, home to the Forest Research Institute.',
    specialBlock: 'Normal',
    questionCategory: 'Geography',
    mapCoord: { x: 410, y: 240 }
  },
  {
    id: 71,
    city: 'Rishikesh',
    state: 'Uttarakhand',
    heritageSite: 'Yoga Heritage',
    description: 'Yoga Capital of the World along the holy Ganga river where the Himalayas meet the northern plains.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 420, y: 250 }
  },
  {
    id: 72,
    city: 'Haridwar',
    state: 'Uttarakhand',
    heritageSite: 'Ganga Heritage',
    description: 'Gateway to the Gods, where the sacred Ganges leaves the mountains; famous for Har Ki Pauri Ganga Aarti.',
    specialBlock: 'Festival Challenge',
    questionCategory: 'Festivals',
    mapCoord: { x: 415, y: 265 }
  },
  {
    id: 73,
    city: 'Amritsar',
    state: 'Punjab',
    heritageSite: 'Golden Temple',
    description: 'Sri Harmandir Sahib, holiest shrine of Sikhism with sanctified Amrit Sarovar, Langar hall, and Jallianwala Bagh.',
    specialBlock: 'Golden Heritage',
    questionCategory: 'Heritage',
    mapCoord: { x: 330, y: 230 }
  },
  {
    id: 74,
    city: 'Chandigarh',
    state: 'Punjab / Haryana',
    heritageSite: 'Modern Heritage',
    description: 'Planned modern city designed by Le Corbusier, famous for the Capitol Complex and Nek Chand Rock Garden.',
    specialBlock: 'Normal',
    questionCategory: 'Art',
    mapCoord: { x: 370, y: 250 }
  },
  {
    id: 75,
    city: 'Shimla',
    state: 'Himachal Pradesh',
    heritageSite: 'Colonial Heritage',
    description: 'Former summer capital of British India with the historic Mall Road, Christ Church, and Kalka-Shimla mountain railway.',
    specialBlock: 'Myth/Misinformation Trap',
    questionCategory: 'History',
    mapCoord: { x: 390, y: 220 }
  },
  {
    id: 76,
    city: 'Manali',
    state: 'Himachal Pradesh',
    heritageSite: 'Himalayan Culture',
    description: 'High-altitude Himalayan valley of Kullu Gods, featuring ancient wooden Hidimba Devi temple and gateway to Rohtang Pass.',
    specialBlock: 'Normal',
    questionCategory: 'Culture',
    mapCoord: { x: 380, y: 190 }
  },
  {
    id: 77,
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    heritageSite: 'Kashmir Heritage',
    description: 'Paradise on Earth, celebrated for Dal Lake shikaras, floating gardens, Mughal gardens, and Kashmiri Pashmina crafts.',
    specialBlock: 'Heritage Hunt',
    questionCategory: 'Monuments',
    mapCoord: { x: 320, y: 150 }
  },
  {
    id: 78,
    city: 'Leh',
    state: 'Ladakh',
    heritageSite: 'Ladakhi Heritage',
    description: 'High-altitude desert capital featuring Leh Palace, Thiksey Monastery, and ancient Silk Route caravansarais.',
    specialBlock: 'Culture Challenge',
    questionCategory: 'Culture',
    mapCoord: { x: 370, y: 120 }
  },
  {
    id: 79,
    city: 'Nubra',
    state: 'Ladakh',
    heritageSite: 'Himalayan Heritage',
    description: 'Valley of Flowers across Khardung La pass, famous for double-humped Bactrian camels on cold desert sand dunes.',
    specialBlock: 'Normal',
    questionCategory: 'Geography',
    mapCoord: { x: 385, y: 90 }
  },
  {
    id: 80,
    city: 'Ladakh',
    state: 'Ladakh',
    heritageSite: 'Himalayan Heritage / Finish',
    description: 'Grand finish of the Bharat Yatra! The Roof of India, where high mountain passes touch the azure sky.',
    specialBlock: 'Final',
    questionCategory: 'Heritage',
    mapCoord: { x: 410, y: 80 }
  }
];

export const SPECIAL_BLOCK_CONFIG: Record<
  SpecialBlockType,
  { name: string; badge: string; color: string; bgClass: string; textClass: string; description: string }
> = {
  'Culture Challenge': {
    name: 'Culture Challenge',
    badge: '🎭',
    color: '#8b5cf6',
    bgClass: 'bg-purple-100 border-purple-400 text-purple-800',
    textClass: 'text-purple-700',
    description: 'Cultural lore test: +20 points for correct answer!'
  },
  'Heritage Challenge': {
    name: 'Heritage Challenge',
    badge: '🏛️',
    color: '#0284c7',
    bgClass: 'bg-sky-100 border-sky-400 text-sky-800',
    textClass: 'text-sky-700',
    description: 'Architectural challenge: +20 points for correct answer!'
  },
  'Festival Challenge': {
    name: 'Festival Challenge',
    badge: '🪔',
    color: '#ea580c',
    bgClass: 'bg-orange-100 border-orange-400 text-orange-800',
    textClass: 'text-orange-700',
    description: 'Festive celebration question: +20 points!'
  },
  'Heritage Hunt': {
    name: 'Heritage Hunt',
    badge: '🔍',
    color: '#e11d48',
    bgClass: 'bg-rose-100 border-rose-400 text-rose-800',
    textClass: 'text-rose-700',
    description: 'Monument photo scan checkpoint: +50 points!'
  },
  'Golden Heritage': {
    name: 'Golden Heritage',
    badge: '👑',
    color: '#d97706',
    bgClass: 'bg-amber-100 border-amber-400 text-amber-800',
    textClass: 'text-amber-700',
    description: 'Iconic World Wonder: Double Challenge Points (+40)!'
  },
  'Knowledge Ladder': {
    name: 'Knowledge Ladder',
    badge: '🪜',
    color: '#16a34a',
    bgClass: 'bg-emerald-100 border-emerald-400 text-emerald-800',
    textClass: 'text-emerald-700',
    description: 'Wisdom climb: +20 points and leap forward 3 blocks!'
  },
  'Myth/Misinformation Trap': {
    name: 'Myth Trap',
    badge: '⚠️',
    color: '#dc2626',
    bgClass: 'bg-red-100 border-red-400 text-red-800',
    textClass: 'text-red-700',
    description: 'Debunk misinformation! Wrong answer drops you back 2 blocks.'
  },
  'Final': {
    name: 'Bharat Yatra Finish',
    badge: '🏁',
    color: '#b45309',
    bgClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900',
    textClass: 'text-amber-900',
    description: 'Grand Finale at the summit of India! Reached the 80th milestone!'
  },
  'Normal': {
    name: 'Normal Block',
    badge: '📍',
    color: '#64748b',
    bgClass: 'bg-slate-100 border-slate-300 text-slate-700',
    textClass: 'text-slate-600',
    description: 'Standard heritage milestone. Correct = +10 pts (+5 speed bonus in 5s).'
  }
};

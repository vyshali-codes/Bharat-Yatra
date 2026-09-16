import { Question, CategoryType } from '../types/game';
import { LOCATIONS_DATA } from './locations';

export const CATEGORIES_LIST: readonly CategoryType[] = [
  'History',
  'Geography',
  'Culture',
  'Festivals',
  'Monuments',
  'Food',
  'Art',
  'Dance',
  'Heritage'
] as const;

/**
 * Complete location-specific Question Bank for all 80 Bharat Yatra milestones.
 * Every question is anchored to a specific locationId and locationName.
 */
export const QUESTIONS_BANK: Question[] = [
  // 1: Kanyakumari
  {
    id: 'kanyakumari-heritage-01',
    locationId: 1,
    locationName: 'Kanyakumari',
    category: 'Heritage',
    question: 'At Kanyakumari, which three major bodies of water meet at Triveni Sangam?',
    options: {
      A: 'Arabian Sea, Bay of Bengal, and Indian Ocean',
      B: 'Arabian Sea, Red Sea, and Gulf of Mannar',
      C: 'Bay of Bengal, Palk Strait, and Andaman Sea',
      D: 'Indian Ocean, Pacific Ocean, and Arabian Sea'
    },
    correctAnswer: 'A',
    explanation: 'Kanyakumari is the southernmost tip of mainland India where the Arabian Sea, Bay of Bengal, and Indian Ocean converge.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'kanyakumari-monuments-01',
    locationId: 1,
    locationName: 'Kanyakumari',
    category: 'Monuments',
    question: 'Whose monumental 133-foot stone statue stands tall on an offshore rock adjacent to the Vivekananda Rock Memorial?',
    options: {
      A: 'Subramania Bharati',
      B: 'Sage Agastya',
      C: 'Saint Poet Thiruvalluvar',
      D: 'Raja Raja Chola'
    },
    correctAnswer: 'C',
    explanation: 'The 133-foot Thiruvalluvar Statue honors the celebrated Tamil poet-philosopher who wrote the 133 chapters of the Tirukkural.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'kanyakumari-geography-01',
    locationId: 1,
    locationName: 'Kanyakumari',
    category: 'Geography',
    question: 'Kanyakumari is world-famous for which rare natural astronomical phenomenon visible from the same beach?',
    options: {
      A: 'Total solar eclipse every full moon',
      B: 'Simultaneous sunset and moonrise over the ocean horizons on Chitra Pournami',
      C: 'Aurora Australis lights in winter',
      D: 'Bioluminescent red tides every evening'
    },
    correctAnswer: 'B',
    explanation: 'Due to its unique peninsula location, visitors can witness both the setting sun and rising full moon simultaneously across the ocean.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 2: Thiruvananthapuram
  {
    id: 'thiruvananthapuram-monuments-01',
    locationId: 2,
    locationName: 'Thiruvananthapuram',
    category: 'Monuments',
    question: 'In which iconic posture is Lord Padmanabha depicted inside the sanctum sanctorum of the Padmanabhaswamy Temple?',
    options: {
      A: 'Tandava dance posture',
      B: 'Anantha Shayana (reclining on the serpent king Adi Shesha)',
      C: 'Padmasana meditation seated posture',
      D: 'Veerasana standing archer posture'
    },
    correctAnswer: 'B',
    explanation: 'The presiding deity Lord Vishnu is represented in the Anantha Shayana posture, reclining serenely on the five-hooded serpent Adi Shesha.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'thiruvananthapuram-history-01',
    locationId: 2,
    locationName: 'Thiruvananthapuram',
    category: 'History',
    question: 'Which Travancore monarch dedicated his entire kingdom to Lord Padmanabha in 1750 and assumed the title "Padmanabhadasa"?',
    options: {
      A: 'Swathi Thirunal Rama Varma',
      B: 'Anizham Thirunal Marthanda Varma',
      C: 'Chithira Thirunal Balarama Varma',
      D: 'Karthika Thirunal Rama Varma'
    },
    correctAnswer: 'B',
    explanation: 'Marthanda Varma defeated the Dutch East India Company at the Battle of Colachel (1741) and performed the historic Thrippadidanam in 1750.',
    difficulty: 'hard',
    basePoints: 10,
    points: 10
  },
  {
    id: 'thiruvananthapuram-food-01',
    locationId: 2,
    locationName: 'Thiruvananthapuram',
    category: 'Food',
    question: 'Which grand traditional multi-course vegetarian feast served on banana leaves is integral to Kerala celebrations?',
    options: {
      A: 'Sadhya',
      B: 'Wazwan',
      C: 'Pangath',
      D: 'Chappan Bhog'
    },
    correctAnswer: 'A',
    explanation: 'Kerala Sadhya includes up to 24–28 traditional dishes including Avial, Olan, Thoran, and Payasam served strictly on banana leaves.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 3: Kochi
  {
    id: 'kochi-history-01',
    locationId: 3,
    locationName: 'Kochi',
    category: 'History',
    question: 'Fort Kochi was historically India’s prime hub for trade in which spice, historically nicknamed "Black Gold"?',
    options: {
      A: 'Black Pepper',
      B: 'Cardamom',
      C: 'Cinnamon',
      D: 'Cloves'
    },
    correctAnswer: 'A',
    explanation: 'Malabar black pepper drove ancient trade with Phoenicians, Romans, Arabs, and subsequently Portuguese explorer Vasco da Gama.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'kochi-culture-01',
    locationId: 3,
    locationName: 'Kochi',
    category: 'Culture',
    question: 'What distinctive shore-operated fishing cantilever structures line the Kochi harbor entrance, introduced by Chinese traders?',
    options: {
      A: 'Cheena Vala (Chinese Fishing Nets)',
      B: 'Kollam Vallam nets',
      C: 'Sampan traps',
      D: 'Coracle nets'
    },
    correctAnswer: 'A',
    explanation: 'Cheena Vala are stationary mechanical lift nets believed to have been introduced in Kochi under Kublai Khan’s court explorer Ma Huan.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 4: Madurai
  {
    id: 'madurai-culture-01',
    locationId: 4,
    locationName: 'Madurai',
    category: 'Culture',
    question: 'Madurai is renowned as the ancient seat of which famous literary assemblies of ancient Tamil scholars and poets?',
    options: {
      A: 'The Tamil Sangam Assemblies',
      B: 'Navaratna Council',
      C: 'Bhakti Sabhas',
      D: 'Kavi Sammelan'
    },
    correctAnswer: 'A',
    explanation: 'The ancient Pandya rulers patronized the Three Sangams (academies) in Madurai where seminal Tamil Sangam literature was composed.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'madurai-monuments-01',
    locationId: 4,
    locationName: 'Madurai',
    category: 'Monuments',
    question: 'The Meenakshi Amman Temple in Madurai is celebrated for its towering gopurams and which expansive hall with 985 carved stone pillars?',
    options: {
      A: 'Thousand Pillar Hall (Aayiram Kaal Mandapam)',
      B: 'Vittala Ranga Mandapam',
      C: 'Sheesh Mahal',
      D: 'Kalyana Mandapam'
    },
    correctAnswer: 'A',
    explanation: 'The Thousand Pillar Hall features 985 intricately sculpted stone pillars including musical pillars that produce acoustic tones when struck.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'madurai-festivals-01',
    locationId: 4,
    locationName: 'Madurai',
    category: 'Festivals',
    question: 'Which grand annual April/May festival in Madurai celebrates the celestial wedding of Goddess Meenakshi and Lord Sundareswarar?',
    options: {
      A: 'Chithirai Festival',
      B: 'Karthigai Deepam',
      C: 'Panguni Uthiram',
      D: 'Margazhi Mahotsavam'
    },
    correctAnswer: 'A',
    explanation: 'The Chithirai Festival witnesses millions of devotees as Lord Kallazhagar enters the Vaigai River in coronation splendor.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 5: Thanjavur
  {
    id: 'thanjavur-monuments-01',
    locationId: 5,
    locationName: 'Thanjavur',
    category: 'Monuments',
    question: 'The Brihadeeswarar Temple in Thanjavur was commissioned in 1010 CE by which illustrious Chola monarch?',
    options: {
      A: 'Raja Raja Chola I',
      B: 'Rajendra Chola I',
      C: 'Kulothunga Chola',
      D: 'Karikala Chola'
    },
    correctAnswer: 'A',
    explanation: 'Raja Raja Chola I built this all-granite UNESCO World Heritage marvel, also known as Peruvudaiyar Kovil or the Big Temple.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'thanjavur-art-01',
    locationId: 5,
    locationName: 'Thanjavur',
    category: 'Art',
    question: 'Thanjavur painting is renowned for rich surface relief work adorned with which precious materials?',
    options: {
      A: 'Pure 22-karat gold foil and semi-precious Jaipur gemstones on gesso paste',
      B: 'Crushed mother-of-pearl and natural indigo dyes',
      C: 'Terracotta slip and silver wire filigree',
      D: 'Oil pigments on silk cloth'
    },
    correctAnswer: 'A',
    explanation: 'Tanjore paintings feature wooden boards overlaid with chalk paste (gesso), pure gold leaf embossing, and sparkling stones depicting Hindu deities.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 6: Rameswaram
  {
    id: 'rameswaram-heritage-01',
    locationId: 6,
    locationName: 'Rameswaram',
    category: 'Heritage',
    question: 'The Ramanathaswamy Temple on Rameswaram Island boasts which architectural world record among Hindu temples?',
    options: {
      A: 'The longest outer pillared corridor (third prakaram)',
      B: 'The tallest gold-plated gopuram in Asia',
      C: 'The deepest underground subterranean kund',
      D: 'The widest single monolithic dome'
    },
    correctAnswer: 'A',
    explanation: 'The outer corridor spans approximately 1,220 meters in length with over 1,200 carved stone pillars and painted ceilings.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 7: Mahabalipuram
  {
    id: 'mahabalipuram-monuments-01',
    locationId: 7,
    locationName: 'Mahabalipuram',
    category: 'Monuments',
    question: 'Which dynasty commissioned the rock-cut Pancha Rathas and the Shore Temple at Mahabalipuram in the 7th-8th century CE?',
    options: {
      A: 'Pallava Dynasty',
      B: 'Chera Dynasty',
      C: 'Rashtrakuta Dynasty',
      D: 'Hoysala Dynasty'
    },
    correctAnswer: 'A',
    explanation: 'Pallava kings Mahendravarman I and Narasimhavarman I (Mamalla) pioneered these monolithic stone rock sanctuaries on the Coromandel Coast.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'mahabalipuram-art-01',
    locationId: 7,
    locationName: 'Mahabalipuram',
    category: 'Art',
    question: 'The colossal open-air bas-relief carved on two monolithic boulders in Mahabalipuram is known by which famous name?',
    options: {
      A: 'Descent of the Ganga (Arjuna’s Penance)',
      B: 'Shiva’s Cosmic Tandava',
      C: 'The Coronation of Skanda',
      D: 'Samudra Manthan Churning'
    },
    correctAnswer: 'A',
    explanation: 'Arjuna’s Penance (or Descent of the Ganges) measures 96 by 43 feet, depicting celestial beings, animals, and the descent of the sacred river.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 8: Chennai (Comprehensive Category Coverage as requested in TEST 1 & TEST 2)
  {
    id: 'chennai-history-01',
    locationId: 8,
    locationName: 'Chennai',
    category: 'History',
    question: 'Which first English fortress in India was established by the East India Company in 1644, laying the foundation for modern Chennai?',
    options: {
      A: 'Fort William',
      B: 'Fort St. George',
      C: 'Fort St. David',
      D: 'Gingee Fort'
    },
    correctAnswer: 'B',
    explanation: 'Fort St. George was completed on April 23, 1644, and currently houses the Tamil Nadu Legislative Assembly and Fort Museum.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'chennai-food-01',
    locationId: 8,
    locationName: 'Chennai',
    category: 'Food',
    question: 'What authentic Chennai morning beverage is traditionally prepared using a stainless-steel drip filter and poured between a "davarah" and tumbler?',
    options: {
      A: 'Madras Filter Coffee (Kaapi)',
      B: 'Sulaimani Tea',
      C: 'Kahwa',
      D: 'Badam Milk'
    },
    correctAnswer: 'A',
    explanation: 'South Indian Filter Coffee brewed with roasted chicory-infused coffee decoction and frothed high in a davarah is a quintessential Chennai tradition.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'chennai-culture-01',
    locationId: 8,
    locationName: 'Chennai',
    category: 'Culture',
    question: 'Chennai’s annual mid-December to mid-January Margazhi season is world-renowned as one of the largest festivals for which classical discipline?',
    options: {
      A: 'Carnatic Classical Music and Bharatanatyam Sabhas',
      B: 'Hindustani Dhrupad concerts',
      C: 'Puppetry theater',
      D: 'Kite flying tournaments'
    },
    correctAnswer: 'A',
    explanation: 'The Chennai Music Season (Margazhi festival) features thousands of concerts across premier sabhas like the Music Academy and Narada Gana Sabha.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'chennai-dance-01',
    locationId: 8,
    locationName: 'Chennai',
    category: 'Dance',
    question: 'Which world-famous institution for Bharatanatyam and classical arts in Chennai was founded in 1936 by Rukmini Devi Arundale?',
    options: {
      A: 'Kalakshetra Foundation',
      B: 'Kerala Kalamandalam',
      C: 'Sangeet Natak Akademi',
      D: 'Kathak Kendra'
    },
    correctAnswer: 'A',
    explanation: 'Kalakshetra was founded by Rukmini Devi Arundale in Besant Nagar, Chennai, reviving and standardizing Bharatanatyam as a revered classical dance.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'chennai-monuments-01',
    locationId: 8,
    locationName: 'Chennai',
    category: 'Monuments',
    question: 'Which 7th-century Dravidian temple located in the heart of Mylapore, Chennai, is dedicated to Lord Kapaleeshwarar (Shiva) and Karpagambal?',
    options: {
      A: 'Kapaleeshwarar Temple',
      B: 'Parthasarathy Temple',
      C: 'Marundeeswarar Temple',
      D: 'Vadapalani Murugan Temple'
    },
    correctAnswer: 'A',
    explanation: 'Kapaleeshwarar Temple in Mylapore is famous for its vibrant rainbow-sculpted gopuram, tank, and celebration of the Arupathumoovar festival.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'chennai-heritage-01',
    locationId: 8,
    locationName: 'Chennai',
    category: 'Heritage',
    question: 'Marina Beach in Chennai holds which distinction among natural urban sea beaches worldwide?',
    options: {
      A: 'Second longest natural urban beach in the world',
      B: 'Deepest sandy shoreline',
      C: 'First artificial reclaimed promenade',
      D: 'Only beach with continuous coral reefs'
    },
    correctAnswer: 'A',
    explanation: 'Marina Beach stretches along the Coromandel Coast for roughly 13 km, making it India’s longest natural urban beach and second longest globally.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 9: Puducherry
  {
    id: 'puducherry-history-01',
    locationId: 9,
    locationName: 'Puducherry',
    category: 'History',
    question: 'Puducherry served as the headquarters of which European colonial power in India until its de facto merger in 1954?',
    options: {
      A: 'French East India Company',
      B: 'Portuguese Empire',
      C: 'Dutch East India Company',
      D: 'Danish Asiatic Company'
    },
    correctAnswer: 'A',
    explanation: 'French influence is preserved in Puducherry’s grid-style White Town (Ville Blanche), French consulate, and Alliance Française.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 10: Tirupati
  {
    id: 'tirupati-festivals-01',
    locationId: 10,
    locationName: 'Tirupati',
    category: 'Festivals',
    question: 'Which nine-day celestial celebration held on the Tirumala Hills draws millions of devotees during Navaratri?',
    options: {
      A: 'Sri Venkateswara Brahmotsavam',
      B: 'Kumbh Mela',
      C: 'Ganga Sagar Mela',
      D: 'Thrissur Pooram'
    },
    correctAnswer: 'A',
    explanation: 'The annual Srivari Brahmotsavam honors Lord Venkateswara with grand processions on diverse Vahanas (Garuda, Hanuman, Sesha).',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'tirupati-food-01',
    locationId: 10,
    locationName: 'Tirupati',
    category: 'Food',
    question: 'Which renowned sweet consecrated at Tirumala was granted Geographical Indication (GI) protection in 2009?',
    options: {
      A: 'Tirupati Laddu (Srivari Laddu Prasadam)',
      B: 'Pootharekulu',
      C: 'Kakinada Khaja',
      D: 'Bandar Laddu'
    },
    correctAnswer: 'A',
    explanation: 'Tirupati Laddu prepared in the temple kitchen (Potu) using pure ghee, cashews, raisins, and cardamoms holds distinct GI status.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 11: Amaravati
  {
    id: 'amaravati-history-01',
    locationId: 11,
    locationName: 'Amaravati',
    category: 'History',
    question: 'Amaravati on the Krishna River was the prominent ancient capital of which classical South Indian ruling dynasty?',
    options: {
      A: 'Satavahana Dynasty',
      B: 'Hoysala Dynasty',
      C: 'Kakatiya Dynasty',
      D: 'Maratha Empire'
    },
    correctAnswer: 'A',
    explanation: 'The Satavahanas ruled from Amaravati (Dharanikota), patronizing Buddhist art and maritime trade across Southeast Asia.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 12: Visakhapatnam
  {
    id: 'visakhapatnam-geography-01',
    locationId: 12,
    locationName: 'Visakhapatnam',
    category: 'Geography',
    question: 'Which prominent rocky promontory in Visakhapatnam shelters the natural harbor and resembles a dolphin’s snout?',
    options: {
      A: 'Dolphin’s Nose',
      B: 'Tiger Hill',
      C: 'Cape Comorin',
      D: 'Elephant Rock'
    },
    correctAnswer: 'A',
    explanation: 'Dolphin’s Nose is a 358-meter rocky headland housing a powerful lighthouse guiding vessels entering India’s deepest port.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 13: Hyderabad (Comprehensive Category Coverage as requested in TEST 3)
  {
    id: 'hyderabad-monuments-01',
    locationId: 13,
    locationName: 'Hyderabad',
    category: 'Monuments',
    question: 'Who commissioned the construction of the Charminar in 1591 to commemorate the eradication of a devastating plague in Hyderabad?',
    options: {
      A: 'Muhammad Quli Qutb Shah',
      B: 'Ibrahim Qutb Shah',
      C: 'Asaf Jah I',
      D: 'Mir Osman Ali Khan'
    },
    correctAnswer: 'A',
    explanation: 'Muhammad Quli Qutb Shah, the fifth sultan of the Qutb Shahi dynasty, built the iconic four-minaret monument when establishing Hyderabad.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'hyderabad-history-01',
    locationId: 13,
    locationName: 'Hyderabad',
    category: 'History',
    question: 'Which hill fortress near Hyderabad was famed for its ingenious acoustic defense system and the legendary Hope and Koh-i-Noor diamond vaults?',
    options: {
      A: 'Golconda Fort',
      B: 'Warangal Fort',
      C: 'Daulatabad Fort',
      D: 'Kondaveedu Fort'
    },
    correctAnswer: 'A',
    explanation: 'Golconda Fort was the center of diamond mining and trade; a clap at the Fateh Darwaza can be heard clearly a kilometer away at the citadel summit.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'hyderabad-food-01',
    locationId: 13,
    locationName: 'Hyderabad',
    category: 'Food',
    question: 'Which slow-cooked meat and pounded wheat delicacy prepared during Ramadan became the first Indian meat product to receive GI tag status?',
    options: {
      A: 'Hyderabadi Haleem',
      B: 'Nihari',
      C: 'Galouti Kebab',
      D: 'Rogan Josh'
    },
    correctAnswer: 'A',
    explanation: 'Hyderabadi Haleem is slow-cooked for 7–8 hours in wood-fired bhattis with pure ghee, lentils, spices, and shredded meat.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'hyderabad-culture-01',
    locationId: 13,
    locationName: 'Hyderabad',
    category: 'Culture',
    question: 'Which prominent museum in Hyderabad houses the private collection of Nawab Mir Yousuf Ali Khan, including the Veiled Rebecca statue?',
    options: {
      A: 'Salar Jung Museum',
      B: 'Chowmahalla Palace Museum',
      C: 'Nizam Museum',
      D: 'Birla Planetarium'
    },
    correctAnswer: 'A',
    explanation: 'The Salar Jung Museum on the Musi River is one of India’s premier National Museums, renowned for the 19th-century marble statue Veiled Rebecca.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 14: Warangal
  {
    id: 'warangal-heritage-01',
    locationId: 14,
    locationName: 'Warangal',
    category: 'Heritage',
    question: 'Which iconic four-pillared ceremonial stone archway built by the Kakatiya rulers was adopted in the state emblem of Telangana?',
    options: {
      A: 'Kakatiya Kala Thoranam',
      B: 'Torana of Sanchi',
      C: 'Charminar Arch',
      D: 'Badami Torana'
    },
    correctAnswer: 'A',
    explanation: 'The Kakatiya Kala Thoranam (Warangal Gate) displays exquisite ornate carvings with birds, motifs, and lotus patterns.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 15: Hampi (Comprehensive Category Coverage as requested in TEST 4)
  {
    id: 'hampi-history-01',
    locationId: 15,
    locationName: 'Hampi',
    category: 'History',
    question: 'Hampi on the banks of the Tungabhadra River served as the capital of which great medieval South Indian empire between 1336 and 1565?',
    options: {
      A: 'Vijayanagara Empire',
      B: 'Hoysala Empire',
      C: 'Bahmani Sultanate',
      D: 'Chola Empire'
    },
    correctAnswer: 'A',
    explanation: 'Founded by brothers Harihara I and Bukka Raya I, Vijayanagara grew into one of the wealthiest metropolitan empires in the medieval world.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'hampi-monuments-01',
    locationId: 15,
    locationName: 'Hampi',
    category: 'Monuments',
    question: 'Which iconic monolithic stone shrine depicted on India’s ₹50 currency note stands within the Vittala Temple complex at Hampi?',
    options: {
      A: 'Stone Chariot (Garuda Shrine)',
      B: 'Monolithic Bull (Nandi)',
      C: 'Hazara Rama bas-relief',
      D: 'Elephant Stables'
    },
    correctAnswer: 'A',
    explanation: 'The Stone Chariot is actually a dedicated shrine to Garuda carved from granite slabs, complete with revolving stone wheels.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'hampi-art-01',
    locationId: 15,
    locationName: 'Hampi',
    category: 'Art',
    question: 'What acoustic feature makes the 56 granite pillars of the Ranga Mantapa at Vittala Temple in Hampi world-renowned?',
    options: {
      A: 'They emit musical notes representing classical instruments (Sa-Re-Ga-Ma) when tapped',
      B: 'They amplify whispers across 500 meters',
      C: 'They rotate on hidden pivot stones',
      D: 'They glow in the dark due to natural phosphorus'
    },
    correctAnswer: 'A',
    explanation: 'The musical pillars (Saregama pillars) were sculpted with different densities so each slender column resonates at distinct musical pitches.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'hampi-geography-01',
    locationId: 15,
    locationName: 'Hampi',
    category: 'Geography',
    question: 'Which sacred river flows through Hampi, mentioned as the Pampa river in the epic Kishkindha kanda of the Ramayana?',
    options: {
      A: 'Tungabhadra River',
      B: 'Cauvery River',
      C: 'Krishna River',
      D: 'Godavari River'
    },
    correctAnswer: 'A',
    explanation: 'The Tungabhadra River carves through granite boulder hills where the mythical monkey kingdom of Kishkindha was located.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 16: Mysuru
  {
    id: 'mysuru-monuments-01',
    locationId: 16,
    locationName: 'Mysuru',
    category: 'Monuments',
    question: 'Which architectural style characterizes the grand Amba Vilas (Mysore Palace), rebuilt in 1912 after a fire?',
    options: {
      A: 'Indo-Saracenic (blending Hindu, Muslim, Rajput, and Gothic styles)',
      B: 'Pure Dravidian temple style',
      C: 'Baroque Romanesque',
      D: 'Deccani vernacular'
    },
    correctAnswer: 'A',
    explanation: 'British architect Henry Irwin designed the palace in the Indo-Saracenic style, featuring domes of fine pink marble and sculpted courtyards.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },
  {
    id: 'mysuru-festivals-01',
    locationId: 16,
    locationName: 'Mysuru',
    category: 'Festivals',
    question: 'During Mysuru Dasara, Goddess Chamundeshwari is taken on a royal procession seated in a 750-kg pure gold mantapa atop which animal?',
    options: {
      A: 'The lead ceremonial elephant (Ambari elephant)',
      B: 'A silver-wheeled royal chariot',
      C: 'A ceremonial white stallion',
      D: 'A gold palanquin borne by palace guards'
    },
    correctAnswer: 'A',
    explanation: 'The Jamboo Savari elephant procession carries the golden howdah (Chinnada Ambari) from the palace to Bannimantap ground.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 17: Bengaluru
  {
    id: 'bengaluru-heritage-01',
    locationId: 17,
    locationName: 'Bengaluru',
    category: 'Heritage',
    question: 'Who founded the fortified settlement of Bengaluru in 1537 and erected four boundary watchtowers for the town?',
    options: {
      A: 'Kempe Gowda I',
      B: 'Hyder Ali',
      C: 'Krishnaraja Wadiyar IV',
      D: 'Rani Chennamma'
    },
    correctAnswer: 'A',
    explanation: 'Kempe Gowda I, a feudatory under the Vijayanagara Empire, laid out the petes (market districts) and mud fort of Bangalore.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 18: Badami
  {
    id: 'badami-history-01',
    locationId: 18,
    locationName: 'Badami',
    category: 'History',
    question: 'Badami (ancient Vatapi) nestled in red sandstone cliffs was the celebrated royal capital of which early empire?',
    options: {
      A: 'Early Chalukyas (Badami Chalukyas)',
      B: 'Kadambas of Banavasi',
      C: 'Kakatiyas',
      D: 'Ganga Dynasty'
    },
    correctAnswer: 'A',
    explanation: 'Pulakeshin I founded Badami in 540 CE, and his grandson Pulakeshin II famously halted Emperor Harsha’s southward expansion at the Narmada.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 19: Pattadakal
  {
    id: 'pattadakal-art-01',
    locationId: 19,
    locationName: 'Pattadakal',
    category: 'Art',
    question: 'Pattadakal represents a rare, harmonious architectural fusion of which two major ancient Indian temple styles?',
    options: {
      A: 'Nagara (North Indian) and Dravida (South Indian)',
      B: 'Gandhara and Mathura styles',
      C: 'Kalinga and Chola styles',
      D: 'Vesara and Mughal styles'
    },
    correctAnswer: 'A',
    explanation: 'Pattadakal was the royal coronation site of the Chalukyas where architects experiment with Rekha-Nagara and Dravidian temple shikhara side by side.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 20: Goa
  {
    id: 'goa-festivals-01',
    locationId: 20,
    locationName: 'Goa',
    category: 'Festivals',
    question: 'Which colorful springtime harvest festival in Goa features folk dances like Ghode Modni, Fugdi, and Romat with beating dhols?',
    options: {
      A: 'Shigmo (Shigmotsav)',
      B: 'Sao Joao',
      C: 'Bonalu',
      D: 'Chavang Kut'
    },
    correctAnswer: 'A',
    explanation: 'Shigmo is Goa’s vibrant traditional spring celebration featuring warrior dance parades and village folk theatricals.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'goa-monuments-01',
    locationId: 20,
    locationName: 'Goa',
    category: 'Monuments',
    question: 'Which UNESCO World Heritage basilica in Old Goa holds the sacred mortal remains of Saint Francis Xavier?',
    options: {
      A: 'Basilica of Bom Jesus',
      B: 'Se Cathedral',
      C: 'Church of Our Lady of the Immaculate Conception',
      D: 'Church of St. Augustine'
    },
    correctAnswer: 'A',
    explanation: 'Built in 1605, the Basilica of Bom Jesus is a landmark of Baroque architecture and Christian pilgrimage in Asia.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 21: Mumbai
  {
    id: 'mumbai-monuments-01',
    locationId: 21,
    locationName: 'Mumbai',
    category: 'Monuments',
    question: 'The Gateway of India was erected on the Mumbai waterfront to commemorate the 1911 royal landing of which monarch?',
    options: {
      A: 'King George V and Queen Mary',
      B: 'Queen Victoria',
      C: 'King Edward VII',
      D: 'Prince of Wales (King George VI)'
    },
    correctAnswer: 'A',
    explanation: 'Scottish architect George Wittet designed the 26-meter basalt triumphal arch incorporating 16th-century Gujarati architectural motifs.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'mumbai-food-01',
    locationId: 21,
    locationName: 'Mumbai',
    category: 'Food',
    question: 'Which street food creation featuring spiced potato fritters served inside bread rolls is crowned as Mumbai’s signature culinary icon?',
    options: {
      A: 'Vada Pav',
      B: 'Misal Pav',
      C: 'Pav Bhaji',
      D: 'Sev Puri'
    },
    correctAnswer: 'A',
    explanation: 'Invented outside Dadar railway station in the 1960s by Ashok Vaidya, Vada Pav became the heartbeat snack of working-class Mumbai.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 22: Ajanta
  {
    id: 'ajanta-art-01',
    locationId: 22,
    locationName: 'Ajanta',
    category: 'Art',
    question: 'The world-famous murals on the plaster walls of the Ajanta Caves in Maharashtra primarily narrate stories from which Buddhist canon?',
    options: {
      A: 'The Jataka Tales (previous lives of the Buddha)',
      B: 'The Tripitaka commentaries',
      C: 'The Tibetan Book of the Dead',
      D: 'Ashokan rock edicts'
    },
    correctAnswer: 'A',
    explanation: 'Ajanta’s 30 rock-cut caves feature the famous Bodhisattva Padmapani and Vajrapani painted with natural mineral pigments.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 23: Ellora
  {
    id: 'ellora-monuments-01',
    locationId: 23,
    locationName: 'Ellora',
    category: 'Monuments',
    question: 'The Kailash Temple (Cave 16) at Ellora holds which extraordinary engineering record?',
    options: {
      A: 'The world’s largest monolithic rock excavation, carved top-down from a single volcanic basalt cliff',
      B: 'The oldest brick-masonry tower in the Deccan',
      C: 'The highest cantilever stone archway',
      D: 'The first multi-story underwater reservoir'
    },
    correctAnswer: 'A',
    explanation: 'Commissioned by Rashtrakuta King Krishna I in the 8th century, over 200,000 tonnes of basalt were removed top-down with chisels.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 24: Nashik
  {
    id: 'nashik-heritage-01',
    locationId: 24,
    locationName: 'Nashik',
    category: 'Heritage',
    question: 'Which sacred river originates at Brahmagiri hill near Trimbakeshwar in Nashik and is celebrated as the "Dakshin Ganga"?',
    options: {
      A: 'Godavari River',
      B: 'Krishna River',
      C: 'Narmada River',
      D: 'Tapi River'
    },
    correctAnswer: 'A',
    explanation: 'The Godavari is India’s second longest river, originating at Trimbakeshwar where the Kumbh Mela is celebrated every 12 years.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 25: Pune
  {
    id: 'pune-culture-01',
    locationId: 25,
    locationName: 'Pune',
    category: 'Culture',
    question: 'Which historic 7-story fortification in Pune served as the royal seat of the Maratha Peshwas from 1732 to 1818?',
    options: {
      A: 'Shaniwar Wada',
      B: 'Sinhagad Fort',
      C: 'Shivneri Fort',
      D: 'Purandar Fort'
    },
    correctAnswer: 'A',
    explanation: 'Built by Peshwa Baji Rao I, Shaniwar Wada was the nerve center of the Maratha Empire, known for its Dilli Darwaza and fountain courtyard.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 26: Ahmedabad
  {
    id: 'ahmedabad-history-01',
    locationId: 26,
    locationName: 'Ahmedabad',
    category: 'History',
    question: 'In 2017, Ahmedabad was inscribed by UNESCO with which distinction in India?',
    options: {
      A: 'India’s first UNESCO World Heritage City',
      B: 'First Creative City of Gastronomy',
      C: 'First Modern Architecture Capital',
      D: 'Greenest City of Asia'
    },
    correctAnswer: 'A',
    explanation: 'Founded in 1411 by Sultan Ahmed Shah, Ahmedabad’s wooden pol neighborhoods, stepwells, and mosques earned it historic city heritage status.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 27: Modhera
  {
    id: 'modhera-monuments-01',
    locationId: 27,
    locationName: 'Modhera',
    category: 'Monuments',
    question: 'The Solanki-era Sun Temple at Modhera is architecturally designed so that on which astronomical days the first rays of sunrise illuminate the sanctum?',
    options: {
      A: 'Equinoxes (Spring and Autumn equinox)',
      B: 'Winter Solstice only',
      C: 'Summer Solstice only',
      D: 'Lunar eclipse days'
    },
    correctAnswer: 'A',
    explanation: 'Built in 1026 CE by King Bhima I, the temple’s Surya Kund stepped tank and Guda Mandapa align precisely with equinoctial sunrise.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 28: Dwarka
  {
    id: 'dwarka-festivals-01',
    locationId: 28,
    locationName: 'Dwarka',
    category: 'Festivals',
    question: 'The Dwarkadhish Temple (Jagat Mandir) on the Gomti creek is a primary pilgrimage destination during which festival celebrating Krishna’s birth?',
    options: {
      A: 'Janmashtami',
      B: 'Holi',
      C: 'Radhashtami',
      D: 'Kartik Purnima'
    },
    correctAnswer: 'A',
    explanation: 'Thousands gather at Dwarkadhish to witness the changing of the 52-yard triangular flag (Dhwaja) five times a day during Janmashtami.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 29: Somnath
  {
    id: 'somnath-heritage-01',
    locationId: 29,
    locationName: 'Somnath',
    category: 'Heritage',
    question: 'Somnath Temple situated on the Saurashtra coast is revered as which number among the twelve sacred Jyotirlingas of Shiva?',
    options: {
      A: 'The first (Prathama) Jyotirlinga',
      B: 'The fifth Jyotirlinga',
      C: 'The eighth Jyotirlinga',
      D: 'The twelfth Jyotirlinga'
    },
    correctAnswer: 'A',
    explanation: 'Known as the Shrine Eternal, Somnath is hailed as the first among the twelve Jyotirlingas, rebuilt in Chalukyan style post-independence.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 30: Kutch
  {
    id: 'kutch-art-01',
    locationId: 30,
    locationName: 'Kutch',
    category: 'Art',
    question: 'Which rare traditional art form practiced exclusively by the Khatri family of Nirona in Kutch uses castor oil paint applied with a metal stylus?',
    options: {
      A: 'Rogan Art',
      B: 'Pattachitra',
      C: 'Kalamkari',
      D: 'Madhubani'
    },
    correctAnswer: 'A',
    explanation: 'Rogan art involves boiling castor oil into a viscous paste mixed with natural earth pigments, draped onto fabric without touching it with hands.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 31: Udaipur
  {
    id: 'udaipur-monuments-01',
    locationId: 31,
    locationName: 'Udaipur',
    category: 'Monuments',
    question: 'The grand City Palace of Udaipur overlooks which scenic freshwater lake, home to the Lake Palace (Jag Niwas)?',
    options: {
      A: 'Lake Pichola',
      B: 'Fateh Sagar Lake',
      C: 'Udaisagar Lake',
      D: 'Jaisamand Lake'
    },
    correctAnswer: 'A',
    explanation: 'Lake Pichola was built in 1362 CE; Maharana Udai Singh II built his granite and marble City Palace complex along its eastern shore.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 32: Jodhpur
  {
    id: 'jodhpur-history-01',
    locationId: 32,
    locationName: 'Jodhpur',
    category: 'History',
    question: 'Mehrangarh Fort rising 400 feet above the Blue City was founded in 1459 by which Rathore chieftain?',
    options: {
      A: 'Rao Jodha',
      B: 'Maharaja Jaswant Singh',
      C: 'Rao Bika',
      D: 'Maharaja Man Singh'
    },
    correctAnswer: 'A',
    explanation: 'Rao Jodha established Jodhpur and built the colossal fortress with seven imposing gates including Jai Pol and Fateh Pol.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 33: Jaipur (Comprehensive Category Coverage as requested in test case)
  {
    id: 'jaipur-monuments-01',
    locationId: 33,
    locationName: 'Jaipur',
    category: 'Monuments',
    question: 'Which hill fortress overlooking Maota Lake near Jaipur is celebrated for its exquisite Sheesh Mahal (Hall of Mirrors)?',
    options: {
      A: 'Amber Fort (Amer)',
      B: 'Nahargarh Fort',
      C: 'Jaigarh Fort',
      D: 'Taragarh Fort'
    },
    correctAnswer: 'A',
    explanation: 'Amer Fort blends Rajput and Mughal architecture; its Sheesh Mahal is inlaid with convex mirror tiles that illuminate with a single candle.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'jaipur-history-01',
    locationId: 33,
    locationName: 'Jaipur',
    category: 'History',
    question: 'Why was Jaipur painted terracotta pink in 1876 by Maharaja Sawai Ram Singh?',
    options: {
      A: 'To welcome the Prince of Wales (later King Edward VII) with the traditional color of hospitality',
      B: 'Because red sandstone was the only available building material',
      C: 'To celebrate the conquest of Mewar',
      D: 'As an ancient astronomical requirement by astrologers'
    },
    correctAnswer: 'A',
    explanation: 'Pink being the Rajasthani color of hospitality, the entire walled city was coated in pink wash, earning Jaipur the moniker "Pink City".',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'jaipur-food-01',
    locationId: 33,
    locationName: 'Jaipur',
    category: 'Food',
    question: 'Which traditional Rajasthani dish comprises baked wheat balls dipped in ghee, served with spiced lentils and sweetened crushed grain?',
    options: {
      A: 'Dal Baati Churma',
      B: 'Gatte ki Sabzi',
      C: 'Ker Sangri',
      D: 'Bajre ki Khichdi'
    },
    correctAnswer: 'A',
    explanation: 'Dal Baati Churma is the crown jewel of Rajasthani cuisine, historically preferred by warriors for its high nourishment and longevity.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'jaipur-art-01',
    locationId: 33,
    locationName: 'Jaipur',
    category: 'Art',
    question: 'Which distinctive craft of Jaipur uses Egyptian paste made of quartz powder and glass rather than traditional clay?',
    options: {
      A: 'Jaipur Blue Pottery',
      B: 'Tarakashi inlay',
      C: 'Thewa gold jewelry',
      D: 'Kundan Meenakari'
    },
    correctAnswer: 'A',
    explanation: 'Jaipur Blue Pottery is glazed and low-fired with turqouise and cobalt blue motifs depicting birds and arabesque florals without clay.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 34: Jaisalmer
  {
    id: 'jaisalmer-monuments-01',
    locationId: 34,
    locationName: 'Jaisalmer',
    category: 'Monuments',
    question: 'Jaisalmer Fort (Sonar Qila) in the Thar Desert is distinguished by which unique social attribute?',
    options: {
      A: 'It is one of the world’s very few living forts, housing roughly one-quarter of the old city’s population',
      B: 'It was built entirely of black basalt stone',
      C: 'It has an operational drawbridge over a seawater moat',
      D: 'It is inhabited only by Jain monks'
    },
    correctAnswer: 'A',
    explanation: 'Built in 1156 CE by Rawal Jaisal, the golden yellow sandstone fort houses shops, havelis, and multi-generational families inside its ramparts.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 35: Mount Abu
  {
    id: 'mount-abu-art-01',
    locationId: 35,
    locationName: 'Mount Abu',
    category: 'Art',
    question: 'The Dilwara Temples at Mount Abu are universally praised for unsurpassed craftsmanship in which medium?',
    options: {
      A: 'Translucent white Makrana marble carved with lace-like fineness',
      B: 'Polished granite murals',
      C: 'Cast bronze filigree',
      D: 'Teakwood lattice jali work'
    },
    correctAnswer: 'A',
    explanation: 'Built between the 11th and 13th centuries, the ceilings, doorways, and pendant pillars of Vimal Vasahi temple resemble carved marble lace.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 36: Bhopal
  {
    id: 'bhopal-heritage-01',
    locationId: 36,
    locationName: 'Bhopal',
    category: 'Heritage',
    question: 'Which UNESCO World Heritage rock shelter site located 45 km from Bhopal displays paintings dating back over 10,000 years to the Mesolithic era?',
    options: {
      A: 'Bhimbetka Rock Shelters',
      B: 'Edakkal Caves',
      C: 'Jogimara Caves',
      D: 'Adamgarh Hills'
    },
    correctAnswer: 'A',
    explanation: 'Bhimbetka shelters exhibit the earliest traces of human life in India, with red and white ochre paintings depicting bison, hunting, and dances.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 37: Sanchi
  {
    id: 'sanchi-monuments-01',
    locationId: 37,
    locationName: 'Sanchi',
    category: 'Monuments',
    question: 'The Great Stupa at Sanchi was originally commissioned in the 3rd century BCE by which Mauryan Emperor?',
    options: {
      A: 'Emperor Ashoka the Great',
      B: 'Chandragupta Maurya',
      C: 'Bindusara',
      D: 'Brihadratha'
    },
    correctAnswer: 'A',
    explanation: 'Ashoka established the hemispherical brick stupa over relics of the Buddha, later enlarged with stone toranas by the Shunga and Satavahana dynasties.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 38: Khajuraho
  {
    id: 'khajuraho-art-01',
    locationId: 38,
    locationName: 'Khajuraho',
    category: 'Art',
    question: 'Which medieval Rajput dynasty commissioned the majestic sandstone temples of Khajuraho between 950 and 1050 CE?',
    options: {
      A: 'Chandela Dynasty',
      B: 'Paramara Dynasty',
      C: 'Chauhan Dynasty',
      D: 'Pratihara Dynasty'
    },
    correctAnswer: 'A',
    explanation: 'The Chandelas built the Nagara-style temples, celebrated for the Kandariya Mahadeva Temple celebrating spiritual and earthly life.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 39: Gwalior
  {
    id: 'gwalior-history-01',
    locationId: 39,
    locationName: 'Gwalior',
    category: 'History',
    question: 'Mughal Emperor Babur famously described Gwalior Fort with which poetic accolade?',
    options: {
      A: 'The pearl in the necklace of the fortresses of Hind',
      B: 'The fortress that touches the heavens',
      C: 'The impregnable shield of the South',
      D: 'The garden of sapphire towers'
    },
    correctAnswer: 'A',
    explanation: 'Babur recorded this tribute in his Baburnama, captivated by the blue ceramic tiles of Raja Man Singh Tomar’s Man Mandir palace.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 40: Orchha
  {
    id: 'orchha-history-01',
    locationId: 40,
    locationName: 'Orchha',
    category: 'History',
    question: 'In Orchha’s Ram Raja Temple on the Betwa River, Lord Rama is uniquely worshiped in what official capacity?',
    options: {
      A: 'As a reigning King (Raja) with a daily police gun salute',
      B: 'As a forest ascetic hermit',
      C: 'As a celestial river boatman',
      D: 'As an all-renouncing sanyasi'
    },
    correctAnswer: 'A',
    explanation: 'Orchha is the only place where Lord Rama is officially treated as the sovereign monarch of the kingdom, receiving an armed police guard of honor daily.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 41: Agra
  {
    id: 'agra-monuments-01',
    locationId: 41,
    locationName: 'Agra',
    category: 'Monuments',
    question: 'The Taj Mahal in Agra was commissioned in 1632 by Shah Jahan using immaculate white marble transported from which Rajasthani town?',
    options: {
      A: 'Makrana',
      B: 'Kishangarh',
      C: 'Rajsamand',
      D: 'Alwar'
    },
    correctAnswer: 'A',
    explanation: 'Over 1,000 elephants transported the pure white translucent Makrana marble over 300 km to construct the mausoleum on the Yamuna banks.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'agra-food-01',
    locationId: 41,
    locationName: 'Agra',
    category: 'Food',
    question: 'Which translucent confectionery made from ash gourd (winter melon) is Agra’s most renowned sweet specialty?',
    options: {
      A: 'Agra Petha',
      B: 'Balushahi',
      C: 'Ghewar',
      D: 'Imarti'
    },
    correctAnswer: 'A',
    explanation: 'Agra Petha is made by boiling gourd in sugar syrup, flavored with rosewater, saffron (kesar), and crushed cardamom.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 42: Delhi (Red Fort)
  {
    id: 'delhi-history-01',
    locationId: 42,
    locationName: 'Delhi',
    category: 'History',
    question: 'From the ramparts of which gate of the Red Fort in Delhi does the Prime Minister of India address the nation on Independence Day?',
    options: {
      A: 'Lahori Gate',
      B: 'Delhi Gate',
      C: 'Ajmeri Gate',
      D: 'Kashmiri Gate'
    },
    correctAnswer: 'A',
    explanation: 'The Prime Minister hoists the Tricolour at the Lahori Gate of the Red Fort, a national tradition begun by Jawaharlal Nehru on August 15, 1947.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 43: Delhi (India Gate)
  {
    id: 'delhi-monuments-01',
    locationId: 43,
    locationName: 'Delhi',
    category: 'Monuments',
    question: 'Who was the chief British architect who designed the India Gate war memorial and planned the layout of New Delhi?',
    options: {
      A: 'Sir Edwin Lutyens',
      B: 'Sir Herbert Baker',
      C: 'Robert Tor Russell',
      D: 'William Emerson'
    },
    correctAnswer: 'A',
    explanation: 'Edwin Lutyens designed the 42-meter triumphal arch memorializing 84,000 Indian soldiers of the British Indian Army who fell in World War I.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 44: Delhi (Qutub Minar)
  {
    id: 'delhi-monuments-02',
    locationId: 44,
    locationName: 'Delhi',
    category: 'Monuments',
    question: 'Standing in the courtyard of the Quwwat-ul-Islam mosque near Qutub Minar, what metallurgical wonder from the 4th century CE has resisted rust for over 1,600 years?',
    options: {
      A: 'The Iron Pillar of Delhi',
      B: 'The Ashoka Pillar of Feroz Shah',
      C: 'The Bronze Bell of Lal Kot',
      D: 'The Copper Trident of Mehrauli'
    },
    correctAnswer: 'A',
    explanation: 'The 7-meter high wrought iron pillar bearing Sanskrit inscriptions of King Chandra resists corrosion due to a protective crystalline iron hydrogen phosphate layer.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 45: Mathura
  {
    id: 'mathura-festivals-01',
    locationId: 45,
    locationName: 'Mathura',
    category: 'Festivals',
    question: 'In Barsana near Mathura, which legendary Holi celebration involves women playfully beating men’s shields with wooden sticks?',
    options: {
      A: 'Lathmar Holi',
      B: 'Phoolon ki Holi',
      C: 'Holika Dahan',
      D: 'Dol Jatra'
    },
    correctAnswer: 'A',
    explanation: 'Lathmar Holi recreates the playful legend of Krishna visiting Radha’s village Barsana, attracting visitors from across the world.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 46: Varanasi
  {
    id: 'varanasi-culture-01',
    locationId: 46,
    locationName: 'Varanasi',
    category: 'Culture',
    question: 'At which famous riverfront ghat in Varanasi is the mesmerizing daily Grand Ganga Aarti performed every evening with brass lamps?',
    options: {
      A: 'Dashashwamedh Ghat',
      B: 'Assi Ghat',
      C: 'Manikarnika Ghat',
      D: 'Harishchandra Ghat'
    },
    correctAnswer: 'A',
    explanation: 'Dashashwamedh Ghat hosts the iconic multi-tiered brass lamp aarti accompanied by conch shells, incense, and Vedic chants.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'varanasi-art-01',
    locationId: 46,
    locationName: 'Varanasi',
    category: 'Art',
    question: 'What world-famous handloom textile produced in Varanasi features fine gold and silver zari brocade work?',
    options: {
      A: 'Banarasi Silk Saree',
      B: 'Chanderi Saree',
      C: 'Pochampally Ikat',
      D: 'Paithani Saree'
    },
    correctAnswer: 'A',
    explanation: 'Banarasi silk sarees made with Mughal-inspired floral jaal and meenakari borders hold a prestigious Geographical Indication.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 47: Sarnath
  {
    id: 'sarnath-history-01',
    locationId: 47,
    locationName: 'Sarnath',
    category: 'History',
    question: 'What epochal event in the life of Gautama Buddha took place in the Deer Park at Sarnath near Varanasi?',
    options: {
      A: 'His First Sermon (Dharmachakra Pravartana)',
      B: 'His Supreme Enlightenment (Bodhi)',
      C: 'His Great Renunciation (Mahabhinishkramana)',
      D: 'His Mahaparinirvana'
    },
    correctAnswer: 'A',
    explanation: 'Buddha delivered his first sermon to his five former companions, setting the Wheel of Law in motion and founding the Sangha.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 48: Ayodhya
  {
    id: 'ayodhya-festivals-01',
    locationId: 48,
    locationName: 'Ayodhya',
    category: 'Festivals',
    question: 'Ayodhya set Guinness World Records during Diwali for illuminating over 2 million earthen lamps (diyas) along which sacred river?',
    options: {
      A: 'Sarayu River (Deepotsav celebration)',
      B: 'Gomti River',
      C: 'Yamuna River',
      D: 'Ghaghara River'
    },
    correctAnswer: 'A',
    explanation: 'Deepotsav along the Ram Ki Paidi ghats on the Sarayu River illuminates Ayodhya to celebrate Lord Rama’s return after 14 years of exile.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 49: Lucknow
  {
    id: 'lucknow-culture-01',
    locationId: 49,
    locationName: 'Lucknow',
    category: 'Culture',
    question: 'Which renowned maze of interconnected passages sits on the upper floor of the Bara Imambara built by Nawab Asaf-ud-Daula?',
    options: {
      A: 'Bhulbhulaiya',
      B: 'Sheesh Mahal',
      C: 'Rumi Darwaza',
      D: 'Chota Imambara'
    },
    correctAnswer: 'A',
    explanation: 'The Bhulbhulaiya labyrinth has 489 identical doorways and miraculous acoustics designed to support the columnless central vaulted hall.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'lucknow-art-01',
    locationId: 49,
    locationName: 'Lucknow',
    category: 'Art',
    question: 'Which delicate 400-year-old traditional white-on-white needlework embroidery originated under the patronage of the Nawabs of Awadh?',
    options: {
      A: 'Chikankari',
      B: 'Zardozi',
      C: 'Phulkari',
      D: 'Kantha'
    },
    correctAnswer: 'A',
    explanation: 'Chikankari involves 32 intricate stitch variations crafted on muslin, georgette, and cotton fabric.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 50: Prayagraj
  {
    id: 'prayagraj-heritage-01',
    locationId: 50,
    locationName: 'Prayagraj',
    category: 'Heritage',
    question: 'Triveni Sangam in Prayagraj marks the sacred confluence of the Ganga, the Yamuna, and which mythical subterranean river?',
    options: {
      A: 'Saraswati River',
      B: 'Narmada River',
      C: 'Mandakini River',
      D: 'Godavari River'
    },
    correctAnswer: 'A',
    explanation: 'The Kumbh Mela and Magh Mela at Triveni Sangam gather the largest congregation of humanity on earth for holy snan.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 51: Bodh Gaya
  {
    id: 'bodh-gaya-monuments-01',
    locationId: 51,
    locationName: 'Bodh Gaya',
    category: 'Monuments',
    question: 'Under which sacred tree situated behind the Mahabodhi Temple did Prince Siddhartha Gautama attain supreme Enlightenment?',
    options: {
      A: 'The Bodhi Tree (Sacred Fig - Ficus religiosa)',
      B: 'The Banyan Tree (Vata)',
      C: 'The Ashoka Tree',
      D: 'The Sal Tree'
    },
    correctAnswer: 'A',
    explanation: 'After 49 days of continuous meditation, the Buddha attained enlightenment under the Bodhi tree in 528 BCE; the current tree is a direct descendant.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 52: Nalanda
  {
    id: 'nalanda-history-01',
    locationId: 52,
    locationName: 'Nalanda',
    category: 'History',
    question: 'Which 7th-century Chinese scholar-monk spent five years studying and copying Sanskrit manuscripts at Nalanda Mahavihara?',
    options: {
      A: 'Xuanzang (Hiuen Tsang)',
      B: 'Faxian (Fa Hien)',
      C: 'Yijing (I-Tsing)',
      D: 'Bodhidharma'
    },
    correctAnswer: 'A',
    explanation: 'Xuanzang studied under Chancellor Shilabhadra, documenting Nalanda’s vast multi-tier library Dharmaganja and 10,000 resident students.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 53: Patna
  {
    id: 'patna-history-01',
    locationId: 53,
    locationName: 'Patna',
    category: 'History',
    question: 'Patna, historically known as Pataliputra, was founded on the confluence of the Ganga and Son by which ruler of the Haryanka dynasty?',
    options: {
      A: 'Udayin (successor of Ajatashatru)',
      B: 'Bimbisara',
      C: 'Chandragupta Maurya',
      D: 'Samudragupta'
    },
    correctAnswer: 'A',
    explanation: 'Udayin shifted the Magadha capital from Rajgir to Pataliputra due to its strategic river trade geography.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 54: Kolkata
  {
    id: 'kolkata-monuments-01',
    locationId: 54,
    locationName: 'Kolkata',
    category: 'Monuments',
    question: 'The Victoria Memorial in Kolkata was built using which specific variety of white marble, identical to the stone of the Taj Mahal?',
    options: {
      A: 'Makrana Marble from Rajasthan',
      B: 'Carrara Marble from Italy',
      C: 'Jabalpur Dolomite',
      D: 'Onyx Marble'
    },
    correctAnswer: 'A',
    explanation: 'Lord Curzon commissioned the grand memorial in 1906, constructed of pristine Makrana marble combining Indo-Saracenic and British neoclassical styles.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'kolkata-festivals-01',
    locationId: 54,
    locationName: 'Kolkata',
    category: 'Festivals',
    question: 'Which annual autumn festival of Kolkata was inscribed on UNESCO’s Representative List of the Intangible Cultural Heritage of Humanity in 2021?',
    options: {
      A: 'Durga Puja',
      B: 'Kali Puja',
      C: 'Poila Boishakh',
      D: 'Saraswati Puja'
    },
    correctAnswer: 'A',
    explanation: 'Kolkata’s Durga Puja transforms the city into the world’s largest open-air public art installation with thematic community pandals.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 55: Bishnupur
  {
    id: 'bishnupur-art-01',
    locationId: 55,
    locationName: 'Bishnupur',
    category: 'Art',
    question: 'Bishnupur in West Bengal is celebrated for 17th-century temples faced with which characteristic decorative material due to scarcity of stone?',
    options: {
      A: 'Intricately carved terracotta baked-clay tiles',
      B: 'Stucco lime plaster',
      C: 'Carved river basalt',
      D: 'Glazed blue ceramics'
    },
    correctAnswer: 'A',
    explanation: 'Malla dynasty kings built the Rasmancha, Jor Bangla, and Madan Mohan temples with rich terracotta plaques depicting Ramayana and Krishna scenes.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 56: Bhubaneswar
  {
    id: 'bhubaneswar-dance-01',
    locationId: 56,
    locationName: 'Bhubaneswar',
    category: 'Dance',
    question: 'Which classical dance form of India originated in the temples of Odisha and is characterized by the Tribhanga body posture and Mudras?',
    options: {
      A: 'Odissi',
      B: 'Manipuri',
      C: 'Kathakali',
      D: 'Kuchipudi'
    },
    correctAnswer: 'A',
    explanation: 'Odissi traces its lineage to the temple Maharis and Gotipua dancers, famously captured in temple stone friezes across Bhubaneswar.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 57: Puri
  {
    id: 'puri-festivals-01',
    locationId: 57,
    locationName: 'Puri',
    category: 'Festivals',
    question: 'During the world-renowned Ratha Yatra in Puri, the colossal wooden chariots of which divine trio are pulled by hundreds of thousands of devotees?',
    options: {
      A: 'Lord Jagannath, Lord Balabhadra, and Goddess Subhadra',
      B: 'Lord Rama, Lakshmana, and Sita',
      C: 'Brahma, Vishnu, and Maheshwara',
      D: 'Shiva, Parvati, and Ganesha'
    },
    correctAnswer: 'A',
    explanation: 'The annual procession pulls the three gigantic chariots—Nandighosa, Taladhwaja, and Darpadalana—to the Gundicha Temple.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 58: Konark
  {
    id: 'konark-monuments-01',
    locationId: 58,
    locationName: 'Konark',
    category: 'Monuments',
    question: 'The Sun Temple at Konark is sculpted as a monumental 24-wheeled chariot of Surya driven by how many galloping stone horses?',
    options: {
      A: 'Seven horses (representing the days of the week or colors of sunlight)',
      B: 'Four horses',
      C: 'Nine horses',
      D: 'Twelve horses'
    },
    correctAnswer: 'A',
    explanation: 'Built by King Narasimhadeva I in the 13th century, its 24 carved stone wheels function as accurate sundials measuring time down to minutes.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 59: Ranchi
  {
    id: 'ranchi-culture-01',
    locationId: 59,
    locationName: 'Ranchi',
    category: 'Culture',
    question: 'Which prominent 19th-century tribal freedom fighter and folk hero from the Ranchi region led the Ulgulan (Great Tumult) movement against colonial rule?',
    options: {
      A: 'Birsa Munda (Dharti Aaba)',
      B: 'Sidho and Kanhu Murmu',
      C: 'Tana Bhagat',
      D: 'Tilka Manjhi'
    },
    correctAnswer: 'A',
    explanation: 'Birsa Munda rallied Munda and Oraon tribals; his birth anniversary (November 15) is nationally celebrated as Janjatiya Gaurav Divas.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 60: Guwahati
  {
    id: 'guwahati-festivals-01',
    locationId: 60,
    locationName: 'Guwahati',
    category: 'Festivals',
    question: 'Which major tantric mela held annually in June at the hilltop Kamakhya Temple in Guwahati celebrates the fertility cycle of Mother Earth?',
    options: {
      A: 'Ambubachi Mela',
      B: 'Bihu Mahotsav',
      C: 'Brahmaputra Pushkaram',
      D: 'Jonbeel Mela'
    },
    correctAnswer: 'A',
    explanation: 'During the four-day Ambubachi Mela, the temple doors remain closed for three days as the Brahmaputra waters turn red, celebrated by tantric sadhus.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 61: Shillong
  {
    id: 'shillong-culture-01',
    locationId: 61,
    locationName: 'Shillong',
    category: 'Culture',
    question: 'The indigenous Khasi society of Shillong and Meghalaya follows which unique kinship system where inheritance and family lineage pass through the mother?',
    options: {
      A: 'Matrilineal system (youngest daughter, the Khatduh, inherits ancestral property)',
      B: 'Patriarchal primogeniture',
      C: 'Fraternal polyandry',
      D: 'Eldest son heirship'
    },
    correctAnswer: 'A',
    explanation: 'The Khasis maintain one of the world’s surviving matrilineal systems, where children take the mother’s clan surname.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 62: Cherrapunji
  {
    id: 'cherrapunji-geography-01',
    locationId: 62,
    locationName: 'Cherrapunji',
    category: 'Geography',
    question: 'What ingenious bio-engineering marvels are trained across swollen monsoon rivers by the Khasi and Jaintia tribes in Sohra (Cherrapunji)?',
    options: {
      A: 'Living Root Bridges (Ficus elastica rubber tree aerial roots)',
      B: 'Bamboo ropeways',
      C: 'Floating cane rafts',
      D: 'Carved log aqueducts'
    },
    correctAnswer: 'A',
    explanation: 'Living root bridges grow stronger over decades; the Double Decker Living Root Bridge at Nongriat spans across centuries.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 63: Imphal
  {
    id: 'imphal-dance-01',
    locationId: 63,
    locationName: 'Imphal',
    category: 'Dance',
    question: 'Which classical dance form of Manipur features soft, lyrical movements and cylindrical stiff skirts (Kumil) depicting Radha and Krishna’s Raas Leela?',
    options: {
      A: 'Manipuri Raas Leela',
      B: 'Sattriya',
      C: 'Mohiniyattam',
      D: 'Chhau'
    },
    correctAnswer: 'A',
    explanation: 'Manipuri classical dance was patronized by King Bhagyachandra in 1779 and lauded by Rabindranath Tagore at Shantiniketan.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 64: Kohima
  {
    id: 'kohima-culture-01',
    locationId: 64,
    locationName: 'Kohima',
    category: 'Culture',
    question: 'Which premier cultural festival held every December at Kisama Heritage Village near Kohima brings together all 17 Naga tribes?',
    options: {
      A: 'Hornbill Festival',
      B: 'Moatsu Festival',
      C: 'Sekrenyi',
      D: 'Aoling Festival'
    },
    correctAnswer: 'A',
    explanation: 'Known as the Festival of Festivals, the Hornbill Festival showcases traditional Naga war chants, morung architecture, wrestling, and crafts.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 65: Aizawl
  {
    id: 'aizawl-dance-01',
    locationId: 65,
    locationName: 'Aizawl',
    category: 'Dance',
    question: 'Which famous traditional bamboo dance of Mizoram involves dancers stepping in and out of rhythmic clapping horizontal bamboo staves?',
    options: {
      A: 'Cheraw Dance',
      B: 'Chheihlam',
      C: 'Khuallam',
      D: 'Solakia'
    },
    correctAnswer: 'A',
    explanation: 'Cheraw is Mizoram’s oldest and most iconic folk dance, requiring agile footwork synchronized with clapping bamboos.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 66: Agartala
  {
    id: 'agartala-history-01',
    locationId: 66,
    locationName: 'Agartala',
    category: 'History',
    question: 'Which neoclassical white palace with Mughal-style gardens in Agartala was built in 1901 by Maharaja Radha Kishore Manikya?',
    options: {
      A: 'Ujjayanta Palace',
      B: 'Neermahal',
      C: 'Cooch Behar Palace',
      D: 'Padmanabhapuram Palace'
    },
    correctAnswer: 'A',
    explanation: 'Ujjayanta Palace was named by Rabindranath Tagore, who had deep friendships with the royal Manikya dynasty of Tripura.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 67: Gangtok
  {
    id: 'gangtok-geography-01',
    locationId: 67,
    locationName: 'Gangtok',
    category: 'Geography',
    question: 'Sikkim’s capital Gangtok offers breathtaking views of which third highest mountain peak in the world, reverently worshipped by the Sikkimese?',
    options: {
      A: 'Mount Kangchenjunga',
      B: 'Mount Nanda Devi',
      C: 'Mount Makalu',
      D: 'Mount Dhaulagiri'
    },
    correctAnswer: 'A',
    explanation: 'Standing at 8,586 meters, Kangchenjunga translates as "The Five Treasures of Snows" and is protected under UNESCO Khangchendzonga National Park.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 68: Darjeeling
  {
    id: 'darjeeling-heritage-01',
    locationId: 68,
    locationName: 'Darjeeling',
    category: 'Heritage',
    question: 'Which UNESCO World Heritage 2-foot narrow-gauge mountain railway built in 1881 features the famous Batasia Loop zig-zag?',
    options: {
      A: 'Darjeeling Himalayan Railway (Toy Train)',
      B: 'Kalka-Shimla Railway',
      C: 'Nilgiri Mountain Railway',
      D: 'Matheran Hill Railway'
    },
    correctAnswer: 'A',
    explanation: 'The DHR steam toy train navigates steep mountain terrain from New Jalpaiguri to Ghoom (India’s highest railway station at 2,258 m).',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 69: Siliguri
  {
    id: 'siliguri-geography-01',
    locationId: 69,
    locationName: 'Siliguri',
    category: 'Geography',
    question: 'Siliguri sits along which narrow strategic geopolitical strip of land that connects mainland India with its eight Northeast states?',
    options: {
      A: 'The Siliguri Corridor (The Chicken’s Neck)',
      B: 'Khyber Pass',
      C: 'Zoji La Corridor',
      D: 'Chumbi Valley'
    },
    correctAnswer: 'A',
    explanation: 'The Siliguri Corridor is as narrow as 20 to 22 km at points, bordered by Nepal, Bhutan, and Bangladesh.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 70: Dehradun
  {
    id: 'dehradun-geography-01',
    locationId: 70,
    locationName: 'Dehradun',
    category: 'Geography',
    question: 'Dehradun is situated in the scenic Doon Valley nestled between which two revered river systems of northern India?',
    options: {
      A: 'The Ganga to the east and the Yamuna to the west',
      B: 'The Sutlej and the Beas',
      C: 'The Chenab and the Jhelum',
      D: 'The Alaknanda and Bhagirathi'
    },
    correctAnswer: 'A',
    explanation: 'The Doon Valley is flanked by the Siwalik hills and outer Himalayas between the Ganga and Yamuna basins.',
    difficulty: 'medium',
    basePoints: 10,
    points: 10
  },

  // 71: Rishikesh
  {
    id: 'rishikesh-culture-01',
    locationId: 71,
    locationName: 'Rishikesh',
    category: 'Culture',
    question: 'Rishikesh on the foothills of the Garhwal Himalayas is internationally celebrated by which title?',
    options: {
      A: 'Yoga Capital of the World',
      B: 'City of Lakes',
      C: 'Silk Capital of the North',
      D: 'Valley of Joy'
    },
    correctAnswer: 'A',
    explanation: 'Attracting seekers and international musicians (including The Beatles in 1968), Rishikesh is the premier global epicenter for classical Hatha yoga.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 72: Haridwar
  {
    id: 'haridwar-festivals-01',
    locationId: 72,
    locationName: 'Haridwar',
    category: 'Festivals',
    question: 'At which sacred bathing stepway in Haridwar do millions gather to witness evening lamps floated during the Ganga Aarti?',
    options: {
      A: 'Har Ki Pauri (Footstep of God)',
      B: 'Assi Ghat',
      C: 'Sangam Ghat',
      D: 'Brahma Kund'
    },
    correctAnswer: 'A',
    explanation: 'Har Ki Pauri was built by King Vikramaditya in memory of his brother Bhartrihari, where celestial drops of Amrit are believed to have fallen.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 73: Amritsar (Comprehensive Category Coverage as requested in test case)
  {
    id: 'amritsar-heritage-01',
    locationId: 73,
    locationName: 'Amritsar',
    category: 'Heritage',
    question: 'Sri Harmandir Sahib (The Golden Temple) in Amritsar was designed with entrances on all four sides to symbolize what core spiritual principle?',
    options: {
      A: 'Openness and welcome to all humanity regardless of caste, creed, gender, or religion',
      B: 'The four cardinal points of trade',
      C: 'The four seasons of agriculture',
      D: 'Four royal dynasties of Punjab'
    },
    correctAnswer: 'A',
    explanation: 'Fifth Sikh Guru Arjan Dev Ji placed entrances on all four sides; the foundation stone was laid in 1589 by Sufi saint Hazrat Mian Mir.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'amritsar-history-01',
    locationId: 73,
    locationName: 'Amritsar',
    category: 'History',
    question: 'Which historic public garden near the Golden Temple witnessed the tragic British colonial massacre on Baisakhi day in 1919?',
    options: {
      A: 'Jallianwala Bagh',
      B: 'Company Bagh',
      C: 'Ram Bagh',
      D: 'Shalimar Bagh'
    },
    correctAnswer: 'A',
    explanation: 'On April 13, 1919, General Dyer ordered unprovoked firing on unarmed civilians; its bullet-scarred walls and Martyr’s Well remain preserved.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'amritsar-food-01',
    locationId: 73,
    locationName: 'Amritsar',
    category: 'Food',
    question: 'The Guru Ram Das Langar at the Golden Temple is celebrated globally for which humanitarian feat?',
    options: {
      A: 'Serving free hot vegetarian meals to 50,000 to 100,000 pilgrims every single day through community seva',
      B: 'The largest sweet dish display',
      C: 'The only mechanized pizza kitchen in Punjab',
      D: 'An exclusive royal banquet hall'
    },
    correctAnswer: 'A',
    explanation: 'One of the largest community kitchens in the world, the Langar operates 24/7 run completely on volunteer donations and seva.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 74: Chandigarh
  {
    id: 'chandigarh-art-01',
    locationId: 74,
    locationName: 'Chandigarh',
    category: 'Art',
    question: 'Who created the world-famous 40-acre Rock Garden in Chandigarh entirely out of discarded domestic and industrial waste?',
    options: {
      A: 'Nek Chand Saini',
      B: 'Le Corbusier',
      C: 'Satish Gujral',
      D: 'B.V. Doshi'
    },
    correctAnswer: 'A',
    explanation: 'Government road inspector Nek Chand secretly built stone, broken glass bangle, and ceramic sculpture kingdoms from cleared village waste.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 75: Shimla
  {
    id: 'shimla-history-01',
    locationId: 75,
    locationName: 'Shimla',
    category: 'History',
    question: 'Shimla served what distinguished administrative role in British India between 1864 and 1947?',
    options: {
      A: 'The Summer Capital of British India',
      B: 'The Supreme Maritime Command',
      C: 'The Central Mint of the Raj',
      D: 'The Royal Customs Depot'
    },
    correctAnswer: 'A',
    explanation: 'Viceroy Sir John Lawrence officially declared Shimla the summer capital in 1864, shifting the entire imperial government from Calcutta each April.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 76: Manali
  {
    id: 'manali-culture-01',
    locationId: 76,
    locationName: 'Manali',
    category: 'Culture',
    question: 'The ancient wooden multi-tier pagoda temple in the cedar forests of Dhungri, Manali, is dedicated to which character from the Mahabharata?',
    options: {
      A: 'Hidimba Devi (consort of Bhima)',
      B: 'Draupadi',
      C: 'Gandhari',
      D: 'Kunti'
    },
    correctAnswer: 'A',
    explanation: 'Built in 1553 CE by Raja Bahadur Singh, the Hidimba Temple is crafted from intricately carved deodar timber over a natural sacred rock cave.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 77: Srinagar
  {
    id: 'srinagar-monuments-01',
    locationId: 77,
    locationName: 'Srinagar',
    category: 'Monuments',
    question: 'Which Mughal Emperor commissioned the tiered terraced garden of Shalimar Bagh in Srinagar for his beloved empress Nur Jahan in 1619?',
    options: {
      A: 'Jahangir',
      B: 'Akbar',
      C: 'Shah Jahan',
      D: 'Babur'
    },
    correctAnswer: 'A',
    explanation: 'Jahangir laid out Shalimar Bagh on Dal Lake, featuring flowing spring water cascades (chinar avenues) and black marble pavilion halls.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },
  {
    id: 'srinagar-art-01',
    locationId: 77,
    locationName: 'Srinagar',
    category: 'Art',
    question: 'What ultra-fine handwoven woolen textile made from the underfleece of Himalayan Changthangi goats is a world-famous craft of Kashmir?',
    options: {
      A: 'Pashmina Shawl',
      B: 'Shahtoosh',
      C: 'Kullu Shawl',
      D: 'Angora Weave'
    },
    correctAnswer: 'A',
    explanation: 'Pashmina wool is spun on wooden spinning wheels and woven into shawls embroidered with delicate Sozni needlework.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 78: Leh
  {
    id: 'leh-culture-01',
    locationId: 78,
    locationName: 'Leh',
    category: 'Culture',
    question: 'Which imposing 12-story Buddhist monastery resembling the Potala Palace of Lhasa crowns a hill overlooking the Indus Valley near Leh?',
    options: {
      A: 'Thiksey Monastery',
      B: 'Hemis Monastery',
      C: 'Diskit Monastery',
      D: 'Alchi Monastery'
    },
    correctAnswer: 'A',
    explanation: 'Belonging to the Gelugpa (Yellow Hat) order, Thiksey Monastery houses a magnificent 15-meter tall statue of Maitreya (Future Buddha).',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 79: Nubra
  {
    id: 'nubra-geography-01',
    locationId: 79,
    locationName: 'Nubra',
    category: 'Geography',
    question: 'What unique animals remnants of the ancient Silk Route caravan trade roam the high-altitude sand dunes of Hunder in Nubra Valley?',
    options: {
      A: 'Double-humped Bactrian camels',
      B: 'Himalayan Yaks',
      C: 'Tibetan Wild Ass (Kiang)',
      D: 'Snow Leopards'
    },
    correctAnswer: 'A',
    explanation: 'Bactrian camels have two humps and thick shaggy coats, surviving in the cold desert sand dunes across the 18,380-ft Khardung La pass.',
    difficulty: 'easy',
    basePoints: 10,
    points: 10
  },

  // 80: Ladakh (Grand Finale Milestone)
  {
    id: 'ladakh-heritage-01',
    locationId: 80,
    locationName: 'Ladakh',
    category: 'Heritage',
    question: 'Which breathtaking endorheic high-altitude salt lake in Ladakh spans across the international border and famously shifts colors from turquoise to deep blue?',
    options: {
      A: 'Pangong Tso',
      B: 'Tso Moriri',
      C: 'Dal Lake',
      D: 'Wular Lake'
    },
    correctAnswer: 'A',
    explanation: 'Pangong Tso sits at 4,225 meters altitude; its saline waters freeze completely in winter despite high salinity, concluding our grand 80-milestone Bharat Yatra!',
    difficulty: 'easy',
    basePoints: 20,
    points: 20
  },
  {
    id: 'ladakh-geography-01',
    locationId: 80,
    locationName: 'Ladakh',
    category: 'Geography',
    question: 'Ladakh is geographically classified under which unique environmental biome?',
    options: {
      A: 'High-Altitude Cold Desert',
      B: 'Tropical Rain Forest',
      C: 'Alpine Taiga Swamp',
      D: 'Mangrove Estuary'
    },
    correctAnswer: 'A',
    explanation: 'Lying in the rain shadow of the Great Himalayas, Ladakh receives less than 100mm of annual rainfall and endures freezing arid conditions.',
    difficulty: 'easy',
    basePoints: 20,
    points: 20
  }
];

/**
 * Robust Location-Specific Question Retrieval Engine.
 * Selects a question anchored to BOTH:
 * 1. Player's CURRENT LOCATION (locationId)
 * 2. Player's SELECTED CATEGORY (category)
 *
 * Prioritizes location relevance over generic category relevance:
 * If an exact category match does not exist for that specific location,
 * it safely provides another question from the SAME location.
 * Avoids immediate repeats through `previouslyUsedIds`.
 */
export function getQuestionForLocation(
  locationId: number,
  category?: CategoryType,
  previouslyUsedIds: string[] = []
): Question {
  // 1. Filter by locationId first
  const locationQuestions = QUESTIONS_BANK.filter((q) => q.locationId === locationId);

  if (locationQuestions.length === 0) {
    // Failsafe generation for this exact location ensuring location correctness
    const loc = LOCATIONS_DATA.find((l) => l.id === locationId);
    const locName = loc?.city || `Milestone ${locationId}`;
    const locState = loc?.state || 'India';
    const locSite = loc?.heritageSite || 'Cultural Landmark';
    const locDesc = loc?.description || 'Historic destination on the Bharat Yatra route.';

    return {
      id: `loc-${locationId}-fallback-01`,
      locationId,
      locationName: locName,
      category: category || loc?.questionCategory || 'Heritage',
      question: `Which celebrated heritage landmark is located at ${locName} in ${locState}?`,
      options: {
        A: locSite,
        B: 'Distant Coastal Lighthouse',
        C: 'Northern Glacial Pass',
        D: 'Eastern Mangrove Estuary'
      },
      correctAnswer: 'A',
      explanation: `${locSite} in ${locName}, ${locState} is known for: ${locDesc}`,
      difficulty: 'easy',
      basePoints: 10,
      points: 10
    };
  }

  // 2. Filter by category if requested
  let candidates = category
    ? locationQuestions.filter((q) => q.category === category)
    : locationQuestions;

  // 3. If no exact category match for this location, fallback to ANY question from the SAME location!
  // This strictly enforces: DO NOT fall back to an unrelated question from another location!
  if (candidates.length === 0) {
    candidates = locationQuestions;
  }

  // 4. Filter out previously used questions if possible
  const unused = candidates.filter((q) => !previouslyUsedIds.includes(q.id));
  const pool = unused.length > 0 ? unused : candidates;

  // 5. Select one suitable question
  const selected = pool[Math.floor(Math.random() * pool.length)];
  return selected;
}

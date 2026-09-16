import { Question, SpecialBlockType, DifficultyLevel, CategoryType } from '../types/game';
import { LOCATIONS_DATA } from './locations';
import { QUESTIONS_BANK } from './questions';

/**
 * Reusable Special Challenge Database
 * Multi-template challenge system for:
 * - Heritage Challenge (Blocks 7, 19, 27, 33, 51) [Medium / Hard]
 * - Culture Challenge (Blocks 4, 25, 46, 49, 59, 61, 63, 65, 71, 78) [Medium / Hard]
 * - Festival Challenge (Blocks 10, 20, 28, 30, 45, 48, 57, 60, 72) [Medium]
 * - Knowledge Ladder (Blocks 18, 40, 69) [Medium / Hard] -> +20 Pts & +3 Steps
 * - Myth/Misinformation Trap (Blocks 24, 53, 75) [Medium / Hard] -> True/False -> -2 Steps on error
 * - Golden Heritage (Blocks 15, 22, 37, 41, 58, 73) [Hard / Expert] -> Double Challenge Points
 * - Final Milestone (Block 80) [Expert]
 */

export const SPECIAL_CHALLENGES_BANK: Question[] = [
  // =========================================================================
  // 1. HERITAGE CHALLENGES (Templates: Identify Monument from Clue, Architectural Feature, Historical Period, Match to Location)
  // =========================================================================

  // Block 7: Mahabalipuram
  {
    id: 'sc-7-heritage-clue-01',
    locationId: 7,
    locationName: 'Mahabalipuram',
    category: 'Monuments',
    blockType: 'Heritage Challenge',
    challengeType: 'Identify Monument from Clue',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'HERITAGE CHALLENGE [Clue]: "I am an 8th-century stone temple built directly on the roaring Bay of Bengal coastline, withstanding salt spray and tsunamis for over 1,200 years. Commissioned by Narasimhavarman II (Rajasimha), who am I?"',
    options: {
      A: 'Shore Temple',
      B: 'Pancha Rathas',
      C: 'Varaha Cave Temple',
      D: 'Arjuna’s Penance'
    },
    correctAnswer: 'A',
    explanation: 'The Shore Temple at Mahabalipuram is one of the oldest structural stone temples of South India, built by Pallava king Narasimhavarman II in the 8th century CE.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-7-heritage-arch-02',
    locationId: 7,
    locationName: 'Mahabalipuram',
    category: 'Art',
    blockType: 'Heritage Challenge',
    challengeType: 'Identify Architectural Feature',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'HERITAGE CHALLENGE [Architecture]: The monolithic rock-cut shrines at Mahabalipuram known as the "Pancha Rathas" are uniquely carved out of:',
    options: {
      A: 'Separate baked terracotta brick molds',
      B: 'A single continuous outcropping of pink granite whaleback rock',
      C: 'Imported Makrana marble blocks assembled with lime mortar',
      D: 'Volcanic basalt transported by sea from the Deccan'
    },
    correctAnswer: 'B',
    explanation: 'The Pancha Rathas are monolithic structures carved top-down out of a single large granite boulder outcrop during the reign of Mahendravarman I and Narasimhavarman I.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-7-heritage-period-03',
    locationId: 7,
    locationName: 'Mahabalipuram',
    category: 'History',
    blockType: 'Heritage Challenge',
    challengeType: 'Identify Historical Period',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'HERITAGE CHALLENGE [Historical Period]: During which imperial South Indian dynasty did Mahabalipuram flourish as the chief trading port and rock-sculpting hub?',
    options: {
      A: 'Western Chalukya Dynasty',
      B: 'Pallava Dynasty',
      C: 'Rashtrakuta Dynasty',
      D: 'Pandya Dynasty'
    },
    correctAnswer: 'B',
    explanation: 'The Pallava dynasty (6th–9th century CE) transformed Mahabalipuram into a global sea emporium trading with Southeast Asia and established its rock-cut architecture.',
    basePoints: 20,
    points: 20
  },

  // Block 19: Pattadakal
  {
    id: 'sc-19-heritage-arch-01',
    locationId: 19,
    locationName: 'Pattadakal',
    category: 'Monuments',
    blockType: 'Heritage Challenge',
    challengeType: 'Architectural Synthesis',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'HERITAGE CHALLENGE [Architectural Synthesis]: UNESCO-listed Pattadakal is celebrated globally because its 8th-century temple complex uniquely represents the harmonious confluence of which two distinct classical Indian temple styles?',
    options: {
      A: 'Nagara (North Indian) and Dravidian (South Indian) architectural styles',
      B: 'Buddhist Gandhara and Islamic Indo-Saracenic styles',
      C: 'Hoysala soapstone and Mughal marble styles',
      D: 'Kalinga and Kerala pagoda styles'
    },
    correctAnswer: 'A',
    explanation: 'Pattadakal displays a celebrated union of Northern Rekha-Nagara prasada towers and Southern Dravida vimana pavilions built under Badami Chalukya royal patronage.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-19-heritage-clue-02',
    locationId: 19,
    locationName: 'Pattadakal',
    category: 'History',
    blockType: 'Heritage Challenge',
    challengeType: 'Identify Monument from Clue',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'HERITAGE CHALLENGE [Clue]: "Queen Lokamahadevi commissioned me in 740 CE to commemorate King Vikramaditya II\'s decisive military victory over the Pallavas of Kanchi. Sculptors Gundan and Sarvasiddhi carved my epic pillars. Who am I?"',
    options: {
      A: 'Virupaksha Temple (Lokeshwara)',
      B: 'Mallikarjuna Temple',
      C: 'Papanatha Temple',
      D: 'Sangameshwara Temple'
    },
    correctAnswer: 'A',
    explanation: 'The grand Virupaksha Temple at Pattadakal was built by Queen Lokamahadevi to honor King Vikramaditya II’s victory, serving later as inspiration for Kailasa Temple at Ellora.',
    basePoints: 20,
    points: 20
  },

  // Block 27: Modhera
  {
    id: 'sc-27-heritage-arch-01',
    locationId: 27,
    locationName: 'Modhera',
    category: 'Monuments',
    blockType: 'Heritage Challenge',
    challengeType: 'Solar Engineering',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'HERITAGE CHALLENGE [Solar Architecture]: Modhera Sun Temple was mathematically designed by Solanki architects so that during the spring and autumn equinoxes, what happens at dawn?',
    options: {
      A: 'The first ray of the rising sun shines directly through the sanctum to illuminate the jewel on the Sun God’s crown',
      B: 'The stepped reservoir completely drains through natural underground siphons',
      C: 'The 52 pillars cast no shadow on the paved courtyard at noon',
      D: 'The sandstone lotus dome resonates with acoustic bell chimes'
    },
    correctAnswer: 'A',
    explanation: 'Built in 1026 CE by King Bhima I of the Chaulukya/Solanki dynasty on the Tropic of Cancer, the temple’s sanctum is oriented so solar rays illuminate Surya’s idol during equinoxes.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-27-heritage-clue-02',
    locationId: 27,
    locationName: 'Modhera',
    category: 'Heritage',
    blockType: 'Heritage Challenge',
    challengeType: 'Identify Stepped Reservoir',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'HERITAGE CHALLENGE [Reservoir]: The magnificent rectangular stepped water tank fronting the Modhera Sun Temple, decorated with 108 miniature shrines, is historically called:',
    options: {
      A: 'Ramakund (Surya Kund)',
      B: 'Amrit Sarovar',
      C: 'Chand Baori',
      D: 'Rani ki Vav'
    },
    correctAnswer: 'A',
    explanation: 'The Surya Kund (Ramakund) at Modhera is an architectural masterpiece of geometric stairways containing 108 small carved shrines.',
    basePoints: 20,
    points: 20
  },

  // Block 33: Jaipur (Amber Fort)
  {
    id: 'sc-33-heritage-feature-01',
    locationId: 33,
    locationName: 'Jaipur',
    category: 'Monuments',
    blockType: 'Heritage Challenge',
    challengeType: 'Architectural Feature',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'HERITAGE CHALLENGE [Palace Craft]: Inside Amber Fort, the "Sheesh Mahal" (Hall of Mirrors) was constructed using convex Belgian glass mirrors designed so that:',
    options: {
      A: 'A single flickering candle at night illuminates the entire grand chamber like a starry sky',
      B: 'The walls absorb desert heat and stay ice-cold during midday',
      C: 'Guards could observe approaching armies 15 miles away across Maota Lake',
      D: 'Echoes of court musicians could be amplified without instruments'
    },
    correctAnswer: 'A',
    explanation: 'The Sheesh Mahal’s concave mirror inlays refract candlelight into thousands of twinkling star-like reflections across the gilded ceiling.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-33-heritage-period-02',
    locationId: 33,
    locationName: 'Jaipur',
    category: 'History',
    blockType: 'Heritage Challenge',
    challengeType: 'Astronomical Heritage',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'HERITAGE CHALLENGE [Scientific Heritage]: Jaipur’s UNESCO-listed Jantar Mantar observatory, built by Maharaja Sawai Jai Singh II, features the "Vrihat Samrat Yantra", which holds the world record as:',
    options: {
      A: 'The world’s largest stone sundial, measuring time to an accuracy of 2 seconds',
      B: 'The oldest surviving bronze celestial globe of Asia',
      C: 'The tallest glass lens telescope built before the industrial age',
      D: 'The largest astrolabe ever carved from single basalt rock'
    },
    correctAnswer: 'A',
    explanation: 'The Vrihat Samrat Yantra is a 27-meter-tall stone gnomon sundial capable of measuring local solar time to an astonishing precision of 2 seconds.',
    basePoints: 20,
    points: 20
  },

  // Block 51: Bodh Gaya
  {
    id: 'sc-51-heritage-clue-01',
    locationId: 51,
    locationName: 'Bodh Gaya',
    category: 'Heritage',
    blockType: 'Heritage Challenge',
    challengeType: 'Identify Sacred Monument',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'HERITAGE CHALLENGE [Sacred Landmark]: The Mahabodhi Temple at Bodh Gaya marks the exact spot where Siddhartha Gautama attained supreme enlightenment beneath which sacred tree?',
    options: {
      A: 'Bodhi Tree (Ficus religiosa / Sacred Fig)',
      B: 'Kalpavriksha (Banyan Tree)',
      C: 'Sal Tree (Shorea robusta)',
      D: 'Kadamba Tree'
    },
    correctAnswer: 'A',
    explanation: 'Beneath the sacred Bodhi Tree on the banks of the Niranjana (Phalgu) River, Prince Siddhartha attained enlightenment and became Gautama Buddha circa 528 BCE.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-51-heritage-arch-02',
    locationId: 51,
    locationName: 'Bodh Gaya',
    category: 'Monuments',
    blockType: 'Heritage Challenge',
    challengeType: 'Vajrasana Heritage',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'HERITAGE CHALLENGE [Stone Throne]: The polished sandstone slab placed by Emperor Ashoka between the Mahabodhi Temple and the Bodhi Tree to mark the "Diamond Throne" of enlightenment is named:',
    options: {
      A: 'Vajrasana',
      B: 'Simhasana',
      C: 'Dharmachakra Asana',
      D: 'Mahavira Peetha'
    },
    correctAnswer: 'A',
    explanation: 'Vajrasana (the Diamond Throne or Seat of Lightning) was established by Mauryan Emperor Ashoka the Great around 250 BCE.',
    basePoints: 20,
    points: 20
  },

  // =========================================================================
  // 2. CULTURE CHALLENGES (Templates: Traditional Art, Dance Form, Cultural Practice, Match Tradition to State)
  // =========================================================================

  // Block 4: Madurai
  {
    id: 'sc-4-culture-art-01',
    locationId: 4,
    locationName: 'Madurai',
    category: 'Art',
    blockType: 'Culture Challenge',
    challengeType: 'Identify Traditional Art',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Textile Art]: Madurai is world-famous for which traditional tie-dye cotton fabric craft, characterized by dotted designs (kolam patterns) and vibrant vegetable dyes?',
    options: {
      A: 'Sungudi Sarees',
      B: 'Bandhani from Jamnagar',
      C: 'Pochampally Ikat',
      D: 'Chanderi Weaving'
    },
    correctAnswer: 'A',
    explanation: 'Madurai Sungudi is a traditional cotton saree crafted by Saurashtrian weavers who settled in Madurai under Nayak patronage.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-4-culture-tradition-02',
    locationId: 4,
    locationName: 'Madurai',
    category: 'Culture',
    blockType: 'Culture Challenge',
    challengeType: 'Literary Heritage',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Literary Assembly]: Madurai served as the legendary seat of which ancient academies of Tamil poets and scholars that produced masterworks like Tirukkural and Silappadikaram?',
    options: {
      A: 'Tamil Sangam academies',
      B: 'Navaratna Sabha',
      C: 'Nalanda Mahavihara',
      D: 'Ashtadiggaja Council'
    },
    correctAnswer: 'A',
    explanation: 'Madurai was the capital of the Pandya kings and hosted the third Tamil Sangam, an assembly of poet-scholars that laid the foundation of classical Tamil literature.',
    basePoints: 20,
    points: 20
  },

  // Block 25: Pune
  {
    id: 'sc-25-culture-dance-01',
    locationId: 25,
    locationName: 'Pune',
    category: 'Dance',
    blockType: 'Culture Challenge',
    challengeType: 'Identify Dance Form',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Folk Dance]: Which high-energy traditional Marathi folk dance, performed to the rapid rhythms of the Dholki drum and noted for colorful 9-yard Nauvari sarees, originated in Maharashtra?',
    options: {
      A: 'Lavani',
      B: 'Garba',
      C: 'Rouff',
      D: 'Ghoomar'
    },
    correctAnswer: 'A',
    explanation: 'Lavani is Maharashtra’s traditional music and dance genre, popular since the Peshwa era for rhythmic footwork and expressive storytelling.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-25-culture-music-02',
    locationId: 25,
    locationName: 'Pune',
    category: 'Culture',
    blockType: 'Culture Challenge',
    challengeType: 'Musical Heritage',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Classical Music]: Pune hosts the prestigious "Sawai Gandharva Bhimsen Mahotsav", one of India’s largest celebrations of which classical music tradition?',
    options: {
      A: 'Kirana Gharana Hindustani Classical Music',
      B: 'Carnatic Vocal Kritis',
      C: 'Sufi Qawwali of Ajmer',
      D: 'Baul Mystical Folk of Bengal'
    },
    correctAnswer: 'A',
    explanation: 'Founded in 1953 by Bharat Ratna Pandit Bhimsen Joshi in memory of his guru Sawai Gandharva, it is the benchmark festival of the Kirana Gharana Hindustani music.',
    basePoints: 20,
    points: 20
  },

  // Block 46: Varanasi
  {
    id: 'sc-46-culture-craft-01',
    locationId: 46,
    locationName: 'Varanasi',
    category: 'Art',
    blockType: 'Culture Challenge',
    challengeType: 'Identify Traditional Art',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Textile Mastercraft]: The celebrated Banarasi silk sarees woven on traditional pit looms in Varanasi are renowned for incorporating which metallic thread embroidery?',
    options: {
      A: 'Zari gold and silver brocade work',
      B: 'Phulkari floral geometric floss',
      C: 'Chikan shadow white threadwork',
      D: 'Kantha running stitch quilting'
    },
    correctAnswer: 'A',
    explanation: 'Banarasi sarees feature opulent pure gold and silver Zari brocade weaving with intricate Mughal motifs like kalga and bel.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-46-culture-music-02',
    locationId: 46,
    locationName: 'Varanasi',
    category: 'Culture',
    blockType: 'Culture Challenge',
    challengeType: 'Musical Instrument Heritage',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Musical Heritage]: Which legendary Bharat Ratna maestro, born and trained along the ghats of Varanasi, elevated the humble wooden Shehnai to international classical concert stages?',
    options: {
      A: 'Ustad Bismillah Khan',
      B: 'Pandit Ravi Shankar',
      C: 'Ustad Zakir Hussain',
      D: 'Pandit Hariprasad Chaurasia'
    },
    correctAnswer: 'A',
    explanation: 'Ustad Bismillah Khan practiced for decades at the Balaji Ghat and Vishwanath temple in Varanasi, earning global acclaim for the Shehnai.',
    basePoints: 20,
    points: 20
  },

  // Block 49: Lucknow
  {
    id: 'sc-49-culture-embroidery-01',
    locationId: 49,
    locationName: 'Lucknow',
    category: 'Art',
    blockType: 'Culture Challenge',
    challengeType: 'Identify Traditional Craft',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Needlework]: Which exquisite centuries-old shadow-embroidery craft on fine muslin fabric originated under Awadhi royal patronage in Lucknow?',
    options: {
      A: 'Chikankari (and Zardozi)',
      B: 'Kalamkari pen painting',
      C: 'Kutch mirror embroidery',
      D: 'Kasuti needlework'
    },
    correctAnswer: 'A',
    explanation: 'Lucknowi Chikankari is a delicate 400-year-old white-on-white shadow needlework embroidery patronized by the Nawabs of Awadh.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-49-culture-dance-02',
    locationId: 49,
    locationName: 'Lucknow',
    category: 'Dance',
    blockType: 'Culture Challenge',
    challengeType: 'Classical Dance Gharana',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Dance Heritage]: Nawab Wajid Ali Shah of Lucknow was a passionate royal patron and choreographic developer of which classical dance form’s Lucknow Gharana?',
    options: {
      A: 'Kathak',
      B: 'Kathakali',
      C: 'Odissi',
      D: 'Kuchipudi'
    },
    correctAnswer: 'A',
    explanation: 'The Lucknow Gharana of Kathak blossomed under Nawab Wajid Ali Shah, known for graceful bhava, subtle facial expressions, and poetic thumris.',
    basePoints: 20,
    points: 20
  },

  // Block 59: Ranchi
  {
    id: 'sc-59-culture-tribal-01',
    locationId: 59,
    locationName: 'Ranchi',
    category: 'Art',
    blockType: 'Culture Challenge',
    challengeType: 'Identify Tribal Art',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Indigenous Art]: Which UNESCO-recognized ritual mural painting tradition of Jharkhand is painted by tribal women on harvest house walls using natural colored clays?',
    options: {
      A: 'Sohrai and Khovar painting',
      B: 'Madhubani painting',
      C: 'Warli painting',
      D: 'Gond tribal painting'
    },
    correctAnswer: 'A',
    explanation: 'Sohrai and Khovar are indigenous mural art forms of Hazaribagh/Ranchi in Jharkhand, awarded GI tag status for their sacred animal and fertility motifs.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-59-culture-dance-02',
    locationId: 59,
    locationName: 'Ranchi',
    category: 'Dance',
    blockType: 'Culture Challenge',
    challengeType: 'Martial Folk Dance',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Folk Dance]: Which martial and tribal dance of Jharkhand and Bengal features dancers performing acrobatic martial arts while wearing elaborate painted paper-mache masks?',
    options: {
      A: 'Chhau Dance (Seraikella / Purulia / Mayurbhanj)',
      B: 'Bhangra',
      C: 'Kalbelia',
      D: 'Cheraw Bamboo Dance'
    },
    correctAnswer: 'A',
    explanation: 'Chhau is an ancient semi-classical martial dance recognized by UNESCO, enacting episodes from the Ramayana and Mahabharata.',
    basePoints: 20,
    points: 20
  },

  // Block 61: Shillong
  {
    id: 'sc-61-culture-matrilineal-01',
    locationId: 61,
    locationName: 'Shillong',
    category: 'Culture',
    blockType: 'Culture Challenge',
    challengeType: 'Cultural Practice',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Social Tradition]: Meghalaya’s indigenous Khasi and Garo communities are world-renowned for practicing which unique familial social structure?',
    options: {
      A: 'Matrilineal system where lineage and ancestral property pass from mother to youngest daughter (Khatduh)',
      B: 'Nomadic pastoral communal ownership with seasonal migrations',
      C: 'Strict patriarchal hereditary council succession',
      D: 'Monastic ascetic stewardship of mountain groves'
    },
    correctAnswer: 'A',
    explanation: 'The Khasis follow one of the world’s longest surviving matrilineal systems, where children take the mother’s surname and property passes through female descent.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-61-culture-craft-02',
    locationId: 61,
    locationName: 'Shillong',
    category: 'Heritage',
    blockType: 'Culture Challenge',
    challengeType: 'Bio-Engineering Heritage',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Living Architecture]: Khasi indigenous communities in the Meghalaya hills weave aerial roots of the rubber fig tree (Ficus elastica) across mountain gorges to create:',
    options: {
      A: 'Jingkieng Jri (Living Root Bridges)',
      B: 'Hanging bamboo suspension tramways',
      C: 'Floating cane prayer platforms',
      D: 'Rock-anchored vine elevators'
    },
    correctAnswer: 'A',
    explanation: 'Jingkieng Jri (Living Root Bridges) are UNESCO-tentative bio-engineering marvels grown over decades that become stronger as roots mature.',
    basePoints: 20,
    points: 20
  },

  // Block 63: Imphal
  {
    id: 'sc-63-culture-dance-01',
    locationId: 63,
    locationName: 'Imphal',
    category: 'Dance',
    blockType: 'Culture Challenge',
    challengeType: 'Classical Dance Form',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Classical Dance]: The classical Manipuri Raas Leela dance is celebrated for its graceful, circular swaying movements and unique barrel-shaped stiff skirts called:',
    options: {
      A: 'Kumil (Potloi)',
      B: 'Pattu Pavadai',
      C: 'Ghagra Choli',
      D: 'Mekhela Chador'
    },
    correctAnswer: 'A',
    explanation: 'Manipuri dancers portraying Radha and Gopis wear the iconic embroidered cylindrical costume called Kumil (or Potloi).',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-63-culture-martial-02',
    locationId: 63,
    locationName: 'Imphal',
    category: 'Culture',
    blockType: 'Culture Challenge',
    challengeType: 'Traditional Martial Art',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Martial Heritage]: Which ancient Meitei martial art of Manipur involves fighting techniques with the sword (Thang) and spear (Ta)?',
    options: {
      A: 'Thang-Ta (Huyen Langlon)',
      B: 'Kalaripayattu',
      C: 'Silambam',
      D: 'Gatka'
    },
    correctAnswer: 'A',
    explanation: 'Thang-Ta is the traditional armed combat system of Manipur, integrating breathing control with defensive weapon maneuvers.',
    basePoints: 20,
    points: 20
  },

  // Block 65: Aizawl
  {
    id: 'sc-65-culture-dance-01',
    locationId: 65,
    locationName: 'Aizawl',
    category: 'Dance',
    blockType: 'Culture Challenge',
    challengeType: 'Identify Dance Form',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Folk Rhythm]: Which world-famous traditional folk dance of Mizoram involves dancers gracefully stepping in and out between pairs of horizontal bamboo staves beaten rhythmically on the ground?',
    options: {
      A: 'Cheraw (Bamboo Dance)',
      B: 'Khuallam',
      C: 'Chheihlam',
      D: 'Bardo Chham'
    },
    correctAnswer: 'A',
    explanation: 'Cheraw is the ancient bamboo dance of Mizoram, requiring incredible timing and agile footwork between clapped bamboo poles.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-65-culture-festival-02',
    locationId: 65,
    locationName: 'Aizawl',
    category: 'Culture',
    blockType: 'Culture Challenge',
    challengeType: 'Harvest Tradition',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Mizo Tradition]: Which is the most important harvest festival of the Mizo people, celebrated in spring after clearing the bamboo forests for jhum cultivation?',
    options: {
      A: 'Chapchar Kut',
      B: 'Mim Kut',
      C: 'Pawl Kut',
      D: 'Thalfavang Kut'
    },
    correctAnswer: 'A',
    explanation: 'Chapchar Kut is the joyous spring carnival of Mizoram, marked by music, traditional costumes, feasts, and Cheraw dance.',
    basePoints: 20,
    points: 20
  },

  // Block 71: Rishikesh
  {
    id: 'sc-71-culture-yoga-01',
    locationId: 71,
    locationName: 'Rishikesh',
    category: 'Heritage',
    blockType: 'Culture Challenge',
    challengeType: 'Spiritual Heritage',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Global Heritage]: Globally recognized as the "Yoga Capital of the World", Rishikesh sits at the foothills of the Garhwal Himalayas on the banks of which sacred river?',
    options: {
      A: 'River Ganga (Ganges)',
      B: 'River Yamuna',
      C: 'River Alaknanda',
      D: 'River Bhagirathi'
    },
    correctAnswer: 'A',
    explanation: 'Rishikesh is the spiritual gateway where the holy Ganga emerges from the Himalayan gorges into the northern plains.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-71-culture-bridge-02',
    locationId: 71,
    locationName: 'Rishikesh',
    category: 'Monuments',
    blockType: 'Culture Challenge',
    challengeType: 'Iconic Landmark',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Landmark Bridges]: Which historic iron suspension footbridges across the Ganga are celebrated landmarks of Rishikesh associated with the Ramayana epic?',
    options: {
      A: 'Lakshman Jhula and Ram Jhula',
      B: 'Vivekananda Setu',
      C: 'Coronation Bridge',
      D: 'Atal Setu'
    },
    correctAnswer: 'A',
    explanation: 'Lakshman Jhula and Ram Jhula are iconic suspension bridges spanning the Ganga where legends hold Lord Lakshman crossed on a jute rope.',
    basePoints: 20,
    points: 20
  },

  // Block 78: Leh
  {
    id: 'sc-78-culture-art-01',
    locationId: 78,
    locationName: 'Leh',
    category: 'Art',
    blockType: 'Culture Challenge',
    challengeType: 'Monastic Sacred Art',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: 'CULTURE CHALLENGE [Sacred Art]: In the Tibetan Buddhist monasteries (gompas) of Ladakh, sacred painted Buddhist scrolls on silk or cotton depicting deities and mandalas are known as:',
    options: {
      A: 'Thangka paintings',
      B: 'Pattachitra scrolls',
      C: 'Phad scrolls',
      D: 'Pithora murals'
    },
    correctAnswer: 'A',
    explanation: 'Thangkas are sacred Tibetan Buddhist scrolls used for meditation, monastery wall hangings, and spiritual ceremonies.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-78-culture-festival-02',
    locationId: 78,
    locationName: 'Leh',
    category: 'Culture',
    blockType: 'Culture Challenge',
    challengeType: 'Monastic Dance',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'CULTURE CHALLENGE [Ritual Dance]: The celebrated monastic masked dance performed by Buddhist lamas in courtyards of Hemis and Thiksey monasteries to conquer demons is called:',
    options: {
      A: 'Cham dance',
      B: 'Ghoomar',
      C: 'Yak dance',
      D: 'Nati dance'
    },
    correctAnswer: 'A',
    explanation: 'Cham is a sacred masked and costumed dance accompanied by traditional Tibetan horns and cymbals, symbolizing the triumph of dharma over evil.',
    basePoints: 20,
    points: 20
  },

  // =========================================================================
  // 3. FESTIVAL CHALLENGES (Templates: Identify Festival from Clue, Match Festival to Region, Traditional Celebration, Food/Custom)
  // =========================================================================

  // Block 10: Tirupati
  {
    id: 'sc-10-festival-clue-01',
    locationId: 10,
    locationName: 'Tirupati',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Identify Festival from Clue',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Nine-Day Celebration]: Which grand nine-day annual festival celebrated at the Tirumala Venkateswara Temple features majestic daily vahana processions carrying Malayappa Swami?',
    options: {
      A: 'Sri Venkateswara Brahmotsavam',
      B: 'Kumbh Mela',
      C: 'Thrissur Pooram',
      D: 'Rath Yatra'
    },
    correctAnswer: 'A',
    explanation: 'Brahmotsavam is the premier annual temple festival of Tirumala, originally instituted by Lord Brahma according to temple legend.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-10-festival-food-02',
    locationId: 10,
    locationName: 'Tirupati',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Sacred Food Offering',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Prasadam]: Which world-famous GI-tagged sweet delicacy, prepared with gram flour, ghee, sugar, cardamom, and dry fruits, is offered to pilgrims at Tirupati?',
    options: {
      A: 'Tirupati Laddu (Srivari Laddu)',
      B: 'Mysore Pak',
      C: 'Dharwad Peda',
      D: 'Kakinada Khaja'
    },
    correctAnswer: 'A',
    explanation: 'The Tirupati Laddu has held a Geographical Indication (GI) tag since 2009 and is prepared in the temple’s historic Potu kitchen.',
    basePoints: 20,
    points: 20
  },

  // Block 20: Goa
  {
    id: 'sc-20-festival-clue-01',
    locationId: 20,
    locationName: 'Goa',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Identify Festival from Clue',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Spring Carnival]: Which vibrant traditional Goan spring festival, celebrated by Konkani communities with colorful street parades, folk drums, and mythological floats, coincides with Holi?',
    options: {
      A: 'Shigmo (Shigmotsav)',
      B: 'Sunburn Festival',
      C: 'Sao Joao',
      D: 'Bonderam Festival'
    },
    correctAnswer: 'A',
    explanation: 'Shigmo is Goa’s grand indigenous spring festival featuring Ghode Modni warrior dances, Fugdi performances, and float parades.',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-20-festival-water-02',
    locationId: 20,
    locationName: 'Goa',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Monsoon Feast',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Monsoon Tradition]: In June, Goans wear floral crowns called "kopels" and leap into overflowing community wells and streams to celebrate the feast of:',
    options: {
      A: 'Sao Joao (Feast of St. John the Baptist)',
      B: 'Feast of St. Francis Xavier',
      C: 'Three Kings Feast',
      D: 'Chikal Kalo'
    },
    correctAnswer: 'A',
    explanation: 'Sao Joao is celebrated joyously across Goan villages where youths jump into wells, streams, and rivers to celebrate the arrival of the monsoon.',
    basePoints: 20,
    points: 20
  },

  // Block 28: Dwarka
  {
    id: 'sc-28-festival-krishna-01',
    locationId: 28,
    locationName: 'Dwarka',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Sacred Celebration',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Krishna Janmotsav]: At the ancient Dwarkadhish Temple (Jagat Mandir), which major festival marks Lord Krishna\'s birth with the sacred changing of the 52-yard temple flag (Dhwajaji)?',
    options: {
      A: 'Janmashtami',
      B: 'Govardhan Puja',
      C: 'Radhashtami',
      D: 'Tulsi Vivah'
    },
    correctAnswer: 'A',
    explanation: 'Janmashtami at Dwarka attracts hundreds of thousands of devotees who celebrate Krishna’s divine midnight birth and hoist the sacred 52-yard flag.',
    basePoints: 20,
    points: 20
  },

  // Block 30: Kutch
  {
    id: 'sc-30-festival-rann-01',
    locationId: 30,
    locationName: 'Kutch',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Desert Carnival',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Salt Desert Festival]: Which three-month winter cultural carnival takes place under the full moon on the white salt marsh desert of Dhordo in Gujarat?',
    options: {
      A: 'Rann Utsav',
      B: 'Desert Festival Jaisalmer',
      C: 'Pushkar Fair',
      D: 'Tarnetar Fair'
    },
    correctAnswer: 'A',
    explanation: 'Rann Utsav showcases Kutchi embroidery, Rogan art, Sufi desert folk songs, and tent cities across the shimmering white salt desert.',
    basePoints: 20,
    points: 20
  },

  // Block 45: Mathura
  {
    id: 'sc-45-festival-holi-01',
    locationId: 45,
    locationName: 'Mathura',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Unique Celebration Custom',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Unique Custom]: In Barsana and Nandgaon near Mathura, which legendary style of Holi is celebrated where women playfully beat men\'s shields with wooden sticks?',
    options: {
      A: 'Lathmar Holi',
      B: 'Holika Dahan',
      C: 'Phoolon ki Holi',
      D: 'Hola Mohalla'
    },
    correctAnswer: 'A',
    explanation: 'Lathmar Holi re-enacts the legend of Lord Krishna visiting Radha’s village of Barsana, where women defend their courtyards with lathis.',
    basePoints: 20,
    points: 20
  },

  // Block 48: Ayodhya
  {
    id: 'sc-48-festival-deepotsav-01',
    locationId: 48,
    locationName: 'Ayodhya',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Festival of Lights',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Guinness Record]: Which grand festival in Ayodhya illuminates the banks of the Sarayu River (Ram ki Paidi) with millions of earthen oil lamps (diyas)?',
    options: {
      A: 'Ayodhya Deepotsav (Diwali Eve)',
      B: 'Dev Deepawali',
      C: 'Ganga Dussehra',
      D: 'Ram Navami Mela'
    },
    correctAnswer: 'A',
    explanation: 'Deepotsav commemorates the return of Lord Rama to Ayodhya after 14 years of exile, setting multiple world records for the largest display of earthen lamps.',
    basePoints: 20,
    points: 20
  },

  // Block 57: Puri
  {
    id: 'sc-57-festival-chariot-01',
    locationId: 57,
    locationName: 'Puri',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Chariot Procession',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Chariot Procession]: During the world-renowned Rath Yatra of Puri, what is the name of Lord Jagannath’s massive 16-wheeled wooden chariot?',
    options: {
      A: 'Nandighosha (Garudadhwaja)',
      B: 'Taladhwaja',
      C: 'Darpadalana',
      D: 'Pushpaka'
    },
    correctAnswer: 'A',
    explanation: 'Lord Jagannath rides the red-and-yellow Nandighosha chariot, while Lord Balabhadra rides Taladhwaja and Devi Subhadra rides Darpadalana.',
    basePoints: 20,
    points: 20
  },

  // Block 60: Guwahati
  {
    id: 'sc-60-festival-ambubachi-01',
    locationId: 60,
    locationName: 'Guwahati',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Tantric Monsoon Fair',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Sacred Fair]: Which annual monsoon gathering at Kamakhya Temple atop Nilachal Hill celebrates the fertility and rejuvenating power of Mother Earth?',
    options: {
      A: 'Ambubachi Mela',
      B: 'Bihu Utsav',
      C: 'Majuli Raas Festival',
      D: 'Jonbeel Mela'
    },
    correctAnswer: 'A',
    explanation: 'Ambubachi Mela is the largest spiritual congregation in Eastern India, observed during the monsoon month of Ahaar at the sacred Shaktipeeth.',
    basePoints: 20,
    points: 20
  },

  // Block 72: Haridwar
  {
    id: 'sc-72-festival-kumbh-01',
    locationId: 72,
    locationName: 'Haridwar',
    category: 'Festivals',
    blockType: 'Festival Challenge',
    challengeType: 'Cosmic Congregation',
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: 'FESTIVAL CHALLENGE [Cosmic Bath]: Haridwar is one of the four sacred sites that hosts which colossal religious pilgrimage gathering every 12 years based on Jupiter’s transit?',
    options: {
      A: 'Purna Kumbh Mela',
      B: 'Somnath Fair',
      C: 'Kapil Muni Fair',
      D: 'Nau Chandi Mela'
    },
    correctAnswer: 'A',
    explanation: 'The Kumbh Mela at Haridwar is a UNESCO Intangible Cultural Heritage event, commemorating drops of the immortal nectar Amrita that fell at Brahmakund, Har Ki Pauri.',
    basePoints: 20,
    points: 20
  },

  // =========================================================================
  // 4. KNOWLEDGE LADDER (+20 Points & +3 Blocks Forward Advance!)
  // Blocks: 18 (Badami), 40 (Orchha), 69 (Siliguri)
  // =========================================================================

  // Block 18: Badami
  {
    id: 'sc-18-ladder-01',
    locationId: 18,
    locationName: 'Badami',
    category: 'History',
    blockType: 'Knowledge Ladder',
    challengeType: 'Multi-Step Knowledge Challenge',
    isKnowledgeLadder: true,
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '🪜 KNOWLEDGE LADDER [+20 PTS & ADVANCE +3 BLOCKS!]: In Cave 1 of Badami\'s rock-cut sanctuaries, which celebrated multi-armed monolithic relief of Lord Shiva depicts him performing the cosmic dance of creation with 81 unique Natya Shastra poses?',
    options: {
      A: '18-armed Dancing Nataraja',
      B: 'Four-armed Ardhanarishvara',
      C: 'Trivikrama lifting the cosmic foot',
      D: 'Varaha lifting Bhudevi'
    },
    correctAnswer: 'A',
    explanation: 'Badami Cave 1 features a spectacular 18-armed carving of Nataraja. Pairing any two arms forms 81 distinct poses of classical Indian Bharatanatyam dance! +20 Points and Climb 3 Blocks forward!',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-18-ladder-02',
    locationId: 18,
    locationName: 'Badami',
    category: 'Monuments',
    blockType: 'Knowledge Ladder',
    challengeType: 'Multi-Step Knowledge Challenge',
    isKnowledgeLadder: true,
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: '🪜 KNOWLEDGE LADDER [+20 PTS & ADVANCE +3 BLOCKS!]: The scenic artificial water reservoir built in the 5th century between the north and south sandstone hills of Badami is named:',
    options: {
      A: 'Agastya Teertha lake',
      B: 'Pushkarani tank',
      C: 'Bhojtal lake',
      D: 'Pampa Sarovar'
    },
    correctAnswer: 'A',
    explanation: 'Agastya Teertha is the sacred lake at Badami whose waters are surrounded by Cave Temples and the picturesque Bhoothanatha Temples on its eastern bank.',
    basePoints: 20,
    points: 20
  },

  // Block 40: Orchha
  {
    id: 'sc-40-ladder-01',
    locationId: 40,
    locationName: 'Orchha',
    category: 'Monuments',
    blockType: 'Knowledge Ladder',
    challengeType: 'Multi-Step Knowledge Challenge',
    isKnowledgeLadder: true,
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '🪜 KNOWLEDGE LADDER [+20 PTS & ADVANCE +3 BLOCKS!]: In Orchha on the banks of the Betwa River, which unique royal temple is the only shrine in India where Lord Rama is officially worshipped not only as a deity, but as a crowned King (Raja)?',
    options: {
      A: 'Ram Raja Temple',
      B: 'Chaturbhuj Temple',
      C: 'Jahangir Mahal',
      D: 'Laxminarayan Temple'
    },
    correctAnswer: 'A',
    explanation: 'At Ram Raja Temple in Orchha, Lord Rama is revered as king; police guards of honor offer armed gun salutes every single day! +20 Points and Climb 3 Blocks forward!',
    basePoints: 20,
    points: 20
  },
  {
    id: 'sc-40-ladder-02',
    locationId: 40,
    locationName: 'Orchha',
    category: 'History',
    blockType: 'Knowledge Ladder',
    challengeType: 'Multi-Step Knowledge Challenge',
    isKnowledgeLadder: true,
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: '🪜 KNOWLEDGE LADDER [+20 PTS & ADVANCE +3 BLOCKS!]: King Bir Singh Deo built the grand multistoried Jahangir Mahal inside Orchha Fort in 1605 CE specifically to welcome which visiting Mughal Emperor?',
    options: {
      A: 'Emperor Jahangir (Prince Salim)',
      B: 'Emperor Akbar',
      C: 'Emperor Shah Jahan',
      D: 'Emperor Babur'
    },
    correctAnswer: 'A',
    explanation: 'Jahangir Mahal was constructed as a royal guest palace when Prince Salim/Emperor Jahangir visited his friend Bir Singh Deo for a single night.',
    basePoints: 20,
    points: 20
  },

  // Block 69: Siliguri
  {
    id: 'sc-69-ladder-01',
    locationId: 69,
    locationName: 'Siliguri',
    category: 'Heritage',
    blockType: 'Knowledge Ladder',
    challengeType: 'Multi-Step Knowledge Challenge',
    isKnowledgeLadder: true,
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: '🪜 KNOWLEDGE LADDER [+20 PTS & ADVANCE +3 BLOCKS!]: Siliguri is the southern terminus of which world-famous 2-foot narrow gauge mountain railway built in 1881, acclaimed as a UNESCO World Heritage marvel?',
    options: {
      A: 'Darjeeling Himalayan Railway (Toy Train)',
      B: 'Kalka-Shimla Railway',
      C: 'Nilgiri Mountain Railway',
      D: 'Matheran Hill Railway'
    },
    correctAnswer: 'A',
    explanation: 'The Darjeeling Himalayan Railway climbs from New Jalpaiguri/Siliguri through loops and zigzags to Ghum and Darjeeling! +20 Points and Climb 3 Blocks forward!',
    basePoints: 20,
    points: 20
  },

  // =========================================================================
  // 5. MYTH / MISINFORMATION TRAP (TRUE OR FALSE? -2 Blocks Backward Penalty on Error!)
  // Blocks: 24 (Nashik), 53 (Patna), 75 (Shimla)
  // =========================================================================

  // Block 24: Nashik
  {
    id: 'sc-24-trap-01',
    locationId: 24,
    locationName: 'Nashik',
    category: 'Heritage',
    blockType: 'Myth/Misinformation Trap',
    challengeType: 'True or False Trap',
    isMythTrap: true,
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: '⚠️ MYTH TRAP: "The Godavari River, known as the Dakshin Ganga, originates from the Western Ghats at Brahmagiri Mountain near Trimbakeshwar in Nashik." Is this statement TRUE or FALSE?',
    options: {
      A: 'TRUE',
      B: 'FALSE',
      C: 'Partially True, originates in Vindhyas',
      D: 'Neither True nor False'
    },
    correctAnswer: 'A',
    explanation: 'TRUE! The sacred Godavari River indeed originates at Trimbakeshwar atop the Brahmagiri hills in Nashik before flowing across peninsular India to the Bay of Bengal. Safe passage!',
    basePoints: 10,
    points: 10
  },
  {
    id: 'sc-24-trap-02',
    locationId: 24,
    locationName: 'Nashik',
    category: 'History',
    blockType: 'Myth/Misinformation Trap',
    challengeType: 'True or False Trap',
    isMythTrap: true,
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '⚠️ MYTH TRAP: "The city of Nashik was founded by the British East India Company in the 1850s to serve as a tea plantation colony." Is this statement TRUE or FALSE?',
    options: {
      A: 'FALSE',
      B: 'TRUE',
      C: 'True, founded by Lord Dalhousie',
      D: 'True, during the 1857 movement'
    },
    correctAnswer: 'A',
    explanation: 'FALSE! Nashik is an ancient city dating back thousands of years; mentioned in the Ramayana as Panchavati where Lord Rama spent his exile, and an ancient Satavahana center! Beware traps!',
    basePoints: 10,
    points: 10
  },

  // Block 53: Patna
  {
    id: 'sc-53-trap-01',
    locationId: 53,
    locationName: 'Patna',
    category: 'History',
    blockType: 'Myth/Misinformation Trap',
    challengeType: 'True or False Trap',
    isMythTrap: true,
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '⚠️ MYTH TRAP: "Ancient Pataliputra (modern Patna) was the imperial capital of both the Mauryan Empire under Emperor Ashoka and the Golden Age of the Gupta Empire." Is this statement TRUE or FALSE?',
    options: {
      A: 'TRUE',
      B: 'FALSE',
      C: 'False, capital was Ujjain',
      D: 'False, capital was Taxila'
    },
    correctAnswer: 'A',
    explanation: 'TRUE! Pataliputra on the confluence of the Ganga and Son rivers served as the imperial capital for both the Mauryan dynasty and the Gupta Empire! Safe passage!',
    basePoints: 10,
    points: 10
  },
  {
    id: 'sc-53-trap-02',
    locationId: 53,
    locationName: 'Patna',
    category: 'Heritage',
    blockType: 'Myth/Misinformation Trap',
    challengeType: 'True or False Trap',
    isMythTrap: true,
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: '⚠️ MYTH TRAP: "The famous massive beehive-shaped granary in Patna called \'Golghar\' was built with internal stone pillars supporting its 29-meter brick dome." Is this statement TRUE or FALSE?',
    options: {
      A: 'FALSE',
      B: 'TRUE',
      C: 'True, with 12 granite pillars',
      D: 'True, reinforced by iron pillars'
    },
    correctAnswer: 'A',
    explanation: 'FALSE! Golghar, built in 1786 by Captain John Garstin, is celebrated specifically for being completely PILLARLESS; its hemispherical dome has zero interior pillars! Watch out for misinformation!',
    basePoints: 10,
    points: 10
  },

  // Block 75: Shimla
  {
    id: 'sc-75-trap-01',
    locationId: 75,
    locationName: 'Shimla',
    category: 'History',
    blockType: 'Myth/Misinformation Trap',
    challengeType: 'True or False Trap',
    isMythTrap: true,
    difficulty: 'medium',
    difficultyLevel: 'MEDIUM',
    question: '⚠️ MYTH TRAP: "Shimla was officially declared the official Summer Capital of British India in 1864 by Viceroy Sir John Lawrence." Is this statement TRUE or FALSE?',
    options: {
      A: 'TRUE',
      B: 'FALSE',
      C: 'False, it was Darjeeling',
      D: 'False, it happened in 1911'
    },
    correctAnswer: 'A',
    explanation: 'TRUE! Sir John Lawrence officially made Shimla the summer capital in 1864, shifting the entire imperial government from Calcutta each summer. Safe passage!',
    basePoints: 10,
    points: 10
  },
  {
    id: 'sc-75-trap-02',
    locationId: 75,
    locationName: 'Shimla',
    category: 'Monuments',
    blockType: 'Myth/Misinformation Trap',
    challengeType: 'True or False Trap',
    isMythTrap: true,
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '⚠️ MYTH TRAP: "The historic Viceregal Lodge atop Observatory Hill in Shimla was constructed entirely of Himalayan deodar pine wood without any stone." Is this statement TRUE or FALSE?',
    options: {
      A: 'FALSE',
      B: 'TRUE',
      C: 'True, only unpolished timber',
      D: 'True, zero stone quarrying'
    },
    correctAnswer: 'A',
    explanation: 'FALSE! The Viceregal Lodge (now the Indian Institute of Advanced Study) was built in Scottish baronial style using local grey sandstone and light blue limestone with walnut woodwork interior! Avoid the trap!',
    basePoints: 10,
    points: 10
  },

  // =========================================================================
  // 6. GOLDEN HERITAGE (Double Challenge Points! High Difficulty!)
  // Blocks: 15 (Hampi), 22 (Ajanta), 37 (Sanchi), 41 (Agra), 58 (Konark), 73 (Amritsar)
  // =========================================================================

  // Block 15: Hampi
  {
    id: 'sc-15-golden-01',
    locationId: 15,
    locationName: 'Hampi',
    category: 'Monuments',
    blockType: 'Golden Heritage',
    challengeType: 'Golden Heritage Expert',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '👑 GOLDEN HERITAGE [DOUBLE POINTS!]: Inside Hampi’s Vijaya Vittala Temple complex, the Ranga Mandapa features 56 monolithic granite pillars that produce musical notes when struck. What are these acoustic wonders called?',
    options: {
      A: 'SaReGaMa Musical Pillars',
      B: 'Kalyana Mandapa Chimes',
      C: 'Vittala Resonance Tubes',
      D: 'Tungabhadra Bells'
    },
    correctAnswer: 'A',
    explanation: 'The musical pillars of Vittala Temple at Hampi resonate with the seven basic musical notes (swaras) of classical Indian music! DOUBLE POINTS AWARDED!',
    basePoints: 30,
    points: 30
  },
  {
    id: 'sc-15-golden-02',
    locationId: 15,
    locationName: 'Hampi',
    category: 'History',
    blockType: 'Golden Heritage',
    challengeType: 'Golden Heritage Expert',
    difficulty: 'expert',
    difficultyLevel: 'EXPERT',
    question: '👑 GOLDEN HERITAGE [DOUBLE POINTS!]: The Portuguese traveler Domingo Paes visited Vijayanagara (Hampi) in 1520 during the reign of which greatest ruler, describing the metropolis as rivaling Rome in size and prosperity?',
    options: {
      A: 'Emperor Sri Krishnadevaraya',
      B: 'Harihara I',
      C: 'Bukka Raya I',
      D: 'Achyuta Deva Raya'
    },
    correctAnswer: 'A',
    explanation: 'Emperor Sri Krishnadevaraya of the Tuluva dynasty led Vijayanagara to its zenith of wealth, arts, literature, and imperial grandeur! DOUBLE POINTS AWARDED!',
    basePoints: 30,
    points: 30
  },

  // Block 22: Ajanta
  {
    id: 'sc-22-golden-01',
    locationId: 22,
    locationName: 'Ajanta',
    category: 'Art',
    blockType: 'Golden Heritage',
    challengeType: 'Golden Heritage Expert',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '👑 GOLDEN HERITAGE [DOUBLE POINTS!]: Inside Cave 1 of Ajanta, which world-famous 5th-century Gupta-Vakataka fresco painting portrays a serene Bodhisattva holding a blue lotus blossom with lowered eyes?',
    options: {
      A: 'Bodhisattva Padmapani',
      B: 'Bodhisattva Vajrapani',
      C: 'Maitreya Bodhisattva',
      D: 'Avalokiteshwara the Sailor'
    },
    correctAnswer: 'A',
    explanation: 'The mural of Bodhisattva Padmapani in Cave 1 is recognized as the supreme pinnacle of ancient classical Indian fresco painting! DOUBLE POINTS AWARDED!',
    basePoints: 30,
    points: 30
  },

  // Block 37: Sanchi
  {
    id: 'sc-37-golden-01',
    locationId: 37,
    locationName: 'Sanchi',
    category: 'Heritage',
    blockType: 'Golden Heritage',
    challengeType: 'Golden Heritage Expert',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '👑 GOLDEN HERITAGE [DOUBLE POINTS!]: The Great Stupa at Sanchi is encircled by four elaborately sculpted ceremonial stone gateways called "Toranas". What do their carvings primarily depict?',
    options: {
      A: 'Jataka tales of Buddha’s previous lives and miraculous episodes from Gautama Buddha’s life',
      B: 'War chronicles of Alexander the Great',
      C: 'Astronomical charts of Chandragupta Maurya',
      D: 'Vedic sacrificial hymns in Prakrit script'
    },
    correctAnswer: 'A',
    explanation: 'The four Toranas at Sanchi, carved by ivory workers of Vidisha in the 1st century BCE, depict Jataka tales with exquisite flora and fauna! DOUBLE POINTS AWARDED!',
    basePoints: 30,
    points: 30
  },

  // Block 41: Agra
  {
    id: 'sc-41-golden-01',
    locationId: 41,
    locationName: 'Agra',
    category: 'Monuments',
    blockType: 'Golden Heritage',
    challengeType: 'Golden Heritage Expert',
    difficulty: 'expert',
    difficultyLevel: 'EXPERT',
    question: '👑 GOLDEN HERITAGE [DOUBLE POINTS!]: The exquisite decorative art technique used on the white Makrana marble of the Taj Mahal, inlaying semi-precious stones (like lapis lazuli, jade, and carnelian) into delicate floral arabesques, is called:',
    options: {
      A: 'Pietra Dura (Parchin Kari)',
      B: 'Meenakari',
      C: 'Bidriware',
      D: 'Tarkashi'
    },
    correctAnswer: 'A',
    explanation: 'Parchin Kari (or Pietra Dura) involves cutting precious and semi-precious stones into microscopic petals and embedding them into marble beds. DOUBLE POINTS AWARDED!',
    basePoints: 30,
    points: 30
  },

  // Block 58: Konark
  {
    id: 'sc-58-golden-01',
    locationId: 58,
    locationName: 'Konark',
    category: 'Monuments',
    blockType: 'Golden Heritage',
    challengeType: 'Golden Heritage Expert',
    difficulty: 'hard',
    difficultyLevel: 'HARD',
    question: '👑 GOLDEN HERITAGE [DOUBLE POINTS!]: The 24 colossal carved stone wheels of the Sun Temple at Konark are not merely decorative; how do their eight major spokes function?',
    options: {
      A: 'As precise solar sundials that calculate the exact time of day based on the sun’s shadow',
      B: 'As astrological zodiac compasses to track eclipses',
      C: 'As water wheels that pumped seawater to the temple garden',
      D: 'As musical gongs struck during temple aarti'
    },
    correctAnswer: 'A',
    explanation: 'The 24 wheels of Konark represent the hours of the day, and their spokes cast shadows that tell time down to minutes! DOUBLE POINTS AWARDED!',
    basePoints: 30,
    points: 30
  },

  // Block 73: Amritsar
  {
    id: 'sc-73-golden-01',
    locationId: 73,
    locationName: 'Amritsar',
    category: 'Heritage',
    blockType: 'Golden Heritage',
    challengeType: 'Golden Heritage Expert',
    difficulty: 'expert',
    difficultyLevel: 'EXPERT',
    question: '👑 GOLDEN HERITAGE [DOUBLE POINTS!]: Who was the revered Sufi saint of Lahore invited by Guru Arjan Dev Ji in December 1588 to lay the foundation stone of Sri Harmandir Sahib (Golden Temple) in Amritsar?',
    options: {
      A: 'Hazrat Mian Mir',
      B: 'Nizamuddin Auliya',
      C: 'Baba Farid',
      D: 'Khwaja Moinuddin Chishti'
    },
    correctAnswer: 'A',
    explanation: 'Guru Arjan Dev Ji invited the Sufi saint Hazrat Mian Mir to lay the foundation stone of Harmandir Sahib, symbolizing universal brotherhood! DOUBLE POINTS AWARDED!',
    basePoints: 30,
    points: 30
  },

  // =========================================================================
  // 7. FINAL MILESTONE (Block 80: Ladakh) [Expert]
  // =========================================================================
  {
    id: 'sc-80-final-01',
    locationId: 80,
    locationName: 'Ladakh',
    category: 'Heritage',
    blockType: 'Final',
    challengeType: 'Ultimate Bharat Yatra Mastery',
    difficulty: 'expert',
    difficultyLevel: 'EXPERT',
    question: '🏆 FINAL MILESTONE 80 — LADAKH: At 19,024 feet, which mountain pass in Ladakh was recognized by Guinness World Records as the highest motorable paved road pass in the world?',
    options: {
      A: 'Umling La Pass',
      B: 'Khardung La Pass',
      C: 'Chang La Pass',
      D: 'Zoji La Pass'
    },
    correctAnswer: 'A',
    explanation: 'Constructed by the Border Roads Organisation (Project Himank) in Eastern Ladakh, Umling La Pass reaches an astonishing 19,024 feet! Congratulations on completing Bharat Yatra!',
    basePoints: 50,
    points: 50
  },
  {
    id: 'sc-80-final-02',
    locationId: 80,
    locationName: 'Ladakh',
    category: 'History',
    blockType: 'Final',
    challengeType: 'Ultimate Bharat Yatra Mastery',
    difficulty: 'expert',
    difficultyLevel: 'EXPERT',
    question: '🏆 FINAL MILESTONE 80 — LADAKH: Which ancient Trans-Himalayan trade highway linked Ladakh, Central Asia, and Tibet, carrying pashmina wool, silk, and spices for millennia?',
    options: {
      A: 'The Ancient Silk Road and Treaty High Road',
      B: 'Grand Trunk Road',
      C: 'Dakshinapatha Highway',
      D: 'Uttarapatha Route'
    },
    correctAnswer: 'A',
    explanation: 'Leh was the pivotal crossroads of the historic Silk Road feeder routes between Yarkand, Kashgar, Tibet, and India! You have mastered the Bharat Yatra journey!',
    basePoints: 50,
    points: 50
  }
];

/**
 * Maps block type to its intended difficulty level
 */
export function getDefaultDifficultyForBlock(blockType: SpecialBlockType, locationId?: number): DifficultyLevel {
  if (locationId === 80 || blockType === 'Final') {
    return 'EXPERT';
  }
  switch (blockType) {
    case 'Normal':
      return 'EASY';
    case 'Festival Challenge':
      return 'MEDIUM';
    case 'Culture Challenge':
    case 'Heritage Challenge':
    case 'Knowledge Ladder':
    case 'Myth/Misinformation Trap':
      return 'HARD';
    case 'Heritage Hunt':
      return 'HARD';
    case 'Golden Heritage':
      return 'EXPERT';
    default:
      return 'MEDIUM';
  }
}

/**
 * Universal Question & Challenge Engine
 * Conceptually: getChallenge({ locationId, category, blockType, difficulty })
 *
 * Randomly selects from the valid pool based on:
 * location + category + blockType + difficulty
 * Prevents repetition by tracking previously used question IDs.
 */
export function getChallenge({
  locationId,
  category,
  blockType,
  difficulty,
  previouslyUsedIds = []
}: {
  locationId: number;
  category?: CategoryType;
  blockType?: SpecialBlockType;
  difficulty?: DifficultyLevel;
  previouslyUsedIds?: string[];
}): Question {
  const loc = LOCATIONS_DATA.find((l) => l.id === locationId) || LOCATIONS_DATA[0];
  const effectiveBlockType = blockType || loc.specialBlock || 'Normal';
  const effectiveDifficulty = difficulty || getDefaultDifficultyForBlock(effectiveBlockType);

  // 1. If special block, check if there are specialized challenges in SPECIAL_CHALLENGES_BANK
  if (effectiveBlockType !== 'Normal' && effectiveBlockType !== 'Heritage Hunt') {
    const specialCandidates = SPECIAL_CHALLENGES_BANK.filter(
      (q) => q.locationId === locationId || (q.blockType === effectiveBlockType && q.locationId === locationId)
    );

    if (specialCandidates.length > 0) {
      // Filter out previously used IDs
      const unused = specialCandidates.filter((q) => !previouslyUsedIds.includes(q.id));
      const pool = unused.length > 0 ? unused : specialCandidates;
      const picked = pool[Math.floor(Math.random() * pool.length)];

      // Attach difficulty info
      return {
        ...picked,
        difficultyLevel: effectiveDifficulty,
        blockType: effectiveBlockType
      };
    }
  }

  // 2. Otherwise, check QUESTIONS_BANK for questions matching locationId
  const locQuestions = QUESTIONS_BANK.filter((q) => q.locationId === locationId);

  if (locQuestions.length > 0) {
    // Try matching category
    let candidates = category
      ? locQuestions.filter((q) => q.category === category)
      : locQuestions;

    if (candidates.length === 0) {
      candidates = locQuestions; // Fall back to same location
    }

    // Filter out previously used
    const unused = candidates.filter((q) => !previouslyUsedIds.includes(q.id));
    const pool = unused.length > 0 ? unused : candidates;
    const picked = pool[Math.floor(Math.random() * pool.length)];

    return {
      ...picked,
      difficultyLevel: effectiveDifficulty,
      blockType: effectiveBlockType
    };
  }

  // 3. Fallback safe generation for this specific location
  return {
    id: `loc-${locationId}-safe-${Date.now()}`,
    locationId,
    locationName: loc.city,
    category: category || loc.questionCategory,
    question: `Which celebrated heritage landmark is located at ${loc.city}, ${loc.state}?`,
    options: {
      A: loc.heritageSite,
      B: 'Historic Gateway Arch',
      C: 'Ancient Mountain Citadel',
      D: 'Coastal Maritime Sanctuary'
    },
    correctAnswer: 'A',
    explanation: `${loc.heritageSite} in ${loc.city}, ${loc.state} is renowned for: ${loc.description}`,
    difficultyLevel: effectiveDifficulty,
    difficulty: effectiveDifficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
    blockType: effectiveBlockType,
    basePoints: effectiveBlockType === 'Golden Heritage' ? 30 : 10,
    points: effectiveBlockType === 'Golden Heritage' ? 30 : 10
  };
}

import { Question, CategoryType, SpecialBlockType, DifficultyLevel, QuestionOptionItem } from '../types/game';
import { LOCATIONS_DATA } from '../data/locations';
import { QUESTIONS_BANK } from '../data/questions';
import { SPECIAL_CHALLENGES_BANK, getDefaultDifficultyForBlock } from '../data/specialChallenges';

/**
 * Real Unbiased Fisher-Yates Shuffle
 * Ensures equal 25% probability across positions A, B, C, D.
 */
export function shuffleArray<T>(items: readonly T[] | T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
 * Transforms any raw question by:
 * 1. Extracting the 4 options with stable IDs and their `isCorrect` status
 * 2. Performing Fisher-Yates shuffle
 * 3. Mapping index 0 -> 'A', 1 -> 'B', 2 -> 'C', 3 -> 'D'
 * 4. Calculating the newly displayed correct letter ('A' | 'B' | 'C' | 'D')
 * 5. Returning an immutable Question instance that will NOT reshuffle on re-render.
 */
export function prepareQuestionWithOptionsShuffle(question: Question): Question {
  // If already prepared and optionItems exist, preserve it so it never shifts during renders
  if (question.optionItems && question.optionItems.length === 4 && question.correctAnswerId) {
    return question;
  }

  const origA = question.options.A;
  const origB = question.options.B;
  const origC = question.options.C;
  const origD = question.options.D;

  const rawOptions: QuestionOptionItem[] = [
    {
      id: `${question.id}-opt-a`,
      text: origA,
      isCorrect: question.correctAnswer === 'A'
    },
    {
      id: `${question.id}-opt-b`,
      text: origB,
      isCorrect: question.correctAnswer === 'B'
    },
    {
      id: `${question.id}-opt-c`,
      text: origC,
      isCorrect: question.correctAnswer === 'C'
    },
    {
      id: `${question.id}-opt-d`,
      text: origD,
      isCorrect: question.correctAnswer === 'D'
    }
  ];

  // Run real Fisher-Yates shuffle
  const shuffled = shuffleArray(rawOptions);

  // Find where the correct option landed
  let correctIndex = shuffled.findIndex((opt) => opt.isCorrect);
  if (correctIndex === -1) {
    // Failsafe fallback if data had unexpected format
    shuffled[0].isCorrect = true;
    correctIndex = 0;
  }

  const optionLetters: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  const correctLetter = optionLetters[correctIndex];
  const correctAnswerId = shuffled[correctIndex].id;

  return {
    ...question,
    options: {
      A: shuffled[0].text,
      B: shuffled[1].text,
      C: shuffled[2].text,
      D: shuffled[3].text
    },
    correctAnswer: correctLetter,
    correctAnswerId,
    optionItems: shuffled
  };
}

/**
 * State-level Cultural & Geographic Encyclopedia for accurate dynamic question synthesis
 * when a location does not have a pre-authored handcrafted question for a rare category.
 */
interface StateCulturalProfile {
  dance: { correct: string; options: [string, string, string] };
  food: { correct: string; options: [string, string, string] };
  festival: { correct: string; options: [string, string, string] };
  art: { correct: string; options: [string, string, string] };
  dynasty: { correct: string; options: [string, string, string] };
}

const STATE_PROFILES: Record<string, StateCulturalProfile> = {
  'Tamil Nadu': {
    dance: { correct: 'Bharatanatyam', options: ['Kathakali', 'Odissi', 'Kathak'] },
    food: { correct: 'Madras Filter Kaapi & Idli Sambar', options: ['Puran Poli', 'Litti Chokha', 'Makki Roti'] },
    festival: { correct: 'Pongal (Harvest Thanksgiving)', options: ['Baisakhi', 'Onam', 'Bihu'] },
    art: { correct: 'Tanjore Gold Foil Relief Painting', options: ['Madhubani', 'Warli', 'Phad'] },
    dynasty: { correct: 'Chola, Pallava, and Pandya Empires', options: ['Pala Dynasty', 'Solanki Dynasty', 'Ahom Dynasty'] }
  },
  'Kerala': {
    dance: { correct: 'Kathakali and Mohiniyattam', options: ['Garba', 'Bhangra', 'Kuchipudi'] },
    food: { correct: 'Appam with Stew & Kerala Sadya on banana leaf', options: ['Dal Baati Churma', 'Pav Bhaji', 'Dhokla'] },
    festival: { correct: 'Onam and Vishu festivals', options: ['Ganesh Chaturthi', 'Durga Puja', 'Lohri'] },
    art: { correct: 'Aranmula Kannadi & Kerala Temple Murals', options: ['Pattachitra', 'Kalamkari', 'Aipan'] },
    dynasty: { correct: 'Chera Dynasty & Kingdom of Travancore', options: ['Sikh Empire', 'Rashtrakuta Dynasty', 'Maurya Empire'] }
  },
  'Karnataka': {
    dance: { correct: 'Yakshagana theatrical dance', options: ['Manipuri', 'Chhau', 'Sattriya'] },
    food: { correct: 'Bisi Bele Bath & Mysore Pak', options: ['Rosogolla', 'Vada Pav', 'Kachori'] },
    festival: { correct: 'Mysuru Dasara & Karaga Utsav', options: ['Chhath Puja', 'Bihu', 'Hornbill'] },
    art: { correct: 'Mysore Inlay Woodwork & Bidriware', options: ['Kalighat', 'Warli', 'Madhubani'] },
    dynasty: { correct: 'Vijayanagara Empire, Chalukyas, and Hoysalas', options: ['Pala Empire', 'Mughal Empire', 'Chola Empire'] }
  },
  'Andhra Pradesh': {
    dance: { correct: 'Kuchipudi classical dance', options: ['Kathakali', 'Sattriya', 'Ghoomar'] },
    food: { correct: 'Pootharekulu & Andhra Gongura Pachadi', options: ['Khandvi', 'Misal', 'Poha'] },
    festival: { correct: 'Ugadi (Telugu New Year) & Brahmotsavam', options: ['Onam', 'Lohri', 'Baisakhi'] },
    art: { correct: 'Kalamkari hand-painted cotton textiles', options: ['Phulkari', 'Tanjore Art', 'Bandhani'] },
    dynasty: { correct: 'Satavahana, Kakatiya, and Eastern Chalukya dynasties', options: ['Karkota Dynasty', 'Ahom Empire', 'Dogra Dynasty'] }
  },
  'Telangana': {
    dance: { correct: 'Perini Sivatandavam warrior dance', options: ['Garba', 'Kathak', 'Manipuri'] },
    food: { correct: 'Hyderabadi Dum Biryani & Haleem', options: ['Dal Makhani', 'Pav Bhaji', 'Dhokla'] },
    festival: { correct: 'Bathukamma floral festival & Bonalu', options: ['Durga Puja', 'Pongal', 'Chhath'] },
    art: { correct: 'Cheriyal scroll painting & Dokra metal craft', options: ['Pattachitra', 'Warli', 'Thangka'] },
    dynasty: { correct: 'Kakatiya Dynasty & Qutb Shahi Sultanate', options: ['Chola Empire', 'Pala Dynasty', 'Solanki Dynasty'] }
  },
  'Maharashtra': {
    dance: { correct: 'Lavani folk dance and Lezim', options: ['Bihu', 'Bhangra', 'Odissi'] },
    food: { correct: 'Misal Pav & Puran Poli', options: ['Makki di Roti', 'Idli Podi', 'Litti Chokha'] },
    festival: { correct: 'Ganesh Chaturthi festival of Lord Ganesha', options: ['Onam', 'Baisakhi', 'Hornbill'] },
    art: { correct: 'Warli tribal folk painting', options: ['Madhubani', 'Tanjore', 'Pattachitra'] },
    dynasty: { correct: 'Maratha Empire under Chhatrapati Shivaji Maharaj', options: ['Chola Empire', 'Ahom Dynasty', 'Pala Empire'] }
  },
  'Goa': {
    dance: { correct: 'Fugdi and Dhalo traditional folk dances', options: ['Kathak', 'Ghoomar', 'Bhangra'] },
    food: { correct: 'Goan Fish Curry & Bebinca layered dessert', options: ['Dhokla', 'Dal Baati', 'Dosa'] },
    festival: { correct: 'Shigmo Spring Festival and Goa Carnival', options: ['Chhath Puja', 'Baisakhi', 'Bihu'] },
    art: { correct: 'Azulejos Portuguese-style hand-painted ceramic tiles', options: ['Warli', 'Pattachitra', 'Phad'] },
    dynasty: { correct: 'Kadamba Dynasty and Portuguese maritime colonial era', options: ['Ahom Empire', 'Karkota Dynasty', 'Sikh Empire'] }
  },
  'Gujarat': {
    dance: { correct: 'Garba and Dandiya Raas', options: ['Kathakali', 'Chhau', 'Lavani'] },
    food: { correct: 'Dhokla, Thepla, and Gujarati Thali', options: ['Bisi Bele Bath', 'Makki Roti', 'Litti Chokha'] },
    festival: { correct: 'Navratri Garba Nights and Rann Utsav', options: ['Onam', 'Pongal', 'Bihu'] },
    art: { correct: 'Rogan textile painting of Kutch & Patola weaving', options: ['Madhubani', 'Kalighat', 'Tanjore'] },
    dynasty: { correct: 'Solanki (Chaulukya) dynasty & ancient Harappan ports', options: ['Chera Dynasty', 'Pala Empire', 'Pandya Dynasty'] }
  },
  'Rajasthan': {
    dance: { correct: 'Ghoomar and Kalbelia folk dance', options: ['Kathakali', 'Sattriya', 'Yakshagana'] },
    food: { correct: 'Dal Baati Churma & Ker Sangri', options: ['Appam', 'Pav Bhaji', 'Pitha'] },
    festival: { correct: 'Pushkar Camel Fair and Desert Festival', options: ['Durga Puja', 'Onam', 'Baisakhi'] },
    art: { correct: 'Phad scroll painting & Pichwai of Nathdwara', options: ['Warli', 'Pattachitra', 'Cheriyal'] },
    dynasty: { correct: 'Rajput clans (Sisodias, Rathores, Kachwahas)', options: ['Chola Empire', 'Ahom Dynasty', 'Pala Empire'] }
  },
  'Delhi': {
    dance: { correct: 'Kathak classical dance performances', options: ['Yakshagana', 'Mohiniyattam', 'Garba'] },
    food: { correct: 'Old Delhi Nihari, Paranthe, and Chhole Bhature', options: ['Appam Stew', 'Dhokla', 'Bisi Bele Bath'] },
    festival: { correct: 'Phool Walon Ki Sair & Republic Day Cultural Pageant', options: ['Pongal', 'Bihu', 'Hornbill'] },
    art: { correct: 'Mughal Miniature painting and Zardozi embroidery', options: ['Warli', 'Madhubani', 'Tanjore'] },
    dynasty: { correct: 'Delhi Sultanate, Tomar Rajputs, and Mughal Empire', options: ['Chera Dynasty', 'Vijayanagara Empire', 'Pala Empire'] }
  },
  'Uttar Pradesh': {
    dance: { correct: 'Kathak classical dance of Lucknow Gharana', options: ['Odissi', 'Kuchipudi', 'Chhau'] },
    food: { correct: 'Awadhi Dum Biryani, Galouti Kebab, and Agra Petha', options: ['Idli Sambar', 'Dhokla', 'Misal Pav'] },
    festival: { correct: 'Kumbh Mela, Dev Deepawali, and Lathmar Holi', options: ['Onam', 'Baisakhi', 'Hornbill'] },
    art: { correct: 'Lucknowi Chikankari & Banarasi Silk brocade', options: ['Warli', 'Pattachitra', 'Dokra'] },
    dynasty: { correct: 'Mauryas, Guptas, and Nawabs of Awadh', options: ['Chola Dynasty', 'Ahom Dynasty', 'Chera Dynasty'] }
  },
  'Bihar': {
    dance: { correct: 'Bidesia and Jhijhiya folk dance', options: ['Kathakali', 'Garba', 'Bhangra'] },
    food: { correct: 'Litti Chokha with roasted sattu', options: ['Dhokla', 'Pav Bhaji', 'Dosa'] },
    festival: { correct: 'Chhath Puja dedicated to the Sun God (Surya)', options: ['Onam', 'Pongal', 'Baisakhi'] },
    art: { correct: 'Madhubani (Mithila) folk painting', options: ['Tanjore Art', 'Warli Art', 'Phad Art'] },
    dynasty: { correct: 'Magadha Empire, Mauryan Empire, and Pala Dynasty', options: ['Chola Dynasty', 'Maratha Empire', 'Vijayanagara'] }
  },
  'West Bengal': {
    dance: { correct: 'Gaudiya Nritya and Purulia Chhau masked dance', options: ['Kathakali', 'Ghoomar', 'Yakshagana'] },
    food: { correct: 'Rosogolla, Shorshe Ilish, and Sandesh', options: ['Dhokla', 'Dal Baati', 'Vada Pav'] },
    festival: { correct: 'Durga Puja (UNESCO Intangible Cultural Heritage)', options: ['Pongal', 'Onam', 'Lohri'] },
    art: { correct: 'Kalighat painting and Bankura Terracotta horse craft', options: ['Warli', 'Tanjore Art', 'Pichwai'] },
    dynasty: { correct: 'Pala Dynasty and Sena Dynasty', options: ['Rashtrakuta Dynasty', 'Chola Empire', 'Western Chalukya'] }
  },
  'Odisha': {
    dance: { correct: 'Odissi classical dance and Gotipua', options: ['Kathakali', 'Bhangra', 'Garba'] },
    food: { correct: 'Chhena Poda and Dalma', options: ['Puran Poli', 'Makki Roti', 'Litti Chokha'] },
    festival: { correct: 'Rath Yatra of Lord Jagannath in Puri', options: ['Onam', 'Pongal', 'Baisakhi'] },
    art: { correct: 'Pattachitra palm-leaf art & Silver Filigree (Tarakasi)', options: ['Warli', 'Madhubani', 'Aipan'] },
    dynasty: { correct: 'Kalinga Empire and Eastern Ganga Dynasty', options: ['Chola Empire', 'Sikh Empire', 'Pala Dynasty'] }
  },
  'Madhya Pradesh': {
    dance: { correct: 'Matki and Karma tribal folk dances', options: ['Kathakali', 'Manipuri', 'Yakshagana'] },
    food: { correct: 'Indori Poha-Jalebi & Bhutte Ka Kees', options: ['Appam Stew', 'Vada Pav', 'Rosogolla'] },
    festival: { correct: 'Khajuraho Dance Festival & Tansen Sangeet Samaroh', options: ['Durga Puja', 'Pongal', 'Baisakhi'] },
    art: { correct: 'Gond tribal art & Chanderi sari weaving', options: ['Tanjore Art', 'Kalighat Art', 'Phad Art'] },
    dynasty: { correct: 'Chandela Dynasty, Paramaras, and Scindias', options: ['Chera Dynasty', 'Ahom Empire', 'Pala Empire'] }
  },
  'Punjab': {
    dance: { correct: 'Bhangra and Giddha energetic folk dance', options: ['Kathakali', 'Odissi', 'Mohiniyattam'] },
    food: { correct: 'Makki di Roti with Sarson da Saag & Amritsari Kulcha', options: ['Idli Sambar', 'Puran Poli', 'Dhokla'] },
    festival: { correct: 'Baisakhi harvest celebration and Lohri', options: ['Onam', 'Pongal', 'Chhath Puja'] },
    art: { correct: 'Phulkari floral geometric embroidery', options: ['Madhubani', 'Warli', 'Pattachitra'] },
    dynasty: { correct: 'Sikh Empire under Maharaja Ranjit Singh', options: ['Chola Dynasty', 'Rashtrakuta', 'Pala Empire'] }
  },
  'Himachal Pradesh': {
    dance: { correct: 'Nati folk dance of Kullu', options: ['Kathakali', 'Garba', 'Bhangra'] },
    food: { correct: 'Himachali Dham feast & Siddu stuffed bread', options: ['Pav Bhaji', 'Dhokla', 'Dosa'] },
    festival: { correct: 'Kullu Dussehra weeklong congregation of deities', options: ['Durga Puja', 'Pongal', 'Onam'] },
    art: { correct: 'Chamba Rumal double-sided silk embroidery', options: ['Warli', 'Madhubani', 'Tanjore'] },
    dynasty: { correct: 'Katoch Dynasty of Kangra & Himalayan Hill States', options: ['Chola Empire', 'Ahom Dynasty', 'Pala Empire'] }
  },
  'Jammu & Kashmir': {
    dance: { correct: 'Rouf and Hafiza traditional Kashmiri dances', options: ['Garba', 'Yakshagana', 'Chhau'] },
    food: { correct: 'Kashmiri Wazwan & Saffron Kahwa green tea', options: ['Dal Baati', 'Misal Pav', 'Idli Sambar'] },
    festival: { correct: 'Tulip Festival & Shikara Festival on Dal Lake', options: ['Pongal', 'Chhath Puja', 'Baisakhi'] },
    art: { correct: 'Pashmina shawl weaving and Walnut wood carving', options: ['Warli', 'Madhubani', 'Dokra'] },
    dynasty: { correct: 'Karkota Dynasty, Shah Mir Dynasty, and Dogra rulers', options: ['Chola Empire', 'Ahom Empire', 'Pala Empire'] }
  },
  'Ladakh': {
    dance: { correct: 'Cham masked monastic Buddhist dance', options: ['Kathak', 'Bhangra', 'Garba'] },
    food: { correct: 'Thukpa noodle soup, Momos, and Butter Tea (Gur Gur)', options: ['Dosa', 'Dhokla', 'Puran Poli'] },
    festival: { correct: 'Hemis Monastery Festival honoring Guru Padmasambhava', options: ['Onam', 'Pongal', 'Baisakhi'] },
    art: { correct: 'Thangka Buddhist scroll paintings & Tibetan metalwork', options: ['Madhubani', 'Warli', 'Tanjore'] },
    dynasty: { correct: 'Namgyal Dynasty of Ladakh Kingdom', options: ['Chola Empire', 'Pala Empire', 'Chera Dynasty'] }
  },
  'Assam': {
    dance: { correct: 'Bihu dance and classical Sattriya dance', options: ['Kathakali', 'Garba', 'Yakshagana'] },
    food: { correct: 'Masor Tenga (tangy fish curry) and Pitha rice cakes', options: ['Dal Baati', 'Vada Pav', 'Dhokla'] },
    festival: { correct: 'Rongali Bihu spring celebration', options: ['Onam', 'Pongal', 'Baisakhi'] },
    art: { correct: 'Golden Muga Silk weaving & Bell metal craft of Sarthebari', options: ['Warli', 'Madhubani', 'Aipan'] },
    dynasty: { correct: 'Ahom Dynasty which ruled Assam for 600 years', options: ['Chola Empire', 'Maratha Empire', 'Pala Empire'] }
  }
};

/**
 * Fallback cultural profile for other regions
 */
const DEFAULT_PROFILE: StateCulturalProfile = {
  dance: { correct: 'Regional classical and folk dance heritage', options: ['Flamenco', 'Samba', 'Tap dance'] },
  food: { correct: 'Traditional local heritage cuisine and sweets', options: ['Sushi', 'Croissants', 'Tacos'] },
  festival: { correct: 'Regional cultural and seasonal harvest festivals', options: ['Oktoberfest', 'Mardi Gras', 'Carnival of Venice'] },
  art: { correct: 'Indigenous traditional handicrafts and textile arts', options: ['Modernist Cubism', 'Art Deco Glass', 'Pop Art'] },
  dynasty: { correct: 'Historic Indian kingdoms and regional dynasties', options: ['Roman Empire', 'Ottoman Empire', 'Tudor Dynasty'] }
};

function getStateProfile(state: string): StateCulturalProfile {
  return STATE_PROFILES[state] || DEFAULT_PROFILE;
}

/**
 * Synthesizes an authentic, location-and-category-locked Question
 * strictly matching the player's current location and selected category.
 */
export function generateSyntheticQuestionForLocation(
  locationId: number,
  category: CategoryType,
  difficulty: DifficultyLevel = 'MEDIUM'
): Question {
  const loc = LOCATIONS_DATA.find((l) => l.id === locationId) || LOCATIONS_DATA[0];
  const profile = getStateProfile(loc.state);

  const basePoints = difficulty === 'EXPERT' ? 30 : difficulty === 'HARD' ? 20 : 10;

  switch (category) {
    case 'History': {
      return {
        id: `synth-${loc.id}-history-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category: 'History',
        question: `In the historical annals of ${loc.city}, ${loc.state}, which regional kingdom or imperial legacy shaped its heritage at ${loc.heritageSite}?`,
        options: {
          A: profile.dynasty.correct,
          B: profile.dynasty.options[0],
          C: profile.dynasty.options[1],
          D: profile.dynasty.options[2]
        },
        correctAnswer: 'A',
        explanation: `${loc.city} in ${loc.state} has rich historical foundations associated with ${profile.dynasty.correct}. Key landmark: ${loc.heritageSite}.`,
        difficulty: difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        difficultyLevel: difficulty,
        basePoints,
        points: basePoints
      };
    }

    case 'Geography': {
      return {
        id: `synth-${loc.id}-geo-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category: 'Geography',
        question: `Geographically, in which Indian state is the historic destination of ${loc.city} (${loc.heritageSite}) located along the Bharat Yatra route?`,
        options: {
          A: loc.state,
          B: loc.state === 'Tamil Nadu' ? 'Punjab' : 'Tamil Nadu',
          C: loc.state === 'Rajasthan' ? 'Kerala' : 'Rajasthan',
          D: loc.state === 'Maharashtra' ? 'Assam' : 'Maharashtra'
        },
        correctAnswer: 'A',
        explanation: `${loc.city} is situated in ${loc.state}, known for ${loc.description}`,
        difficulty: 'easy',
        difficultyLevel: 'EASY',
        basePoints: 10,
        points: 10
      };
    }

    case 'Monuments':
    case 'Heritage': {
      return {
        id: `synth-${loc.id}-monument-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category,
        question: `Which celebrated monument and heritage landmark is the cultural jewel of ${loc.city}, ${loc.state}?`,
        options: {
          A: loc.heritageSite,
          B: 'Distant Coastal Lighthouse',
          C: 'Northern Glacial Watchtower',
          D: 'Western Frontier Bastion'
        },
        correctAnswer: 'A',
        explanation: `${loc.heritageSite} at ${loc.city}, ${loc.state}: ${loc.description}`,
        difficulty: difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        difficultyLevel: difficulty,
        basePoints,
        points: basePoints
      };
    }

    case 'Dance': {
      return {
        id: `synth-${loc.id}-dance-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category: 'Dance',
        question: `Which classical or folk dance tradition represents the performing arts heritage of ${loc.state}, home to ${loc.city}?`,
        options: {
          A: profile.dance.correct,
          B: profile.dance.options[0],
          C: profile.dance.options[1],
          D: profile.dance.options[2]
        },
        correctAnswer: 'A',
        explanation: `${profile.dance.correct} is the distinguished dance tradition of ${loc.state}, celebrated during cultural festivals in ${loc.city}.`,
        difficulty: difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        difficultyLevel: difficulty,
        basePoints,
        points: basePoints
      };
    }

    case 'Food': {
      return {
        id: `synth-${loc.id}-food-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category: 'Food',
        question: `Which authentic regional culinary specialty and culinary heritage is celebrated in ${loc.city} and ${loc.state}?`,
        options: {
          A: profile.food.correct,
          B: profile.food.options[0],
          C: profile.food.options[1],
          D: profile.food.options[2]
        },
        correctAnswer: 'A',
        explanation: `${profile.food.correct} is the signature gastronomic tradition of ${loc.state}, cherished by pilgrims and travelers in ${loc.city}.`,
        difficulty: 'easy',
        difficultyLevel: 'EASY',
        basePoints: 10,
        points: 10
      };
    }

    case 'Festivals': {
      return {
        id: `synth-${loc.id}-festival-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category: 'Festivals',
        question: `Which prominent sacred festival or cultural celebration unites communities across ${loc.city} in ${loc.state}?`,
        options: {
          A: profile.festival.correct,
          B: profile.festival.options[0],
          C: profile.festival.options[1],
          D: profile.festival.options[2]
        },
        correctAnswer: 'A',
        explanation: `${profile.festival.correct} is celebrated with immense devotional and cultural fervor across ${loc.state} and ${loc.city}.`,
        difficulty: difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        difficultyLevel: difficulty,
        basePoints,
        points: basePoints
      };
    }

    case 'Art': {
      return {
        id: `synth-${loc.id}-art-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category: 'Art',
        question: `Which renowned traditional art form, textile craft, or visual craft heritage is native to ${loc.state}, the home state of ${loc.city}?`,
        options: {
          A: profile.art.correct,
          B: profile.art.options[0],
          C: profile.art.options[1],
          D: profile.art.options[2]
        },
        correctAnswer: 'A',
        explanation: `${profile.art.correct} is celebrated as a hallmark artistic heritage of ${loc.state}, preserved at ${loc.city}.`,
        difficulty: difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        difficultyLevel: difficulty,
        basePoints,
        points: basePoints
      };
    }

    case 'Culture':
    default: {
      return {
        id: `synth-${loc.id}-culture-${Date.now()}`,
        locationId: loc.id,
        locationName: loc.city,
        category: 'Culture',
        question: `What cultural significance defines ${loc.heritageSite} in ${loc.city}, ${loc.state}?`,
        options: {
          A: loc.description,
          B: 'A modern coastal shipping drydock built in 2012',
          C: 'A high-altitude glacial weather radar outpost',
          D: 'A commercial highway logistics container warehouse'
        },
        correctAnswer: 'A',
        explanation: `${loc.heritageSite} in ${loc.city} is culturally celebrated for: ${loc.description}`,
        difficulty: difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        difficultyLevel: difficulty,
        basePoints,
        points: basePoints
      };
    }
  }
}

/**
 * Unified Question Selection & Shuffling Engine
 *
 * Enforces:
 * 1. Location matches player position
 * 2. Category strictly matches selected category (hard filter)
 * 3. Fisher-Yates shuffle for options (Option A is NOT always correct)
 * 4. Stable option ID mapping
 * 5. Returns a ready-to-display Question
 */
export function getUniversalQuestion({
  locationId,
  selectedCategories,
  activeCategory,
  blockType,
  difficulty,
  previouslyUsedIds = []
}: {
  locationId: number;
  selectedCategories: CategoryType[];
  activeCategory?: CategoryType;
  blockType?: SpecialBlockType;
  difficulty?: DifficultyLevel;
  previouslyUsedIds?: string[];
}): Question {
  const loc = LOCATIONS_DATA.find((l) => l.id === locationId) || LOCATIONS_DATA[0];
  const effectiveBlockType = blockType || loc.specialBlock || 'Normal';
  const effectiveDifficulty = difficulty || getDefaultDifficultyForBlock(effectiveBlockType, locationId);

  // 1. Determine authoritative category strictly from selectedCategories!
  let targetCategory: CategoryType;

  // If user passed selectedCategories, the question MUST come from selectedCategories!
  const validSelected =
    selectedCategories && selectedCategories.length > 0
      ? selectedCategories
      : (['History', 'Culture', 'Geography', 'Monuments', 'Festivals'] as CategoryType[]);

  if (validSelected.length === 1) {
    // Hard filter: single selected category is absolute
    targetCategory = validSelected[0];
  } else if (activeCategory && validSelected.includes(activeCategory)) {
    targetCategory = activeCategory;
  } else {
    // If special block, see if one of validSelected aligns with the special block
    let preferredCategory: CategoryType | null = null;
    if (effectiveBlockType === 'Culture Challenge' && validSelected.includes('Culture')) {
      preferredCategory = 'Culture';
    } else if (effectiveBlockType === 'Festival Challenge' && validSelected.includes('Festivals')) {
      preferredCategory = 'Festivals';
    } else if (
      effectiveBlockType === 'Heritage Challenge' &&
      (validSelected.includes('Monuments') || validSelected.includes('Heritage'))
    ) {
      preferredCategory = validSelected.includes('Monuments') ? 'Monuments' : 'Heritage';
    } else if (effectiveBlockType === 'Myth/Misinformation Trap' && validSelected.includes('History')) {
      preferredCategory = 'History';
    }

    if (preferredCategory) {
      targetCategory = preferredCategory;
    } else {
      // Pick one randomly from validSelected
      const randomIndex = Math.floor(Math.random() * validSelected.length);
      targetCategory = validSelected[randomIndex];
    }
  }

  let chosenQuestion: Question | null = null;

  // 2. If it is a special challenge block, check SPECIAL_CHALLENGES_BANK
  // MUST match locationId AND targetCategory!
  if (effectiveBlockType !== 'Normal' && effectiveBlockType !== 'Heritage Hunt') {
    const specialCandidates = SPECIAL_CHALLENGES_BANK.filter(
      (q) => q.locationId === locationId && q.category === targetCategory
    );

    if (specialCandidates.length > 0) {
      const unused = specialCandidates.filter((q) => !previouslyUsedIds.includes(q.id));
      const pool = unused.length > 0 ? unused : specialCandidates;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      chosenQuestion = {
        ...picked,
        difficultyLevel: effectiveDifficulty,
        blockType: effectiveBlockType
      };
    }
  }

  // 3. Search QUESTIONS_BANK with HARD filters: locationId AND targetCategory
  if (!chosenQuestion) {
    const exactMatches = QUESTIONS_BANK.filter(
      (q) => q.locationId === locationId && q.category === targetCategory
    );

    if (exactMatches.length > 0) {
      const unused = exactMatches.filter((q) => !previouslyUsedIds.includes(q.id));
      const pool = unused.length > 0 ? unused : exactMatches;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      chosenQuestion = {
        ...picked,
        difficultyLevel: effectiveDifficulty,
        blockType: effectiveBlockType
      };
    }
  }

  // 4. If no exact handcrafted question exists for this (locationId + targetCategory),
  // generate an authentic location-specific and category-specific question!
  if (!chosenQuestion) {
    chosenQuestion = generateSyntheticQuestionForLocation(locationId, targetCategory, effectiveDifficulty);
    chosenQuestion.blockType = effectiveBlockType;
  }

  // 5. SHUFFLE OPTIONS WITH FISHER-YATES!
  // Ensures equal distribution across A, B, C, D with stable option IDs
  const finalizedQuestion = prepareQuestionWithOptionsShuffle(chosenQuestion);

  return finalizedQuestion;
}

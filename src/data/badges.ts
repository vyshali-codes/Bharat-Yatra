import { Badge } from '../types/game';

export const BADGES_DATA: Badge[] = [
  {
    id: 'heritage-explorer',
    name: 'Heritage Explorer',
    description: 'Began the voyage across India and reached the first 10 heritage locations.',
    icon: '🧭',
    iconName: 'Compass',
    category: 'Exploration',
    requiredCondition: 'Reach location 10'
  },
  {
    id: 'culture-master',
    name: 'Culture Master',
    description: 'Successfully answered 3 Culture Challenge questions correctly.',
    icon: '✨',
    iconName: 'Sparkles',
    category: 'Culture',
    requiredCondition: 'Answer 3 culture challenges correctly'
  },
  {
    id: 'history-scholar',
    name: 'History Scholar',
    description: 'Demonstrated deep historical knowledge with 5 correct history questions.',
    icon: '📖',
    iconName: 'BookOpen',
    category: 'Knowledge',
    requiredCondition: 'Score 5 correct history questions'
  },
  {
    id: 'festival-expert',
    name: 'Festival Expert',
    description: 'Mastered Indian festivities by clearing a Festival Challenge.',
    icon: '🪔',
    iconName: 'Flame',
    category: 'Festivals',
    requiredCondition: 'Win a festival challenge'
  },
  {
    id: 'monument-hunter',
    name: 'Monument Hunter',
    description: 'Scanned and identified your first monument in the Heritage Hunt.',
    icon: '📷',
    iconName: 'Camera',
    category: 'Monuments',
    requiredCondition: 'Complete 1 Heritage Hunt'
  },
  {
    id: 'india-traveler',
    name: 'India Traveler',
    description: 'Traversed the halfway mark of the subcontinent (Location 40).',
    icon: '📍',
    iconName: 'MapPin',
    category: 'Journey',
    requiredCondition: 'Reach location 40'
  },
  {
    id: 'golden-heritage',
    name: 'Golden Heritage',
    description: 'Landed on an iconic Golden Heritage wonder block and answered correctly.',
    icon: '👑',
    iconName: 'Crown',
    category: 'Prestige',
    requiredCondition: 'Conquer a Golden Heritage milestone'
  },
  {
    id: 'knowledge-ladder',
    name: 'Knowledge Master',
    description: 'Climbed up a Knowledge Ladder by answering with swift wisdom.',
    icon: '🪜',
    iconName: 'TrendingUp',
    category: 'Speed',
    requiredCondition: 'Ascend a Knowledge Ladder (+3 blocks)'
  },
  {
    id: 'heritage-hunt-champion',
    name: 'Heritage Hunt Champion',
    description: 'Successfully scanned and verified 3 heritage monuments.',
    icon: '🏆',
    iconName: 'Award',
    category: 'Hunt',
    requiredCondition: 'Complete 3 Heritage Hunts'
  },
  {
    id: 'bharat-yatra-champion',
    name: 'Bharat Yatra Champion',
    description: 'Successfully completed the entire 80-location voyage through India!',
    icon: '🥇',
    iconName: 'Trophy',
    category: 'Mastery',
    requiredCondition: 'Reach the final location 80'
  }
];

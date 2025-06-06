import type { Player } from '@/types';

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Roger Federer',
    ranking: 3,
    avatarUrl: 'https://placehold.co/100x100.png',
    historicalData: '20 Grand Slam titles, known for his all-court game and longevity. Dominant on grass and hard courts.',
    currentForm: 'Recently retired but simulating his peak form. Won his last exhibition match.',
    playingStyle: 'Elegant, aggressive all-court player with a powerful serve, precise forehand, and exceptional net play.',
  },
  {
    id: '2',
    name: 'Rafael Nadal',
    ranking: 2,
    avatarUrl: 'https://placehold.co/100x100.png',
    historicalData: '22 Grand Slam titles, the "King of Clay" with unprecedented dominance on clay courts. Known for his fighting spirit.',
    currentForm: 'Struggling with injuries but showed glimpses of form in recent matches. Highly motivated for majors.',
    playingStyle: 'Tenacious baseliner with a heavy topspin forehand, incredible defensive skills, and unparalleled mental fortitude.',
  },
  {
    id: '3',
    name: 'Novak Djokovic',
    ranking: 1,
    avatarUrl: 'https://placehold.co/100x100.png',
    historicalData: '24 Grand Slam titles, holds numerous records including most weeks at No. 1. Versatile on all surfaces.',
    currentForm: 'Consistently reaching finals, maintaining high performance levels. Strong favorite in most tournaments.',
    playingStyle: 'All-court player with exceptional return of serve, solid groundstrokes from both wings, and remarkable flexibility.',
  },
  {
    id: '4',
    name: 'Serena Williams',
    ranking: 8, // Example ranking
    avatarUrl: 'https://placehold.co/100x100.png',
    historicalData: '23 Grand Slam singles titles, one of the greatest of all time. Dominated women\'s tennis for over two decades.',
    currentForm: 'Recently retired, simulating her prime competitive form. Known for powerful serves and groundstrokes.',
    playingStyle: 'Aggressive baseliner with a booming serve, powerful forehand and backhand, and strong mental game.',
  },
  {
    id: '5',
    name: 'Iga Świątek',
    ranking: 1, // Current WTA No. 1
    avatarUrl: 'https://placehold.co/100x100.png',
    historicalData: 'Multiple Grand Slam titles, particularly dominant on clay. Known for her athleticism and topspin forehand.',
    currentForm: 'Currently dominating the WTA tour, consistent winner on multiple surfaces. Strong mental game under pressure.',
    playingStyle: 'Aggressive all-court player with a powerful forehand, excellent movement, and strong defensive capabilities. Uses heavy topspin.',
  },
   {
    id: '6',
    name: 'Carlos Alcaraz',
    ranking: 2,
    avatarUrl: 'https://placehold.co/100x100.png',
    historicalData: 'Youngest ever ATP No. 1, multiple Grand Slam titles. Known for his explosive power and drop shots.',
    currentForm: 'Consistently performing at a high level, winning titles on various surfaces. Fearless competitor.',
    playingStyle: 'Dynamic all-court player with a powerful forehand, exceptional speed, and creative shot-making including drop shots.',
  },
];

export const fetchPlayers = async (): Promise<Player[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPlayers;
};

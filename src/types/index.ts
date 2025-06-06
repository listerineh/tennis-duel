export interface User {
  username: string;
  // Add any other user-specific fields if needed
}

export interface Player {
  id: string;
  name: string;
  ranking: number;
  avatarUrl: string;
  historicalData: string;
  currentForm: string;
  playingStyle: string;
}

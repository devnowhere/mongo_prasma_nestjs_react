export interface UserProfile {
  walletAddress: string;
  username?: string;
  bio?: string;
  profileImageUrl?: string;
  socialLinks?: {
    twitter?: string;
    discord?: string;
    website?: string;
  };
  joinedAt: number;
  lastLogin?: number;
}

export interface UserStats {
  totalSales: number;
  totalPurchases: number;
  totalVolume: number;
  totalCreations: number;
  totalCollections: number;
}

export interface UserActivity {
  type: 'listing' | 'sale' | 'purchase' | 'creation' | 'bid';
  nft: string;
  price?: number;
  otherParty?: string;
  timestamp: number;
}

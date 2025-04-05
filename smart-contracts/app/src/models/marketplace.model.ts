export interface MarketplaceState {
  authority: string;
  feeAccount: string;
  feeBasisPoints: number;
  treasuryMint: string;
}

export interface ListingData {
  mint: string;
  price: number;
  seller: string;
  createdAt: number;
}

export interface SaleData {
  mint: string;
  price: number;
  seller: string;
  buyer: string;
  timestamp: number;
}

export interface MarketplaceStats {
  totalVolume: number;
  totalSales: number;
  totalListings: number;
  activeSellers: number;
  activeBuyers: number;
}

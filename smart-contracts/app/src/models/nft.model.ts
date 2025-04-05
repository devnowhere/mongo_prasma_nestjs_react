export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTMetadata {
  name: string;
  symbol: string;
  description?: string;
  image: string;
  animation_url?: string;
  external_url?: string;
  attributes?: NFTAttribute[];
  seller_fee_basis_points: number;
  properties: {
    files: Array<{
      uri: string;
      type: string;
    }>;
    creators: Array<{
      address: string;
      share: number;
    }>;
  };
}

export interface NFT {
  mint: string;
  owner: string;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  isListed: boolean;
  price: number;
  creator: string;
  attributes?: NFTAttribute[];
}

export interface NFTCollectionData {
  name: string;
  symbol: string;
  description?: string;
  image?: string;
  external_url?: string;
}

// NFT type definitions
export interface NFT {
  id: string
  tokenId: string
  contractAddress: string
  owner: string
  creator: string
  metadata: NFTMetadata
  price?: string
  isListed: boolean
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes?: NFTAttribute[]
}

export interface NFTAttribute {
  trait_type: string
  value: string | number
}

// Transaction related types
export interface TransactionStatus {
  hash: string
  status: 'pending' | 'confirmed' | 'failed'
  confirmations: number
}

// User related types
export interface UserProfile {
  address: string
  username?: string
  bio?: string
  avatar?: string
  social?: {
    twitter?: string
    instagram?: string
    website?: string
  }
}

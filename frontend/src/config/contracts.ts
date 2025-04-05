// Contract addresses by network ID
export const contractAddresses: Record<string, Record<number, string>> = {
  NFTMarketplace: {
    1: '', // Mainnet - blank for now
    4: '', // Rinkeby - blank for now
    1337: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Local development
  },
  NFT: {
    1: '', // Mainnet - blank for now
    4: '', // Rinkeby - blank for now
    1337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // Local development
  }
}

// Contract ABIs (would be imported from JSON files in a real app)
export const NFTMarketplaceABI = [
  // This is a placeholder
  // In a real app, you would import the full ABI from a JSON file
  // generated during contract compilation
]

export const NFTABI = [
  // This is a placeholder
  // In a real app, you would import the full ABI from a JSON file
  // generated during contract compilation
]

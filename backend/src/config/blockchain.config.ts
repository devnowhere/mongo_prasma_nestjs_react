export const blockchainConfig = () => ({
  blockchain: {
    provider: process.env.BLOCKCHAIN_PROVIDER || 'https://rpc-devnet.helius.xyz',
    network: process.env.BLOCKCHAIN_NETWORK || 'devnet',
    contracts: {
      nftMarketplace: process.env.NFT_MARKETPLACE_CONTRACT_ADDRESS || '',
      nft: process.env.NFT_CONTRACT_ADDRESS || '',
    },
  },
});

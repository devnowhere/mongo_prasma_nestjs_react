import { Connection, clusterApiUrl, Commitment } from '@solana/web3.js';

// Get connection to Solana cluster
export const getConnection = (
  network: 'mainnet-beta' | 'testnet' | 'devnet' | 'localnet' = 'devnet',
  commitment: Commitment = 'confirmed'
): Connection => {
  const endpoint = network === 'localnet' 
    ? 'http://localhost:8899' 
    : clusterApiUrl(network);
  
  return new Connection(endpoint, commitment);
};

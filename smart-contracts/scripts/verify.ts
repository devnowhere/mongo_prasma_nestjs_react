import { Connection, PublicKey } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';

// Script to verify deployed programs

async function main() {
  try {
    // Get cluster endpoint from env or default to localhost
    const endpoint = process.env.ANCHOR_PROVIDER_URL || 'http://localhost:8899';
    const connection = new Connection(endpoint, 'confirmed');
    
    console.log(Verifying programs on ...);
    
    // Read program IDs from Anchor.toml
    const anchorTomlPath = path.resolve('Anchor.toml');
    const anchorToml = fs.readFileSync(anchorTomlPath, 'utf-8');
    
    // Extract program IDs using regex
    const nftMarketplaceMatch = anchorToml.match(/nft_marketplace = "([^"]+)"/);
    const tokenMatch = anchorToml.match(/token = "([^"]+)"/);
    
    if (!nftMarketplaceMatch || !tokenMatch) {
      throw new Error('Could not find program IDs in Anchor.toml');
    }
    
    const nftMarketplaceProgramId = new PublicKey(nftMarketplaceMatch[1]);
    const tokenProgramId = new PublicKey(tokenMatch[1]);
    
    console.log(Checking NFT Marketplace ()...);
    const nftMarketplaceAccountInfo = await connection.getAccountInfo(nftMarketplaceProgramId);
    
    if (!nftMarketplaceAccountInfo) {
      console.error('❌ NFT Marketplace program not found');
    } else {
      console.log('✅ NFT Marketplace program verified');
    }
    
    console.log(Checking Token ()...);
    const tokenAccountInfo = await connection.getAccountInfo(tokenProgramId);
    
    if (!tokenAccountInfo) {
      console.error('❌ Token program not found');
    } else {
      console.log('✅ Token program verified');
    }
    
    if (!nftMarketplaceAccountInfo || !tokenAccountInfo) {
      throw new Error('One or more programs not found');
    }
    
    console.log('All programs verified successfully');
  } catch (error) {
    console.error('Error during verification:', error);
    process.exit(1);
  }
}

// Run the main function
main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);

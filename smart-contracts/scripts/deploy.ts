import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';
import { NftMarketplace } from '../app/src/generated/nft-marketplace';
import { Token } from '../app/src/generated/token';

// Deploy script for the NFT marketplace and token programs

async function main() {
  // Configure the client
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  console.log('Deploying programs to', provider.connection.rpcEndpoint);

  try {
    // Read the deployed program keypairs
    const nftMarketplaceKeypair = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(path.resolve('target/deploy/nft_marketplace-keypair.json'), 'utf-8')))
    );
    const tokenKeypair = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(path.resolve('target/deploy/token-keypair.json'), 'utf-8')))
    );

    console.log(NFT Marketplace Program ID: );
    console.log(Token Program ID: );

    // Update the Anchor.toml with the new program IDs
    updateAnchorToml(nftMarketplaceKeypair.publicKey, tokenKeypair.publicKey);

    // Update the IDL with the correct program IDs
    updateIdl(nftMarketplaceKeypair.publicKey, tokenKeypair.publicKey);

    // Log success message
    console.log('Deployment completed successfully');
  } catch (error) {
    console.error('Error during deployment:', error);
    process.exit(1);
  }
}

// Update the Anchor.toml with the new program IDs
function updateAnchorToml(nftMarketplaceProgramId: PublicKey, tokenProgramId: PublicKey) {
  const anchorTomlPath = path.resolve('Anchor.toml');
  let anchorToml = fs.readFileSync(anchorTomlPath, 'utf-8');
  
  // Update NFT Marketplace program ID
  anchorToml = anchorToml.replace(
    /nft_marketplace = ".*"/,
    
ft_marketplace = ""
  );
  
  // Update Token program ID
  anchorToml = anchorToml.replace(
    /token = ".*"/,
    	oken = ""
  );
  
  fs.writeFileSync(anchorTomlPath, anchorToml);
  console.log('Anchor.toml updated with new program IDs');
}

// Update the IDL files with the correct program IDs
function updateIdl(nftMarketplaceProgramId: PublicKey, tokenProgramId: PublicKey) {
  // Update NFT Marketplace IDL
  const nftMarketplaceIdlPath = path.resolve('target/idl/nft_marketplace.json');
  if (fs.existsSync(nftMarketplaceIdlPath)) {
    const nftMarketplaceIdl = JSON.parse(fs.readFileSync(nftMarketplaceIdlPath, 'utf-8'));
    
    if (!nftMarketplaceIdl.metadata) {
      nftMarketplaceIdl.metadata = {};
    }
    
    nftMarketplaceIdl.metadata.address = nftMarketplaceProgramId.toString();
    
    fs.writeFileSync(
      nftMarketplaceIdlPath,
      JSON.stringify(nftMarketplaceIdl, null, 2)
    );
  }
  
  // Update Token IDL
  const tokenIdlPath = path.resolve('target/idl/token.json');
  if (fs.existsSync(tokenIdlPath)) {
    const tokenIdl = JSON.parse(fs.readFileSync(tokenIdlPath, 'utf-8'));
    
    if (!tokenIdl.metadata) {
      tokenIdl.metadata = {};
    }
    
    tokenIdl.metadata.address = tokenProgramId.toString();
    
    fs.writeFileSync(
      tokenIdlPath,
      JSON.stringify(tokenIdl, null, 2)
    );
  }
  
  console.log('IDL files updated with correct program IDs');
}

// Run the main function
main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);

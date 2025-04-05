import { Keypair } from '@solana/web3.js';
import { Wallet } from '@coral-xyz/anchor';
import { MarketplaceService } from '../src/services/marketplace.service';
import { getConnection } from '../src/utils/connection';

// This example shows how to create a new NFT

async function main() {
  try {
    // Setup connection and wallet
    const connection = getConnection('devnet');
    const keypair = Keypair.generate(); // In a real app, load your keypair
    const wallet = new Wallet(keypair);

    // Fund the wallet for testing (only on devnet/testnet)
    const airdropSignature = await connection.requestAirdrop(
      wallet.publicKey,
      1000000000 // 1 SOL
    );
    await connection.confirmTransaction(airdropSignature);

    console.log(Wallet: );
    console.log(Balance:  SOL);

    // Initialize marketplace service
    const marketplaceService = new MarketplaceService(connection, wallet);

    // Create NFT
    const nft = await marketplaceService.createNFT(
      'My First NFT',
      'NFT1',
      'https://arweave.net/123456', // Replace with actual metadata URI
      500, // 5% royalty
      [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Eyes', value: 'Green' },
        { trait_type: 'Species', value: 'Robot' }
      ]
    );

    console.log('NFT created:');
    console.log(JSON.stringify(nft, null, 2));

  } catch (error) {
    console.error('Error creating NFT:', error);
  }
}

main();

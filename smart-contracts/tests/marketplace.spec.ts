import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { PublicKey, Keypair, Connection, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { assert } from 'chai';
import { NftMarketplace } from '../app/src/generated/nft-marketplace';

describe('nft-marketplace', () => {
  // Configure the client
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.NftMarketplace as Program<NftMarketplace>;
  
  // Test accounts
  const owner = Keypair.generate();
  const buyer = Keypair.generate();
  let mint: PublicKey;
  let ownerTokenAccount: PublicKey;
  let buyerTokenAccount: PublicKey;
  let nftAccount: PublicKey;
  let escrowTokenAccount: PublicKey;
  
  // Test metadata
  const nftName = 'Test NFT';
  const nftSymbol = 'TEST';
  const nftUri = 'https://example.com/metadata.json';
  const sellerFeeBasisPoints = 500; // 5%
  const listingPrice = new anchor.BN(1000000000); // 1 SOL
  
  before(async () => {
    // Airdrop SOL to owner and buyer
    const connection = provider.connection;
    
    await connection.confirmTransaction(
      await connection.requestAirdrop(owner.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
    );
    
    await connection.confirmTransaction(
      await connection.requestAirdrop(buyer.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
    );
    
    // Create NFT mint
    mint = await createMint(
      connection,
      owner,
      owner.publicKey,
      owner.publicKey,
      0
    );
    
    // Create token accounts for owner and buyer
    const ownerTokenAccountInfo = await getOrCreateAssociatedTokenAccount(
      connection,
      owner,
      mint,
      owner.publicKey
    );
    
    ownerTokenAccount = ownerTokenAccountInfo.address;
    
    const buyerTokenAccountInfo = await getOrCreateAssociatedTokenAccount(
      connection,
      buyer,
      mint,
      buyer.publicKey
    );
    
    buyerTokenAccount = buyerTokenAccountInfo.address;
    
    // Mint NFT to owner
    await mintTo(
      connection,
      owner,
      mint,
      ownerTokenAccount,
      owner,
      1
    );
    
    // Derive PDA addresses
    [nftAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('nft'), mint.toBuffer()],
      program.programId
    );
    
    [escrowTokenAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('escrow'), mint.toBuffer()],
      program.programId
    );
  });

  it('Creates an NFT', async () => {
    await program.methods
      .createNft(
        nftName,
        nftSymbol,
        nftUri,
        sellerFeeBasisPoints
      )
      .accounts({
        owner: owner.publicKey,
        nft: nftAccount,
        mint: mint,
        tokenAccount: ownerTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .signers([owner])
      .rpc();
    
    // Fetch and verify NFT account data
    const nftData = await program.account.nFTData.fetch(nftAccount);
    
    assert.equal(nftData.owner.toString(), owner.publicKey.toString());
    assert.equal(nftData.mint.toString(), mint.toString());
    assert.equal(nftData.name, nftName);
    assert.equal(nftData.symbol, nftSymbol);
    assert.equal(nftData.uri, nftUri);
    assert.equal(nftData.sellerFeeBasisPoints, sellerFeeBasisPoints);
    assert.equal(nftData.isListed, false);
    assert.equal(nftData.price.toNumber(), 0);
    assert.equal(nftData.creator.toString(), owner.publicKey.toString());
  });
  
  it('Lists an NFT for sale', async () => {
    await program.methods
      .listNft(listingPrice)
      .accounts({
        owner: owner.publicKey,
        nft: nftAccount,
        tokenAccount: ownerTokenAccount,
        escrowTokenAccount: escrowTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .signers([owner])
      .rpc();
    
    // Fetch and verify NFT account data
    const nftData = await program.account.nFTData.fetch(nftAccount);
    
    assert.equal(nftData.isListed, true);
    assert.equal(nftData.price.toString(), listingPrice.toString());
    
    // Verify token is in escrow
    const escrowBalance = await provider.connection.getTokenAccountBalance(escrowTokenAccount);
    assert.equal(escrowBalance.value.amount, '1');
  });
  
  it('Buys an NFT', async () => {
    // Get seller's SOL balance before the sale
    const sellerBalanceBefore = await provider.connection.getBalance(owner.publicKey);
    
    await program.methods
      .buyNft()
      .accounts({
        buyer: buyer.publicKey,
        buyerTokenAccount: buyerTokenAccount,
        seller: owner.publicKey,
        nft: nftAccount,
        escrowTokenAccount: escrowTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([buyer])
      .rpc();
    
    // Fetch and verify NFT account data
    const nftData = await program.account.nFTData.fetch(nftAccount);
    
    assert.equal(nftData.owner.toString(), buyer.publicKey.toString());
    assert.equal(nftData.isListed, false);
    assert.equal(nftData.price.toNumber(), 0);
    
    // Verify token is transferred to buyer
    const buyerBalance = await provider.connection.getTokenAccountBalance(buyerTokenAccount);
    assert.equal(buyerBalance.value.amount, '1');
    
    // Verify seller received payment
    const sellerBalanceAfter = await provider.connection.getBalance(owner.publicKey);
    const expectedSellerBalance = sellerBalanceBefore + listingPrice.toNumber();
    
    // Allow for some margin of error due to transaction fees
    assert.approximately(sellerBalanceAfter, expectedSellerBalance, 10000);
  });
});

import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { PublicKey, Keypair, Connection } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAccount } from '@solana/spl-token';
import { assert } from 'chai';
import { Token } from '../app/src/generated/token';
import { TokenService } from '../app/src/services/token.service';

describe('token', () => {
  // Configure the client
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Test accounts
  const wallet = Keypair.generate();
  const recipient = Keypair.generate();
  let tokenService: TokenService;
  let mintAddress: string;
  let tokenAccount: string;
  
  before(async () => {
    // Airdrop SOL to wallet
    const connection = provider.connection;
    
    await connection.confirmTransaction(
      await connection.requestAirdrop(wallet.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
    );
    
    // Create token service
    tokenService = new TokenService(
      connection,
      new anchor.Wallet(wallet)
    );
  });

  it('Creates a token mint', async () => {
    mintAddress = await tokenService.createMint(6); // 6 decimals
    
    assert.isNotNull(mintAddress);
    assert.isString(mintAddress);
    
    const mintAddressPubkey = new PublicKey(mintAddress);
    assert.isTrue(mintAddressPubkey instanceof PublicKey);
  });
  
  it('Gets a token account', async () => {
    tokenAccount = await tokenService.getTokenAccount(mintAddress);
    
    assert.isNotNull(tokenAccount);
    assert.isString(tokenAccount);
    
    const tokenAccountPubkey = new PublicKey(tokenAccount);
    assert.isTrue(tokenAccountPubkey instanceof PublicKey);
  });
  
  it('Mints tokens', async () => {
    const amount = 1000000; // 1 token with 6 decimals
    const signature = await tokenService.mintTokens(mintAddress, amount);
    
    assert.isNotNull(signature);
    assert.isString(signature);
    
    const tokenAccountPubkey = new PublicKey(tokenAccount);
    const accountInfo = await getAccount(provider.connection, tokenAccountPubkey);
    
    assert.equal(accountInfo.amount.toString(), amount.toString());
  });
  
  it('Transfers tokens', async () => {
    // Airdrop SOL to recipient for rent exemption
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(recipient.publicKey, 0.1 * anchor.web3.LAMPORTS_PER_SOL)
    );
    
    const amount = 500000; // 0.5 token with 6 decimals
    const signature = await tokenService.transferTokens(
      mintAddress,
      recipient.publicKey.toString(),
      amount
    );
    
    assert.isNotNull(signature);
    assert.isString(signature);
    
    // Get recipient's token account
    const recipientTokenAccount = await tokenService.getTokenAccount(
      mintAddress
    );
    
    const recipientTokenAccountPubkey = new PublicKey(recipientTokenAccount);
    const accountInfo = await getAccount(provider.connection, recipientTokenAccountPubkey);
    
    assert.equal(accountInfo.amount.toString(), amount.toString());
  });
  
  it('Burns tokens', async () => {
    const initialAmount = 500000; // 0.5 token remaining
    const burnAmount = 200000; // 0.2 token
    
    const signature = await tokenService.burnTokens(
      mintAddress,
      burnAmount
    );
    
    assert.isNotNull(signature);
    assert.isString(signature);
    
    const tokenAccountPubkey = new PublicKey(tokenAccount);
    const accountInfo = await getAccount(provider.connection, tokenAccountPubkey);
    
    assert.equal(accountInfo.amount.toString(), (initialAmount - burnAmount).toString());
  });
});

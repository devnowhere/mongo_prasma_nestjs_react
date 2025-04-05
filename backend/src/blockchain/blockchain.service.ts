import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import { WalletDto } from './dto/wallet.dto';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private connection: Connection;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('blockchain.provider');
    this.connection = new Connection(rpcUrl);
    this.logger.log(Connected to Solana network at );
  }

  async getWalletBalance(walletAddress: string): Promise<number> {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balance = await this.connection.getBalance(publicKey);
      return balance / 10 ** 9; // Convert lamports to SOL
    } catch (error) {
      this.logger.error(Error getting wallet balance: );
      throw error;
    }
  }

  async validateWalletAddress(walletAddress: string): Promise<boolean> {
    try {
      new PublicKey(walletAddress);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getTransaction(signature: string): Promise<TransactionDto> {
    try {
      const transaction = await this.connection.getTransaction(signature);
      
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      
      return {
        signature,
        blockTime: transaction.blockTime,
        slot: transaction.slot,
        fee: transaction.meta.fee / 10 ** 9,
        status: transaction.meta.err ? 'failed' : 'confirmed',
      };
    } catch (error) {
      this.logger.error(Error getting transaction: );
      throw error;
    }
  }

  async sendTransaction(transaction: Transaction): Promise<string> {
    try {
      const signature = await this.connection.sendRawTransaction(
        transaction.serialize(),
      );
      
      await this.connection.confirmTransaction(signature);
      
      return signature;
    } catch (error) {
      this.logger.error(Error sending transaction: );
      throw error;
    }
  }
}

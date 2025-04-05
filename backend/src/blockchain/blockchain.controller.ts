import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';
import { WalletDto } from './dto/wallet.dto';
import { TransactionDto } from './dto/transaction.dto';

@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('wallet/:address/balance')
  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiResponse({ status: 200, description: 'Wallet balance in SOL' })
  async getWalletBalance(@Param('address') address: string): Promise<{ balance: number }> {
    try {
      const isValid = await this.blockchainService.validateWalletAddress(address);
      
      if (!isValid) {
        throw new HttpException('Invalid wallet address', HttpStatus.BAD_REQUEST);
      }
      
      const balance = await this.blockchainService.getWalletBalance(address);
      return { balance };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('transaction/:signature')
  @ApiOperation({ summary: 'Get transaction details' })
  @ApiResponse({ status: 200, description: 'Transaction details', type: TransactionDto })
  async getTransaction(@Param('signature') signature: string): Promise<TransactionDto> {
    try {
      return await this.blockchainService.getTransaction(signature);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

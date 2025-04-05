import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { NFT } from './entities/nft.entity';
import { UsersModule } from '../users/users.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { IpfsModule } from '../ipfs/ipfs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NFT]),
    UsersModule,
    BlockchainModule,
    IpfsModule,
  ],
  controllers: [NftsController],
  providers: [NftsService],
  exports: [NftsService],
})
export class NftsModule {}

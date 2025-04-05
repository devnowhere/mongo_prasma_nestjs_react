import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockchainModule } from './blockchain/blockchain.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { UsersModule } from './users/users.module';
import { NftsModule } from './nfts/nfts.module';
import { appConfig } from './config/app.config';
import { blockchainConfig } from './config/blockchain.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, blockchainConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize'),
      }),
    }),
    BlockchainModule,
    IpfsModule,
    UsersModule,
    NftsModule,
  ],
})
export class AppModule {}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class WalletDto {
  @ApiProperty({
    description: 'Solana wallet address',
    example: 'BKMnJu9Lp8qfLsZuBEEEU6YnbKJYBB25YzL9cuhtXTct',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}

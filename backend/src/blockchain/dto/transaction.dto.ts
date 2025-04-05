import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({
    description: 'Transaction signature',
    example: '5UfgccYEPmHB5gJdKhKfdHGgYBd6XvAacHfCVSKew9uNrbLMsQbm8nPJh3oLd3oXVcCUrg71RhFzGG5yBBBxgw4C',
  })
  signature: string;

  @ApiProperty({
    description: 'Block time (Unix timestamp)',
    example: 1631234567,
  })
  blockTime: number;

  @ApiProperty({
    description: 'Slot number',
    example: 123456789,
  })
  slot: number;

  @ApiProperty({
    description: 'Transaction fee in SOL',
    example: 0.000005,
  })
  fee: number;

  @ApiProperty({
    description: 'Transaction status',
    example: 'confirmed',
    enum: ['confirmed', 'failed'],
  })
  status: 'confirmed' | 'failed';
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class CreateNftDto {
  @ApiProperty({
    description: 'The name of the NFT',
    example: 'Cool NFT #123',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the NFT',
    example: 'This is a cool NFT with unique properties',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The symbol of the NFT collection',
    example: 'COOL',
    required: false,
  })
  @IsString()
  @IsOptional()
  symbol?: string;

  @ApiProperty({
    description: 'The royalty basis points (e.g., 500 = 5%)',
    example: 500,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(10000)
  @IsOptional()
  royaltyBasisPoints?: number;

  @ApiProperty({
    description: 'Optional initial listing price in SOL',
    example: 1.5,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  listingPrice?: number;

  @ApiProperty({
    description: 'The IPFS hash of the NFT image (if already uploaded)',
    example: 'QmZ9t1XU9FBCyHXKfGVkjvCZEHjau8xTrLGrPFCQj6yeH1',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageHash?: string;

  @ApiProperty({
    description: 'Additional attributes for the NFT metadata',
    example: [{ trait_type: 'Background', value: 'Blue' }],
    required: false,
  })
  @IsOptional()
  attributes?: Record<string, any>[];

  // This will be set by the controller from the authenticated wallet
  creatorWalletAddress: string;
}

export class UpdateNftDto {
  @ApiProperty({
    description: 'The listing price in SOL (null to unlist)',
    example: 1.5,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  listingPrice?: number;

  @ApiProperty({
    description: 'Whether to list or unlist the NFT',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isListed?: boolean;
}

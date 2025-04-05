import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The wallet address of the user',
    example: 'BKMnJu9Lp8qfLsZuBEEEU6YnbKJYBB25YzL9cuhtXTct',
  })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({
    description: 'The username',
    example: 'johndoe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'User bio',
    example: 'NFT enthusiast and creator',
    required: false,
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    description: 'Profile image IPFS hash',
    example: 'QmZ9t1XU9FBCyHXKfGVkjvCZEHjau8xTrLGrPFCQj6yeH1',
    required: false,
  })
  @IsString()
  @IsOptional()
  profileImageHash?: string;

  @ApiProperty({
    description: 'Twitter handle',
    example: 'johndoe',
    required: false,
  })
  @IsString()
  @IsOptional()
  twitterHandle?: string;

  @ApiProperty({
    description: 'Discord username',
    example: 'johndoe#1234',
    required: false,
  })
  @IsString()
  @IsOptional()
  discordUsername?: string;

  @ApiProperty({
    description: 'Personal website',
    example: 'https://johndoe.com',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  website?: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username',
    example: 'johndoe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'User bio',
    example: 'NFT enthusiast and creator',
    required: false,
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    description: 'Profile image IPFS hash',
    example: 'QmZ9t1XU9FBCyHXKfGVkjvCZEHjau8xTrLGrPFCQj6yeH1',
    required: false,
  })
  @IsString()
  @IsOptional()
  profileImageHash?: string;

  @ApiProperty({
    description: 'Twitter handle',
    example: 'johndoe',
    required: false,
  })
  @IsString()
  @IsOptional()
  twitterHandle?: string;

  @ApiProperty({
    description: 'Discord username',
    example: 'johndoe#1234',
    required: false,
  })
  @IsString()
  @IsOptional()
  discordUsername?: string;

  @ApiProperty({
    description: 'Personal website',
    example: 'https://johndoe.com',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  website?: string;
}

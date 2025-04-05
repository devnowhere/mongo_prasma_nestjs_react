import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { NFT } from '../../nfts/entities/nft.entity';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The wallet address of the user (primary key)',
    example: 'BKMnJu9Lp8qfLsZuBEEEU6YnbKJYBB25YzL9cuhtXTct',
  })
  @PrimaryColumn()
  walletAddress: string;

  @ApiProperty({
    description: 'The username',
    example: 'johndoe',
    required: false,
  })
  @Column({ nullable: true })
  username: string;

  @ApiProperty({
    description: 'User bio',
    example: 'NFT enthusiast and creator',
    required: false,
  })
  @Column({ nullable: true })
  bio: string;

  @ApiProperty({
    description: 'Profile image IPFS hash',
    example: 'QmZ9t1XU9FBCyHXKfGVkjvCZEHjau8xTrLGrPFCQj6yeH1',
    required: false,
  })
  @Column({ nullable: true })
  profileImageHash: string;

  @ApiProperty({
    description: 'Twitter handle',
    example: 'johndoe',
    required: false,
  })
  @Column({ nullable: true })
  twitterHandle: string;

  @ApiProperty({
    description: 'Discord username',
    example: 'johndoe#1234',
    required: false,
  })
  @Column({ nullable: true })
  discordUsername: string;

  @ApiProperty({
    description: 'Personal website',
    example: 'https://johndoe.com',
    required: false,
  })
  @Column({ nullable: true })
  website: string;

  @ApiProperty({
    description: 'Last login timestamp',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @Column({ nullable: true })
  lastLogin: Date;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-01T00:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => NFT, (nft) => nft.owner)
  ownedNFTs: NFT[];

  @OneToMany(() => NFT, (nft) => nft.creator)
  createdNFTs: NFT[];
}

import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('nfts')
export class NFT {
  @ApiProperty({
    description: 'The mint address of the NFT (primary key)',
    example: 'Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS',
  })
  @PrimaryColumn()
  mintAddress: string;

  @ApiProperty({
    description: 'The name of the NFT',
    example: 'Cool NFT #123',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The description of the NFT',
    example: 'This is a cool NFT with unique properties',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'The symbol of the NFT collection',
    example: 'COOL',
  })
  @Column({ nullable: true })
  symbol: string;

  @ApiProperty({
    description: 'The IPFS hash of the NFT image',
    example: 'QmZ9t1XU9FBCyHXKfGVkjvCZEHjau8xTrLGrPFCQj6yeH1',
  })
  @Column()
  imageHash: string;

  @ApiProperty({
    description: 'The IPFS hash of the NFT metadata',
    example: 'QmZ9t1XU9FBCyHXKfGVkjvCZEHjau8xTrLGrPFCQj6yeH2',
  })
  @Column()
  metadataHash: string;

  @ApiProperty({
    description: 'The royalty basis points (e.g., 500 = 5%)',
    example: 500,
  })
  @Column({ default: 0 })
  royaltyBasisPoints: number;

  @ApiProperty({
    description: 'The listing price in SOL (null if not listed)',
    example: 1.5,
    required: false,
  })
  @Column({ type: 'decimal', precision: 18, scale: 9, nullable: true })
  listingPrice: number;

  @ApiProperty({
    description: 'Whether the NFT is currently listed for sale',
    example: false,
  })
  @Column({ default: false })
  isListed: boolean;

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
  @ManyToOne(() => User, (user) => user.ownedNFTs)
  owner: User;

  @Column()
  ownerWalletAddress: string;

  @ManyToOne(() => User, (user) => user.createdNFTs)
  creator: User;

  @Column()
  creatorWalletAddress: string;
}

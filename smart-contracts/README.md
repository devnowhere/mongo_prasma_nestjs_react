# NFT Marketplace Smart Contracts

This directory contains the smart contracts for the NFT Marketplace built using Solana and Anchor.

## Structure

- programs/: Solana programs (smart contracts) written in Rust
  - 
ft-marketplace/: Main NFT marketplace program
  - 	oken/: Token-related functionality
- pp/: TypeScript SDK for interacting with the smart contracts
- scripts/: Deployment and utility scripts
- 	ests/: End-to-end tests

## Development Setup

1. Install dependencies:
   `ash
   npm install
   `

2. Build the programs:
   `ash
   anchor build
   `

3. Generate TypeScript interfaces:
   `ash
   npm run generate-idl
   `

4. Run tests:
   `ash
   anchor test
   `

5. Deploy to a cluster:
   `ash
   anchor deploy
   `

## Functionalities

- Create NFTs
- List NFTs for sale
- Buy NFTs
- Token management (mint, transfer, burn)

## Documentation

For detailed documentation, see the comments in the source code or the [project wiki](https://example.com).

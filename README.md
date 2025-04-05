# Full-Stack Web3 NFT Marketplace

A complete full-stack Web3 application for creating, listing, and trading NFTs on Solana blockchain.

## Project Structure

- rontend/: Next.js frontend application
- ackend/: NestJS backend API
- smart-contracts/: Solana programs using Anchor framework

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+)
- Docker and Docker Compose (for local development)
- Solana CLI tools (for blockchain development)
- PowerShell (for running setup scripts)

### Setup

The project includes automated setup scripts to create the directory structure and files:

`ash
npm run setup
`

This will create all necessary directories and files for the project.

### Development

1. Install dependencies for all packages:

`ash
npm install
`

2. Start the development environment with Docker:

`ash
npm run docker:up
`

3. Run all services in development mode:

`ash
npm run dev
`

### Testing

`ash
npm test
`

## Features

- User authentication with wallet connection
- NFT creation and minting
- NFT marketplace (listing, buying)
- IPFS integration for metadata storage
- Comprehensive admin dashboard

## Technologies

### Frontend
- Next.js
- React
- TypeScript
- Styled Components
- Ethers.js / Web3.js

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Swagger API documentation

### Blockchain
- Solana
- Anchor framework
- Rust smart contracts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Project Frameworks and Platforms

## Backend
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications
  - Evidenced by: nest-cli.json, app.module.ts structure, controllers/services pattern
- **TypeScript**: Strongly typed programming language that builds on JavaScript
  - Evidenced by: .ts file extensions throughout the codebase

## Frontend
- **Next.js**: React framework for production
  - Evidenced by: next.config.js, _app.tsx, _document.tsx
- **React**: JavaScript library for building user interfaces
  - Evidenced by: JSX/TSX components structure, context system
- **Styled Components**: CSS-in-JS styling solution
  - Evidenced by: .styles.ts files in component directories

## Blockchain
- **Solana**: High-performance blockchain
  - Evidenced by: Anchor.toml, programs written in Rust
- **Anchor**: Framework for Solana smart contract development
  - Evidenced by: Anchor.toml configuration file
- **Rust**: Programming language used for Solana program development
  - Evidenced by: .rs files in the programs directory
- **Ethers.js**: Library for interacting with Ethereum
  - Evidenced by: utils/ethers.ts

## Storage
- **IPFS**: InterPlanetary File System, a protocol for distributed file storage
  - Evidenced by: ipfs directory in backend, utils/ipfs.ts in frontend

## Containerization
- **Docker**: Containerization platform
  - Evidenced by: Dockerfile in frontend and backend, docker-compose.yml

## Testing
- **Jest**: JavaScript testing framework
  - Evidenced by: jest-e2e.json in test directory

## Authentication
- **Wallet Authentication**: Crypto wallet-based authentication
  - Evidenced by: wallet-auth.guard.ts, ConnectWallet component

## Architecture
- **Microservices**: Modular architecture pattern
  - Evidenced by: separate modules for blockchain, IPFS, NFTs, users
- **Smart Contract Design Pattern**: For NFT marketplace
  - Evidenced by: marketplace.rs, nft.rs

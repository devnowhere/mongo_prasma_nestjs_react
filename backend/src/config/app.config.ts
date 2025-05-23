export const appConfig = () => ({
  port: parseInt(process.env.PORT) || 3001,
  environment: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'nft_marketplace',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  ipfs: {
    gateway: process.env.IPFS_GATEWAY || 'https://ipfs.io/ipfs/',
    apiUrl: process.env.IPFS_API_URL || 'https://api.pinata.cloud/pinning/',
    apiKey: process.env.IPFS_API_KEY || '',
    apiSecret: process.env.IPFS_API_SECRET || '',
  },
});

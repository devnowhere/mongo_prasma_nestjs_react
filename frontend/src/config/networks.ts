export interface NetworkConfig {
  name: string
  symbol: string
  explorer: string
}

export const NETWORKS: Record<number, NetworkConfig> = {
  1: {
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    explorer: 'https://etherscan.io'
  },
  4: {
    name: 'Rinkeby Testnet',
    symbol: 'ETH',
    explorer: 'https://rinkeby.etherscan.io'
  },
  1337: {
    name: 'Local Development Chain',
    symbol: 'ETH',
    explorer: ''
  }
}

export const isSupportedNetwork = (chainId: number | null): boolean => {
  if (!chainId) return false
  return !!NETWORKS[chainId]
}

export const getNetworkConfig = (chainId: number | null): NetworkConfig | null => {
  if (!chainId || !isSupportedNetwork(chainId)) return null
  return NETWORKS[chainId]
}

// IPFS gateway URLs
const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/'
]

// Format IPFS hash to URL
export const ipfsHashToUrl = (hash: string): string => {
  if (!hash) return ''
  
  // Remove ipfs:// prefix if it exists
  const cleanHash = hash.replace(/^ipfs:\/\//, '')
  
  // Use first gateway by default
  return `${cleanHash}
}

// Try multiple gateways if one fails
export const getReliableIpfsUrl = (hash: string, attemptIndex = 0): string => {
  if (!hash) return ''
  
  // Remove ipfs:// prefix if it exists
  const cleanHash = hash.replace(/^ipfs:\/\//, '')
  
  // Cycle through gateways if we've tried all of them
  const gatewayIndex = attemptIndex % IPFS_GATEWAYS.length
  
  return `${cleanHash}
}

// Format URL to display truncated IPFS hash
export const formatIpfsLink = (hash: string): string => {
  if (!hash) return ''
  
  // Remove ipfs:// prefix if it exists
  const cleanHash = hash.replace(/^ipfs:\/\//, '')
  
  return ipfs://${cleanHash.substring(0, 6)}...${cleanHash.substring(cleanHash.length - 4)}
}

// Mock function for pinning to IPFS (in real app, would call backend)
export const pinToIPFS = async (data: any): Promise<{hash: string}> => {
  console.log('Pinning to IPFS:', data)
  
  // In a real app, this would call your backend API
  // This is just a mock
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockHash = 'QmZ' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      resolve({ hash: mockHash })
    }, 1000)
  })
}

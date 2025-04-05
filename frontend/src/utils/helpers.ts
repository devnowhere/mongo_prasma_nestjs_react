// Format wallet address for display
export const formatAddress = (address: string | null): string => {
  if (!address) return ''
  return `...${address.substring(address.length - 4)}
}

// Format amount with appropriate number of decimal places
export const formatAmount = (amount: number, decimals = 4): string => {
  return amount.toFixed(decimals)
}

// Delay execution (useful for animations or simulating network latency in development)
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Generate a random ID (useful for temp IDs before blockchain confirmation)
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Simple validation helpers
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const isPositiveNumber = (value: number): boolean => {
  return !isNaN(value) && isFinite(value) && value > 0
}

import { ethers } from 'ethers'

// Get ethers provider
export const getProvider = async (requestAccounts = true): Promise<ethers.providers.Web3Provider> => {
  if (!window.ethereum) {
    throw new Error('No Ethereum wallet found. Please install MetaMask or another wallet.')
  }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  
  if (requestAccounts) {
    await provider.send('eth_requestAccounts', [])
  }
  
  return provider
}

// Parse units to Wei (with error handling)
export const parseUnits = (value: string, units = 'ether'): ethers.BigNumber => {
  try {
    return ethers.utils.parseUnits(value, units)
  } catch (error) {
    console.error('Error parsing units:', error)
    throw new Error('Invalid amount format')
  }
}

// Format units from Wei (with error handling)
export const formatUnits = (value: ethers.BigNumberish, units = 'ether'): string => {
  try {
    return ethers.utils.formatUnits(value, units)
  } catch (error) {
    console.error('Error formatting units:', error)
    return '0'
  }
}

// Sign a message
export const signMessage = async (provider: ethers.providers.Web3Provider, message: string): Promise<string> => {
  const signer = provider.getSigner()
  return await signer.signMessage(message)
}

// Get transaction receipt and wait for confirmation
export const getTransactionReceipt = async (
  provider: ethers.providers.Web3Provider,
  txHash: string,
  confirmations = 1
): Promise<ethers.providers.TransactionReceipt> => {
  return await provider.waitForTransaction(txHash, confirmations)
}

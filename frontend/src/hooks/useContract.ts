import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useWeb3 } from '@/context/Web3Context'
import { contractAddresses } from '@/config/contracts'

export const useContract = (contractName: string, abi: any) => {
  const { provider, chainId } = useWeb3()

  const getContract = useCallback(() => {
    if (!provider || !chainId) {
      throw new Error('Provider or chainId not available')
    }
    
    const address = contractAddresses[contractName]?.[chainId]
    if (!address) {
      throw new Error(Contract address not found for ${contractName} on chain ${chainId})
    }

    return new ethers.Contract(
      address,
      abi,
      provider.getSigner()
    )
  }, [provider, chainId, contractName, abi])

  const callContract = useCallback(async (method: string, ...args: any[]) => {
    try {
      const contract = getContract()
      return await contract[method](...args)
    } catch (error) {
      console.error(Error calling ${method}, error)
      throw error
    }
  }, [getContract])

  const sendTransaction = useCallback(async (method: string, ...args: any[]) => {
    try {
      const contract = getContract()
      const transaction = await contract[method](...args)
      return await transaction.wait()
    } catch (error) {
      console.error(Error sending transaction ${method}, error)
      throw error
    }
  }, [getContract])

  return {
    getContract,
    callContract,
    sendTransaction
  }
}

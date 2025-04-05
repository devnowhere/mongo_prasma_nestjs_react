import { useState, useEffect } from 'react'
import { useWeb3 } from '@/context/Web3Context'
import { ethers } from 'ethers'

export const useWallet = () => {
  const { provider, account, chainId, connecting, connected, connect, disconnect } = useWeb3()
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      if (provider && account) {
        try {
          const balanceWei = await provider.getBalance(account)
          const balanceEth = parseFloat(ethers.utils.formatEther(balanceWei))
          setBalance(balanceEth)
        } catch (error) {
          console.error('Error fetching balance', error)
          setBalance(null)
        }
      } else {
        setBalance(null)
      }
    }

    fetchBalance()

    // Setup interval to refresh balance
    const interval = setInterval(fetchBalance, 15000)
    
    return () => clearInterval(interval)
  }, [provider, account])

  return {
    provider,
    account,
    chainId,
    balance,
    connecting,
    connected,
    connect,
    disconnect
  }
}

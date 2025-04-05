import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'
import { getProvider } from '@/utils/ethers'

interface Web3ContextType {
  provider: ethers.providers.Web3Provider | null
  account: string | null
  chainId: number | null
  connecting: boolean
  connected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  account: null,
  chainId: null,
  connecting: false,
  connected: false,
  connect: async () => {},
  disconnect: () => {}
})

export const useWeb3 = () => useContext(Web3Context)

interface Web3ProviderProps {
  children: ReactNode
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  const connect = async () => {
    try {
      setConnecting(true)
      const web3Provider = await getProvider()
      
      const accounts = await web3Provider.listAccounts()
      const network = await web3Provider.getNetwork()
      
      setProvider(web3Provider)
      setAccount(accounts[0] || null)
      setChainId(network.chainId)
      setConnected(!!accounts[0])
    } catch (error) {
      console.error('Failed to connect to wallet', error)
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setProvider(null)
    setAccount(null)
    setChainId(null)
    setConnected(false)
  }

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      try {
        const web3Provider = await getProvider(false) // Don't prompt user
        const accounts = await web3Provider.listAccounts()
        
        if (accounts.length > 0) {
          const network = await web3Provider.getNetwork()
          setProvider(web3Provider)
          setAccount(accounts[0])
          setChainId(network.chainId)
          setConnected(true)
        }
      } catch (error) {
        // Silent fail - user might not have a wallet
      }
    }

    checkConnection()
  }, [])

  return (
    <Web3Context.Provider
      value={{
        provider,
        account,
        chainId,
        connecting,
        connected,
        connect,
        disconnect
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

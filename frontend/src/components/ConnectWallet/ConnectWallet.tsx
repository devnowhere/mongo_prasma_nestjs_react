import React from 'react'
import { useWallet } from '@/hooks/useWallet'
import { ConnectWalletButton } from './ConnectWalletButton'
import { StyledConnectWallet, WalletInfo, WalletAddress, WalletBalance, DisconnectButton } from './ConnectWallet.styles'

export const ConnectWallet: React.FC = () => {
  const { connected, account, balance, connect, disconnect } = useWallet()

  if (!connected) {
    return <ConnectWalletButton onClick={connect} />
  }

  return (
    <StyledConnectWallet>
      <WalletInfo>
        <WalletAddress>{account?.substring(0, 6)}...{account?.substring(account.length - 4)}</WalletAddress>
        <WalletBalance>{balance ? ` ETH : '0 ETH'}</WalletBalance>
      </WalletInfo>
      <DisconnectButton onClick={disconnect}>Disconnect</DisconnectButton>
    </StyledConnectWallet>
  )
}

import React from 'react'
import styled from 'styled-components'
import { Button } from '@/components/Button'

interface ConnectWalletButtonProps {
  onClick: () => void
}

const StyledButton = styled(Button)
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});


export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      Connect Wallet
    </StyledButton>
  )
}

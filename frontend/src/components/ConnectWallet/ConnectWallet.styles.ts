import styled from 'styled-components'

export const StyledConnectWallet = styled.div
  display: flex;
  align-items: center;
  gap: 0.75rem;


export const WalletInfo = styled.div
  display: flex;
  flex-direction: column;
  align-items: flex-end;


export const WalletAddress = styled.div
  font-family: ${({ theme }) => theme.fonts.monospace};
  font-weight: 500;


export const WalletBalance = styled.div
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};


export const DisconnectButton = styled.button
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.error};
  }

"@

 = @"
export * from './ConnectWallet'

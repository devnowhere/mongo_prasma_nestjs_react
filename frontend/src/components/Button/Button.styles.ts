import styled, { css } from 'styled-components'

export interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
}

export const StyledButton = styled.button<StyledButtonProps>
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${({ fullWidth }) => fullWidth && css
    width: 100%;
  }
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        
      case 'large':
        return css
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        
      default:
        return css
          padding: 0.625rem 1.25rem;
          font-size: 1rem;
        
    }
  }}
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css
          background-color: ${theme.colors.secondary};
          color: white;
          border: none;
          
          &:hover:not(:disabled) {
            background-color: #0DA271;
          }
        
      case 'outline':
        return css
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: rgba(59, 130, 246, 0.1);
          }
        
      case 'ghost':
        return css
          background-color: transparent;
          color: ${theme.colors.primary};
          border: none;
          
          &:hover:not(:disabled) {
            background-color: rgba(59, 130, 246, 0.1);
          }
        
      default:
        return css
          background-color: ${theme.colors.primary};
          color: white;
          border: none;
          
          &:hover:not(:disabled) {
            background-color: #2563EB;
          }
        
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

"@

 = @"
export * from './Button'

import styled, { css } from 'styled-components'

export const StyledNavbar = styled.nav
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;


export const NavbarContainer = styled.div
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;


export const Logo = styled.div
  display: flex;
  align-items: center;


export const NavLinks = styled.div
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }


interface StyledNavbarLinkProps {
  isActive: boolean
}

export const StyledNavbarLink = styled.a<StyledNavbarLinkProps>
  color: ${({ isActive, theme }) => isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }


export const NavbarActions = styled.div
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }


export const MobileMenuButton = styled.button
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }


export const StyledMobileMenu = styled.div
  position: fixed;
  top: 64px; /* Height of navbar */
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 40;


interface MobileMenuLinkProps {
  isActive: boolean
}

export const MobileMenuLink = styled.div<MobileMenuLinkProps>
  a {
    display: block;
    padding: 0.75rem;
    border-radius: 0.375rem;
    text-decoration: none;
    color: ${({ isActive, theme }) => isActive ? theme.colors.primary : theme.colors.text};
    font-weight: ${({ isActive }) => isActive ? '600' : '400'};
    
    ${({ isActive, theme }) => isActive && css
      background-color: rgba(59, 130, 246, 0.1);
    }
    
    &:hover {
      background-color: rgba(59, 130, 246, 0.1);
    }
  }

"@

 = @"
export * from './Navbar'

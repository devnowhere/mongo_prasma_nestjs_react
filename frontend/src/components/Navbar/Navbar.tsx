import React, { useState } from 'react'
import Link from 'next/link'
import { ConnectWallet } from '@/components/ConnectWallet'
import { NavbarLink } from './NavbarLink'
import { MobileMenu } from './MobileMenu'
import { StyledNavbar, NavbarContainer, Logo, NavLinks, NavbarActions, MobileMenuButton } from './Navbar.styles'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <StyledNavbar>
      <NavbarContainer>
        <Logo>
          <Link href="/">
            <img src="/assets/images/logo.png" alt="NFT Marketplace" height="40" />
          </Link>
        </Logo>
        
        <NavLinks>
          <NavbarLink href="/">Home</NavbarLink>
          <NavbarLink href="/nfts">Explore</NavbarLink>
          <NavbarLink href="/profile">My NFTs</NavbarLink>
        </NavLinks>
        
        <NavbarActions>
          <ConnectWallet />
        </NavbarActions>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </MobileMenuButton>
      </NavbarContainer>
      
      {mobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </StyledNavbar>
  )
}

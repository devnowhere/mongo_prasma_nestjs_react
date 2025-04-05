import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StyledMobileMenu, MobileMenuLink } from './Navbar.styles'

interface MobileMenuProps {
  onClose: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const router = useRouter()
  
  return (
    <StyledMobileMenu>
      <MobileMenuLink isActive={router.pathname === '/'} onClick={onClose}>
        <Link href="/">Home</Link>
      </MobileMenuLink>
      <MobileMenuLink isActive={router.pathname === '/nfts'} onClick={onClose}>
        <Link href="/nfts">Explore</Link>
      </MobileMenuLink>
      <MobileMenuLink isActive={router.pathname === '/profile'} onClick={onClose}>
        <Link href="/profile">My NFTs</Link>
      </MobileMenuLink>
    </StyledMobileMenu>
  )
}

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StyledNavbarLink } from './Navbar.styles'

interface NavbarLinkProps {
  href: string
  children: React.ReactNode
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ href, children }) => {
  const router = useRouter()
  const isActive = router.pathname === href
  
  return (
    <Link href={href} passHref>
      <StyledNavbarLink isActive={isActive}>
        {children}
      </StyledNavbarLink>
    </Link>
  )
}

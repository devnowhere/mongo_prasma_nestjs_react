import React from 'react'
import { StyledCard, CardHeader, CardBody, CardFooter } from './Card.styles'

export interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <StyledCard className={className}>
      {children}
    </StyledCard>
  )
}

export interface CardHeaderProps {
  children: React.ReactNode
}

Card.Header = function CardHeaderComponent({ children }: CardHeaderProps) {
  return <CardHeader>{children}</CardHeader>
}

export interface CardBodyProps {
  children: React.ReactNode
}

Card.Body = function CardBodyComponent({ children }: CardBodyProps) {
  return <CardBody>{children}</CardBody>
}

export interface CardFooterProps {
  children: React.ReactNode
}

Card.Footer = function CardFooterComponent({ children }: CardFooterProps) {
  return <CardFooter>{children}</CardFooter>
}

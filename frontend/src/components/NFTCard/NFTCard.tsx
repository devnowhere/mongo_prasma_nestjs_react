import React from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { StyledNFTCard, NFTImage, NFTTitle, NFTDescription, NFTPrice, NFTOwner } from './NFTCard.styles'

export interface NFTCardProps {
  id: string
  title: string
  image: string
  description: string
  price?: string
  owner: string
  isOwner: boolean
  onBuy?: () => void
  onList?: () => void
}

export const NFTCard: React.FC<NFTCardProps> = ({
  id,
  title,
  image,
  description,
  price,
  owner,
  isOwner,
  onBuy,
  onList
}) => {
  return (
    <StyledNFTCard>
      <Card>
        <NFTImage src={image} alt={title} />
        <Card.Body>
          <NFTTitle>{title}</NFTTitle>
          <NFTDescription>{description}</NFTDescription>
          <NFTOwner>Owner: {owner.substring(0, 6)}...{owner.substring(owner.length - 4)}</NFTOwner>
          {price && <NFTPrice>{price} ETH</NFTPrice>}
        </Card.Body>
        <Card.Footer>
          {price && !isOwner && (
            <Button onClick={onBuy} fullWidth>
              Buy Now
            </Button>
          )}
          {isOwner && !price && (
            <Button onClick={onList} variant="outline" fullWidth>
              List for Sale
            </Button>
          )}
        </Card.Footer>
      </Card>
    </StyledNFTCard>
  )
}

import React from 'react'
import { Card } from '@/components/Card'
import { SkeletonImage, SkeletonTitle, SkeletonDescription, SkeletonPrice, SkeletonFooter } from './NFTCard.styles'

export const NFTCardSkeleton: React.FC = () => {
  return (
    <Card>
      <SkeletonImage />
      <Card.Body>
        <SkeletonTitle />
        <SkeletonDescription />
        <SkeletonPrice />
      </Card.Body>
      <Card.Footer>
        <SkeletonFooter />
      </Card.Footer>
    </Card>
  )
}

import styled, { keyframes } from 'styled-components'

export const StyledNFTCard = styled.div
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }


export const NFTImage = styled.img
  width: 100%;
  height: 250px;
  object-fit: cover;


export const NFTTitle = styled.h3
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};


export const NFTDescription = styled.p
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;


export const NFTPrice = styled.div
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};


export const NFTOwner = styled.div
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;


// Skeleton loading animation
const shimmer = keyframes
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }


const SkeletonBase = styled.div
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.surface}, #2A3441, ${({ theme }) => theme.colors.surface});
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;


export const SkeletonImage = styled(SkeletonBase)
  width: 100%;
  height: 250px;


export const SkeletonTitle = styled(SkeletonBase)
  width: 70%;
  height: 24px;
  margin-bottom: 0.75rem;


export const SkeletonDescription = styled(SkeletonBase)
  width: 100%;
  height: 48px;
  margin-bottom: 1rem;


export const SkeletonPrice = styled(SkeletonBase)
  width: 50%;
  height: 28px;
  margin-top: 0.75rem;


export const SkeletonFooter = styled(SkeletonBase)
  width: 100%;
  height: 40px;

"@

 = @"
export * from './NFTCard'
export * from './NFTCardSkeleton'

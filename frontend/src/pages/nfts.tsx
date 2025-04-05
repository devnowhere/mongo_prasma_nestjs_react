import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Navbar } from '@/components/Navbar'
import { NFTCard } from '@/components/NFTCard'
import { NFTCardSkeleton } from '@/components/NFTCard'
import { useWallet } from '@/hooks/useWallet'
import { NFT } from '@/types'

const PageContainer = styled.div
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;


const PageTitle = styled.h1
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: 2rem;


const NFTGrid = styled.div
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }


export default function NFTsPage() {
  const { connected, account } = useWallet()
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true)
      
      // In a real app, this would fetch from your API/contract
      // This is just mock data
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockNFTs: NFT[] = Array(8).fill(null).map((_, i) => ({
        id: 
ft-${i},
        tokenId: i.toString(),
        contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        creator: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        metadata: {
          name: NFT #${i + 1},
          description: This is a description for NFT #${i + 1}. It is a beautiful and unique digital asset.,
          image: \/assets/images/placeholder.svg\
        },
        price: i % 3 === 0 ? (0.01 * (i + 1)).toString() : undefined,
        isListed: i % 3 === 0
      }))
      
      setNfts(mockNFTs)
      setLoading(false)
    }
    
    fetchNFTs()
  }, [])

  const handleBuyNFT = (id: string) => {
    console.log('Buy NFT', id)
    // In a real app, this would open a modal and call your contract
  }

  return (
    <>
      <Head>
        <title>Explore NFTs | Web3 NFT Marketplace</title>
      </Head>
      <Navbar />
      <PageContainer>
        <PageTitle>Explore NFTs</PageTitle>
        
        <NFTGrid>
          {loading ? (
            // Show skeletons while loading
            Array(8).fill(null).map((_, index) => (
              <NFTCardSkeleton key={skeleton-${index}} />
            ))
          ) : (
            // Show actual NFTs
            nfts.map(nft => (
              <NFTCard
                key={nft.id}
                id={nft.id}
                title={nft.metadata.name}
                image={nft.metadata.image}
                description={nft.metadata.description}
                price={nft.price}
                owner={nft.owner}
                isOwner={connected && account === nft.owner}
                onBuy={() => handleBuyNFT(nft.id)}
                onList={() => console.log('List NFT', nft.id)}
              />
            ))
          )}
        </NFTGrid>
      </PageContainer>
    </>
  )
}

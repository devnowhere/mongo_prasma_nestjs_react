import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Navbar } from '@/components/Navbar'
import { NFTCard } from '@/components/NFTCard'
import { NFTCardSkeleton } from '@/components/NFTCard'
import { Button } from '@/components/Button'
import { useWallet } from '@/hooks/useWallet'
import { NFT } from '@/types'

const PageContainer = styled.div
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;


const ProfileHeader = styled.div
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }


const ProfileAvatar = styled.div
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 2rem;
    margin-bottom: 0;
  }


const ProfileInfo = styled.div
  flex: 1;


const ProfileAddress = styled.div
  font-family: ${({ theme }) => theme.fonts.monospace};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};


const ProfileName = styled.h1
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: 1rem;


const ProfileBio = styled.p
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  max-width: 600px;


const TabsContainer = styled.div
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;


interface TabProps {
  active: boolean
}

const Tab = styled.button<TabProps>
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active }) => active ? '600' : '400'};
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  margin-right: 1rem;


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


const EmptyState = styled.div
  text-align: center;
  padding: 3rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};


export default function ProfilePage() {
  const router = useRouter()
  const { connected, account } = useWallet()
  const [activeTab, setActiveTab] = useState('owned')
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!connected) {
      router.push('/')
    }
  }, [connected, router])

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true)
      
      // In a real app, this would fetch from your API/contract
      // This is just mock data
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (activeTab === 'owned') {
        const mockNFTs: NFT[] = Array(5).fill(null).map((_, i) => ({
          id: 
ft-owned-${i},
          tokenId: i.toString(),
          contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          owner: account || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
          creator: i % 2 === 0 ? (account || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266') : '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          metadata: {
            name: Owned NFT #${i + 1},
            description: This is a description for NFT #${i + 1}. It is a beautiful and unique digital asset.,
            image: \/assets/images/placeholder.svg\
          },
          price: i % 4 === 0 ? (0.01 * (i + 1)).toString() : undefined,
          isListed: i % 4 === 0
        }))
        
        setNfts(mockNFTs)
      } else if (activeTab === 'created') {
        const mockNFTs: NFT[] = Array(3).fill(null).map((_, i) => ({
          id: 
ft-created-${i},
          tokenId: i.toString(),
          contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          owner: i % 2 === 0 ? (account || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266') : '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
          creator: account || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
          metadata: {
            name: Created NFT #${i + 1},
            description: This is a description for NFT #${i + 1}. It is a beautiful and unique digital asset.,
            image: \/assets/images/placeholder.svg\
          },
          price: i % 3 === 0 ? (0.015 * (i + 1)).toString() : undefined,
          isListed: i % 3 === 0
        }))
        
        setNfts(mockNFTs)
      }
      
      setLoading(false)
    }
    
    if (connected) {
      fetchNFTs()
    }
  }, [connected, account, activeTab])

  if (!connected) {
    return null
  }

  return (
    <>
      <Head>
        <title>My Profile | Web3 NFT Marketplace</title>
      </Head>
      <Navbar />
      <PageContainer>
        <ProfileHeader>
          <ProfileAvatar>
            {account ? account.substr(2, 2).toUpperCase() : '??'}
          </ProfileAvatar>
          <ProfileInfo>
            <ProfileAddress>
              {account}
            </ProfileAddress>
            <ProfileName>My Collection</ProfileName>
            <ProfileBio>
              Welcome to your NFT collection. Here you can view all the NFTs you own and have created.
            </ProfileBio>
            <Button variant="outline" size="small">Edit Profile</Button>
          </ProfileInfo>
        </ProfileHeader>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'owned'} 
            onClick={() => setActiveTab('owned')}
          >
            Owned
          </Tab>
          <Tab 
            active={activeTab === 'created'} 
            onClick={() => setActiveTab('created')}
          >
            Created
          </Tab>
        </TabsContainer>
        
        {loading ? (
          <NFTGrid>
            {Array(4).fill(null).map((_, index) => (
              <NFTCardSkeleton key={skeleton-${index}} />
            ))}
          </NFTGrid>
        ) : nfts.length > 0 ? (
          <NFTGrid>
            {nfts.map(nft => (
              <NFTCard
                key={nft.id}
                id={nft.id}
                title={nft.metadata.name}
                image={nft.metadata.image}
                description={nft.metadata.description}
                price={nft.price}
                owner={nft.owner}
                isOwner={connected && account === nft.owner}
                onBuy={() => console.log('Buy NFT', nft.id)}
                onList={() => console.log('List NFT', nft.id)}
              />
            ))}
          </NFTGrid>
        ) : (
          <EmptyState>
            <p>No NFTs found in this category.</p>
            {activeTab === 'owned' && (
              <Button onClick={() => router.push('/nfts')} variant="outline" style={{ marginTop: '1rem' }}>
                Browse NFTs
              </Button>
            )}
            {activeTab === 'created' && (
              <Button variant="outline" style={{ marginTop: '1rem' }}>
                Create NFT
              </Button>
            )}
          </EmptyState>
        )}
      </PageContainer>
    </>
  )
}

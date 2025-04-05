import Head from 'next/head'
import { Navbar } from '@/components/Navbar'
import { useWallet } from '@/hooks/useWallet'

export default function Home() {
  const { connected, connect } = useWallet()

  return (
    <>
      <Head>
        <title>Web3 NFT Marketplace</title>
      </Head>
      <Navbar />
      <main>
        <h1>Welcome to Web3 NFT Marketplace</h1>
        {!connected && (
          <button onClick={connect}>Connect Wallet</button>
        )}
      </main>
    </>
  )
}

import { AppProps } from 'next/app'
import { Web3Provider } from '@/context/Web3Context'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import '@/styles/global.ts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Web3Provider>
  )
}

export default MyApp

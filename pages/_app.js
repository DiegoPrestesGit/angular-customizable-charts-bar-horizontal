import '../styles/globals.scss'
import { Changa_One } from '@next/font/google'
import { AuthProvider, ProtectRoute } from '../components/firebase/context'
import NoSSR from 'react-no-ssr'

const changaOne = Changa_One({ weight: '400', subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <AuthProvider>
        <ProtectRoute>
          <main className={changaOne.className}>
            <Component {...pageProps} />
          </main>
        </ProtectRoute>
      </AuthProvider>
    </NoSSR>
  )
}

export default MyApp

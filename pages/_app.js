import '../styles/globals.scss'
import { Changa_One } from '@next/font/google'
import { AuthProvider, ProtectRoute } from '../components/firebase/context'

const changaOne = Changa_One({ weight: '400', subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProtectRoute>
        <main className={changaOne.className}>
          <Component {...pageProps} />
        </main>
      </ProtectRoute>
    </AuthProvider>
  )
}

export default MyApp

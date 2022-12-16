import '../styles/globals.scss'
import { Changa_One } from '@next/font/google'
import AuthUserProvider from '../components/firebase/context'

const changaOne = Changa_One({ weight: '400', subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <main className={changaOne.className}>
        <Component {...pageProps} />
      </main>
    </AuthUserProvider>
  )
}

export default MyApp

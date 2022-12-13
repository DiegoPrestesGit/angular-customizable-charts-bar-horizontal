import '../styles/globals.scss'
import { Changa_One } from '@next/font/google'

const changaOne = Changa_One({ weight: '400', subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <main className={changaOne.className}>
      <Component {...pageProps} />{' '}
    </main>
  )
}

export default MyApp

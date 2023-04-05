import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import firebaseApp from '../providers/firebase-app'
import styles from '../styles/Home.module.scss'
import { useContext, useState } from 'react'
import Router, { withRouter } from 'next/router'
import { AuthContext } from '../components/firebase/context'
import axios from 'axios'

function Home() {
  firebaseApp()
  const googleProvider = new GoogleAuthProvider()
  const authProvider = getAuth()

  const authContext = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [loading, isLoading] = useState(false) // TODO: loading (for later)

  const change = (email) => {
    if (email == null) email = ''
    setEmail(email)
  }

  const signInWithEmail = async (email) => {
    try {
      const res = await axios.get(
        `${process.env.GO_CRUD}/api/v1/user/get-by-email?email=${email}`
      )

      if (res.status == 200)
        Router.push({ pathname: '/login', query: { email } })
    } catch (err) {
      console.error('signInWithEmail error', err)
      if (err && err.response && err.response.status == 404)
        Router.push({ pathname: '/sign-in', query: { email } })
    }
  }

  const createAccount = () => Router.push({ pathname: '/sign-in' })

  const signInWithGoogle = async () => {
    try {
      const authRes = await signInWithPopup(authProvider, googleProvider)

      const body = {
        email: authRes.user.email,
        displayName: authRes.user.displayName,
      }

      const { data: user } = await axios.post(
        `${process.env.GO_CRUD}/api/v1/user/create`,
        body
      )
      // console.log(user, authRes)
      authContext.setUserAuthInfo(authRes.user, authRes._tokenResponse, user)
    } catch (err) {
      console.error('signInWithGoogle error', { err, errCode: err.code })
    }
  }

  return (
    <div className={styles.fullContent}>
      <div className={styles.top}>
        <div className={styles.logo}>
          REALLY <br />
          NICE <br />
          LOGO
        </div>
        <button onClick={() => createAccount()}>CRIAR CONTA</button>
      </div>
      <div>
        <div className={styles.center}>
          <strong className={styles.bigOlText}>
            DESCOBRINDO FILMES E SÉRIES ATRAVÉS DA RECOMENDAÇÃO
          </strong>

          <p className={styles.thinText}>
            Digite seu e-mail e comece a explorar a coleção.
          </p>
          <div className={styles.fullInput}>
            <input
              type="email"
              value={email}
              onChange={(event) => change(event.target.value)}
              placeholder="E-MAIL"
            />
            <button onClick={() => signInWithEmail(email)}>ENTRAR</button>
          </div>
          <div className={styles.loginGoogle}>
            <button onClick={() => signInWithGoogle()}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
              <p>Entrar com Google</p>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

export default withRouter(Home)

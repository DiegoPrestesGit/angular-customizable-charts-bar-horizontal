import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import firebaseApp from '../providers/firebase-app'
import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import Router from 'next/router'

export default function Home() {
  firebaseApp()
  const googleProvider = new GoogleAuthProvider()
  const authProvider = getAuth()

  const [email, setEmail] = useState('')
  const [loading, isLoading] = useState(false) // TODO: loading (for later)

  const change = (email) => {
    if (email == null) email = ''
    setEmail(email)
  }

  const signInWithEmail = async (email) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/user-by-email?email=${email}`
      )

      if (res.status == 404)
        Router.push({ pathname: '/sign-in', query: { email } })

      if (res.status == 200)
        Router.push({ pathname: '/login', query: { email } })
    } catch (err) {
      console.error('signInWithEmail error', err)
    }
  }

  const createAccount = () => Router.push({ pathname: '/sign-in' })

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(authProvider, googleProvider)
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

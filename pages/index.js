import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import firebaseApp from '../providers/firebase-app'
import styles from '../styles/Home.module.scss'
import AuthUserProvider from '../components/firebase/context'
import { useContext, useState } from 'react'

export default function Home() {
  firebaseApp()
  const googleProvider = new GoogleAuthProvider()
  const authProvider = getAuth()

  const [email, setEmail] = useState('')

  const change = (email) => {
    if (email == null) email = ''
    setEmail(email)
  }

  const signIn = async () => {
    const res = await signInWithPopup(authProvider, googleProvider)
    // const res = await signInWithEmailAndPassword(
    //   authProvider,
    //   'diegosousaflo@hotmail.com',
    //   'Kalisto@123'
    // )
    console.log(res)
  }

  return (
    <div className={styles.fullContent}>
      <div className={styles.logo}>
        REALLY <br />
        NICE <br />
        LOGO
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
            <button onClick={() => signIn()}>ENTRAR</button>
          </div>
          <div className={styles.loginGoogle}>
            <button onClick={() => console.log('GO!')}>
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

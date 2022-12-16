import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import firebaseApp from '../providers/firebase-app'
import styles from '../styles/Home.module.scss'

export default function Home() {
  firebaseApp()
  const googleProvider = new GoogleAuthProvider()
  const authProvider = getAuth()

  const signIn = async () => {
    const res = await signInWithPopup(authProvider, googleProvider)
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
            <input type="email" placeholder="E-MAIL" />
            <button onClick={() => signIn()}>ENTRAR</button>
          </div>
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

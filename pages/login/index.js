import styles from '../../styles/Login.module.scss'

export default function Home() {
  return (
    <div className={styles.fullContent}>
      <div className={styles.logo}>
        REALLY <br />
        NICE <br />
        LOGO
      </div>
      <div className={styles.blackCenter}>
        <strong className={styles.signInText}>Login</strong>
        <div className={styles.center}>
          <div className={styles.fullInput}>
            <input type="email" placeholder="E-MAIL" />
            <input type="password" placeholder="SENHA" />
          </div>
          <button onClick={() => console.log('GO!')}>ENTRAR</button>
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

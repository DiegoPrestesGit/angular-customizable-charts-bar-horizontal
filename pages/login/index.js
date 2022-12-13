import styles from '../../styles/Signin.module.scss'

export default function Home() {
  return (
    <div className={styles.fullContent}>
      <div className={styles.logo}>
        REALLY <br />
        NICE <br />
        LOGO
      </div>
      <div className={styles.blackCenter}>
        <div className={styles.center}>
          <strong className={styles.signInText}>Login</strong>
          <div className={styles.fullInput}>
            <input type="email" placeholder="E-MAIL" />
            <input type="password" placeholder="SENHA" />
            <input type="password" placeholder="CONFIRME A SENHA" />
            <input type="text" placeholder="COMO PREFERE SER CHAMADO?" />
          </div>
          <button onClick={() => console.log('GO!')}>ENTRAR</button>
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

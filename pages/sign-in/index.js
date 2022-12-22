import { withRouter } from 'next/router'
import { useState } from 'react'
import styles from '../../styles/Signin.module.scss'

function SignIn({ router, ...props }) {
  const [email, setEmail] = useState(
    router && router.query && router.query.email ? router.query.email : ''
  )

  return (
    <div className={styles.fullContent}>
      <div className={styles.logo}>
        REALLY <br />
        NICE <br />
        LOGO
      </div>
      <div className={styles.blackCenter}>
        <strong className={styles.signInText}>Cadastro</strong>
        <div className={styles.center}>
          <div className={styles.fullInput}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-MAIL"
            />
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

export default withRouter(SignIn)

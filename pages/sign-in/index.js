import { withRouter } from 'next/router'
import { useState } from 'react'
import styles from '../../styles/Signin.module.scss'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { emailValidator } from '../../utils/email-validator'
import Image from 'next/image'

function SignIn({ router, ...props }) {
  const [email, setEmail] = useState(
    router && router.query && router.query.email ? router.query.email : ''
  )
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState({ showError: false, msg: '' })

  const createUser = async () => {
    if (!email || !password || !confirmPassword || !displayName) {
      setError({ showError: true, msg: 'preencha todos os campos!' })
      return
    }
    if (emailValidator(email) == null) {
      setError({ showError: true, msg: 'não é um e-mail válido!' })
      return
    }
    if (password !== confirmPassword) {
      setError({
        showError: true,
        msg: 'a senha e a confirmação de senha precisam estar iguais!',
      })
      return
    }
    setError({ showError: false, msg: '' })

    const body = JSON.stringify({
      email,
      displayName,
      password,
      confirmPassword,
    })

    const res = await fetch('http://localhost:8080/api/v1/user', {
      method: 'POST',
      body,
    })

    const responseData = await res.json()

    if (responseData && responseData.message == 'user already exists') {
      setError({ showError: true, msg: 'esse e-mail já foi cadastrado!' })
      return
    }

    if (res.status != 200) {
      setError({
        showError: true,
        msg: 'ocorreu um erro inesperado e não estávamos esperando por isso!',
      })
      return
    }

    // createUserWithEmailAndPassword()
  }

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
            <input
              type="password"
              placeholder="SENHA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="CONFIRME A SENHA"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="COMO PREFERE SER CHAMADO?"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <button onClick={() => createUser()}>ENTRAR</button>
          {error.showError && (
            <div className={styles.wrong}>
              <Image
                src={'/thinking-emoji.png'}
                alt={'thinking emoji'}
                width={80}
                height={80}
              />
              <p>{error.msg}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

export default withRouter(SignIn)

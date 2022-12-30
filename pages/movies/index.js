import { withRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '../../components/firebase/context'
import styles from '../../styles/Movies.module.scss'

function Movies() {
  const authContext = useContext(AuthContext)
  return (
    <div className={styles.fullContent}>
      <div className={styles.top}>
        <div className={styles.logo}>
          REALLY <br />
          NICE <br />
          LOGO
        </div>
        <button onClick={() => authContext.removeUserAuthInfo()}>SAIR</button>
      </div>
      <div>
        <div className={styles.center}>
          <strong className={styles.bigOlText}>
            UH YEAH, YOU ARE LOGGED IN, BABY
          </strong>
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

export default withRouter(Movies)

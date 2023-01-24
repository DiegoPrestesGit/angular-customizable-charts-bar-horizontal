import { withRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '../../components/firebase/context'
import styles from '../../styles/Movies.module.scss'
import Movie from '../../components/movie'

function Movies() {
  const authContext = useContext(AuthContext)

  const userInfo = authContext.getUserInfo()

  return (
    <div className={styles.fullContent}>
      <div className={styles.top}>
        <div className={styles.logo}>
          REALLY <br />
          NICE <br />
          LOGO
        </div>
        <div className="right-side">
          <strong className={styles.bigOlText}>
            Bem-vindo, {userInfo && userInfo.user && userInfo.user.displayName}
          </strong>
          <button onClick={() => authContext.removeUserAuthInfo()}>SAIR</button>
        </div>
      </div>
      <div>
        <Movie />
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

export default withRouter(Movies)

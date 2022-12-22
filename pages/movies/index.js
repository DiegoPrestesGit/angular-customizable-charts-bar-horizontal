import { withRouter } from 'next/router'
import styles from '../../styles/Home.module.scss'

function Movies() {
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
            UH YEAH, YOU ARE LOGGED IN, BABY
          </strong>
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

export default withRouter(Movies)

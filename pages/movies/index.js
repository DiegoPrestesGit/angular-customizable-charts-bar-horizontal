import styles from '../../styles/Home.module.scss'

export default function Home() {
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

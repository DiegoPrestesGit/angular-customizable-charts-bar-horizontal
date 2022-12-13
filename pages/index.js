import styles from '../styles/Home.module.scss'

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
            DESCOBRINDO FILMES E SÉRIES ATRAVÉS DA RECOMENDAÇÃO
          </strong>

          <p className={styles.thinText}>
            Digite seu e-mail e comece a explorar a coleção.
          </p>
          <div className={styles.fullInput}>
            <input type="email" placeholder="E-MAIL" />
            <button onClick={() => console.log('GO!')}>ENTRAR</button>
          </div>
        </div>
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

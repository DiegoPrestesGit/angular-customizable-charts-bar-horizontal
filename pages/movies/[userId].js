import { withRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '../../components/firebase/context'
import styles from '../../styles/Movies.module.scss'
import Movie from '../../components/movie'
import mockMovies from '../../mock-sample.json'

function Movies({ props: { userRatings }, ...context }) {
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
      <div className={styles.movieList}>
        {mockMovies.map((singleMovie) => {
          const rated = userRatings.find(
            (rating) => rating.movieId == singleMovie.id
          )

          return (
            <Movie
              movieData={singleMovie}
              key={singleMovie.id}
              userId={userInfo && userInfo.user.userId}
              movieRating={(rated && rated.ratingValue) || 0}
            />
          )
        })}
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

Movies.getInitialProps = async (context) => {
  const resUserRatings = await fetch(
    `${process.env.GO_CRUD}/api/v1/rating-by-user?userId=${context.query.userId}`
  )
  const userRatings = await resUserRatings.json()

  return { props: { userRatings } }
}

export default withRouter(Movies)

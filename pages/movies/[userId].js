import { withRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '../../components/firebase/context'
import styles from '../../styles/Movies.module.scss'
import Movie from '../../components/movie'
import mockMovies from '../../mock-sample.json'

function Movies({ myUser, myctx, ...props }) {
  const [userRatings, setUserRatings] = useState([])

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
        {mockMovies.map((singleMovie) => (
          <Movie
            movieData={singleMovie}
            key={singleMovie.id}
            userId={userInfo && userInfo.user.userId}
          />
        ))}
      </div>
      <div className={styles.shining}></div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   console.log('HJAHAHA', context)
//   const userRatings = await fetch(`${process.env.GO_CRUD}/api/v1/rating-by-user?userId=${}`, {method: 'GET'})

//   return {
//     props: { userRatings: 'BONHA' },
//   }
// }

Movies.getInitialProps = async (context) => {
  console.log('AAA', context)
  return { props: {} }
}

export default withRouter(Movies)

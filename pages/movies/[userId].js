import { withRouter } from 'next/router'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../components/firebase/context'
import styles from '../../styles/Movies.module.scss'
import Movie from '../../components/movie'
import mockMovies from '../../mock-sample.json'
import { HiMagnifyingGlass } from 'react-icons/hi2'

function Movies({ props: { userRatings }, ...context }) {
  const authContext = useContext(AuthContext)
  const userInfo = authContext.getUserInfo()

  const [isSearch, setIsSearch] = useState(false)
  const [findedMovies, setFindedMovies] = useState([])
  const searchInputRef = useRef()

  const searchMovie = () => {
    const searchValue = searchInputRef.current.value
    if (searchValue == '') {
      setIsSearch(false)
      return
    }
    const findIt = mockMovies.filter((mov) => mov.title.includes(searchValue))
    setIsSearch(true)
    setFindedMovies(findIt)
  }

  return (
    <div className={styles.fullContent}>
      <div className={styles.top}>
        <div className={styles.logo}>
          REALLY <br />
          NICE <br />
          LOGO
        </div>
        <div className={styles.withSearch}>
          <div className="right-side">
            <strong className={styles.bigOlText}>
              Bem-vindo,{' '}
              {userInfo && userInfo.user && userInfo.user.displayName}
            </strong>
            <button onClick={() => authContext.removeUserAuthInfo()}>
              SAIR
            </button>
          </div>
          <div className={styles.fullInput}>
            <input
              type="text"
              ref={searchInputRef}
              placeholder="PROCURAR FILME"
            />
            <button onClick={() => searchMovie()}>
              <HiMagnifyingGlass />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.movieList}>
        {isSearch
          ? findedMovies.map((singleMovie) => {
              const rated = userRatings
                ? userRatings.find((rating) => rating.movieId == singleMovie.id)
                : undefined

              return (
                <Movie
                  movieData={singleMovie}
                  key={singleMovie.id}
                  userId={userInfo && userInfo.user.userId}
                  movieRating={(rated && rated.ratingValue) || 0}
                />
              )
            })
          : mockMovies.map((singleMovie) => {
              const rated = userRatings
                ? userRatings.find((rating) => rating.movieId == singleMovie.id)
                : undefined

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

  const ratingsJson = await resUserRatings.json()
  const userRatings = ratingsJson != null ? ratingsJson : []

  return { props: { userRatings } }
}

export default withRouter(Movies)

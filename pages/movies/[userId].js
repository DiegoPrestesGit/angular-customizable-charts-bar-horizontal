import { withRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../components/firebase/context'
import styles from '../../styles/Movies.module.scss'
import Movie from '../../components/movie'
import moviesFullData from '../../mock-movies.json'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import PaginationNumber from '../../components/pagination-number'

function Movies({ props: { userRatings }, ...context }) {
  const authContext = useContext(AuthContext)
  const userInfo = authContext.getUserInfo()

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [isRecommendation, setIsRecommendation] = useState(false)

  const moviesPerPage = 200
  const totalPages = Math.ceil(moviesFullData.length / moviesPerPage)

  useEffect(() => {
    const currentPageMovies = moviesFullData.slice(
      (page - 1) * moviesPerPage,
      page * moviesPerPage
    )
    setMovies(currentPageMovies)
  }, [])

  useEffect(() => {
    const currentPageMovies = moviesFullData.slice(
      (page - 1) * moviesPerPage,
      page * moviesPerPage
    )
    setMovies(currentPageMovies)
  }, [page])

  const [isSearch, setIsSearch] = useState(false)
  const [findedMovies, setFindedMovies] = useState([])
  const searchInputRef = useRef()

  const recommendations = async () => {
    const userId = userInfo.user.userId
    const recommended = await (
      await fetch(`http://localhost:5000/api?userId=${userId}`)
    ).json()

    const recommendedMovies = moviesFullData.filter((dataMovie) =>
      recommended.some((recMovie) => recMovie == dataMovie.id)
    )
    setMovies(recommendedMovies)
  }

  const searchMovie = () => {
    const searchValue = searchInputRef.current.value
    if (searchValue == '') {
      setIsSearch(false)
      return
    }
    const findIt = moviesFullData.filter((mov) =>
      mov.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    setIsSearch(true)
    setFindedMovies(findIt)
  }

  return (
    <>
      <div className={styles.fullContent}>
        <div className={styles.top}>
          <div className={styles.leftSide}>
            <div className={styles.logo}>
              REALLY <br />
              NICE <br />
              LOGO
            </div>
            <div className={styles.leftSideTwo}>
              <p>
                Qnt. de filmes avaliados: <strong>{userRatings.length}</strong>
              </p>
              <button onClick={recommendations}>RECOMENDAÇÕES</button>
            </div>
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
                  ? userRatings.find(
                      (rating) => rating.movieId == singleMovie.id
                    )
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
            : movies.map((singleMovie) => {
                const rated = userRatings
                  ? userRatings.find(
                      (rating) => rating.movieId == singleMovie.id
                    )
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
        {!isSearch && (
          <PaginationNumber
            totalPageNumber={totalPages}
            currentPage={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
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

import { withRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../components/firebase/context'
import styles from '../../styles/Movies.module.scss'
import Movie from '../../components/movie'
import moviesFullData from '../../movies.json'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import PaginationNumber from '../../components/pagination-number'
import axios from 'axios'
import Image from 'next/image'

function Movies({ props: { userRatings }, ...context }) {
  const authContext = useContext(AuthContext)
  const userInfo = authContext.getUserInfo()

  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState(moviesFullData)

  const moviesPerPage = 200
  const totalPages = Math.ceil(allMovies.length / moviesPerPage)

  const [movies, setMovies] = useState([])

  const [training, setTraining] = useState(false)
  const [shouldTrain, setShouldTrain] = useState(false)

  useEffect(() => {
    const currentPageMovies = allMovies.slice(
      (page - 1) * moviesPerPage,
      page * moviesPerPage
    )
    setMovies(currentPageMovies)
  }, [])

  useEffect(() => {
    const currentPageMovies = allMovies.slice(
      (page - 1) * moviesPerPage,
      page * moviesPerPage
    )
    setMovies(currentPageMovies)
  }, [page, allMovies])

  const [isSearch, setIsSearch] = useState(false)
  const [findedMovies, setFindedMovies] = useState([])
  const searchInputRef = useRef()

  const recommendations = async () => {
    const userId = userInfo.user.userId
    const { data: moviesRecommended, status } = await axios.get(
      `${process.env.RECOMMENDER}/api?userId=${userId}`
    )

    if (status == 500) setShouldTrain(true)

    const showTheseMoviesInOrder = []
    for (let i = 0; i < moviesRecommended.length; i++) {
      const movieRecommendedId = moviesRecommended[i].movie_id
      if (userRatings.some((rating) => rating.movieId == movieRecommendedId)) {
        continue
      }
      const rightMovieToRecommendIndex = moviesFullData.findIndex(
        (mov) => mov.kaggleId == movieRecommendedId
      )
      showTheseMoviesInOrder.push(moviesFullData[rightMovieToRecommendIndex])
    }

    setAllMovies(showTheseMoviesInOrder)
  }

  const trainRecommender = async () => {
    setShouldTrain(false)
    try {
      setTraining(true)
      await axios.get(`${process.env.RECOMMENDER}/train`)
      setTraining(false)
    } catch (err) {
      console.log('trainRecommender err', err)
      setTraining(false)
    }
  }

  const searchMovie = () => {
    const searchValue = searchInputRef.current.value
    if (searchValue == '') {
      setIsSearch(false)
      return
    }
    const findIt = allMovies.filter((mov) =>
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
              <div className={styles.buttons}>
                <button
                  onClick={recommendations}
                  disabled={userRatings.length > 25 ? false : true}
                >
                  RECOMENDAÇÕES
                </button>
                <button
                  onClick={trainRecommender}
                  disabled={userRatings.length > 25 ? false : true}
                >
                  TREINAMENTO
                </button>
                {training ? (
                  <>
                    <Image
                      src={'/thinking-n-training.gif'}
                      alt={'thinking emoji'}
                      width={30}
                      height={30}
                    />
                    <p>treinando!</p>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {userRatings.length < 25 ? (
                <p>
                  Recomendações e Treinamento disponíveis a partir de 25 filmes
                </p>
              ) : (
                <></>
              )}
              {shouldTrain ? (
                <p>
                  Oh, acho que preciso treinar antes de te recomendar algo ;-;
                </p>
              ) : (
                <></>
              )}
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
            ? findedMovies.map((singleMovie, index) => {
                const rated = userRatings
                  ? userRatings.find(
                      (rating) => rating.movieId == singleMovie.kaggleId
                    )
                  : undefined

                return (
                  <Movie
                    movieData={singleMovie}
                    key={`f${index}`}
                    userId={userInfo && userInfo.user.userId}
                    movieRating={(rated && rated.ratingValue) || 0}
                  />
                )
              })
            : movies.map((singleMovie, index) => {
                const rated = userRatings
                  ? userRatings.find(
                      (rating) => rating.movieId == singleMovie.kaggleId
                    )
                  : undefined

                return (
                  <Movie
                    movieData={singleMovie}
                    key={index}
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
  const { data: ratingsJson } = await axios.get(
    `${process.env.TS_CRUD}/api/v1/rating/get-by-user?userId=${context.query.userId}`
  )

  const userRatings = ratingsJson != null ? ratingsJson : []

  return { props: { userRatings } }
}

export default withRouter(Movies)

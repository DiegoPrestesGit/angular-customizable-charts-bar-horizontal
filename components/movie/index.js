import React, { useState } from 'react'
import styles from '../../styles/Movie.module.scss'
// import Rating from '../rating'
import { Rating } from 'react-simple-star-rating'

export default function Movie({ movieData, userId, ...props }) {
  const [rating, setRating] = useState(0)

  const handleRating = async (ratingValue) => {
    setRating(ratingValue)

    const body = JSON.stringify({
      userId: userId,
      movieId: movieData.id.toString(),
      ratingValue,
    })
    fetch(`${process.env.GO_CRUD}/api/v1/rating`, {
      method: 'POST',
      body,
    })
  }

  return (
    <div className={styles.fullMovie}>
      {/* <Rating /> */}
      <Rating onClick={handleRating} allowFraction={true} size={24} />
      <img src={`${process.env.TMDB_POSTER_HOST}${movieData.poster_path}`} />
      <strong>
        {movieData.title} ({movieData.release_date.substr(0, 4)})
      </strong>
    </div>
  )
}

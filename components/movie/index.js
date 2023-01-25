import React, { useState } from 'react'
import styles from '../../styles/Movie.module.scss'
// import Rating from '../rating'
import { Rating } from 'react-simple-star-rating'

export default function Movie({ movieData, ...props }) {
  const [rating, setRating] = useState(0)

  const handleRating = (rate) => {
    setRating(rate)
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

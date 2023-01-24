import styles from '../../styles/Movie.module.scss'

// {
//   "backdrop_path": "/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg",
//   "id": 862,
//   "title": "Toy Story",
//   "original_title": "Toy Story",
//   "poster_path": "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
//   "vote_average": 7.965,
//   "genres": "Adventure|Animation|Children|Comedy|Fantasy"
// }
export default function Movie() {
  console.log(process.env.TMDB_POSTER_HOST)
  return <div className={styles.fullMovie}>MA MOVIE</div>
}

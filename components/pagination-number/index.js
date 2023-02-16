import React from 'react'
import styles from '../../styles/PaginationNumber.module.scss'

export default function PaginationNumber({
  totalPageNumber,
  currentPage,
  setPage,
  ...context
}) {
  return (
    <div className={styles.fullContent}>
      Páginas
      <div className={styles.allPages}>
        {[...Array(totalPageNumber)].map((_, i) => (
          <button
            className={styles.pageNumber}
            key={i}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import styles from '../../styles/PaginationNumber.module.scss'

export default function PaginationNumber({
  totalPageNumber,
  currentPage,
  setPage,
  ...context
}) {
  const paging = (page) => {
    setPage(page)
    console.log('ma page', page)
  }

  return (
    <div className={styles.fullContent}>
      Páginas
      <div className={styles.allPages}>
        {[...Array(totalPageNumber)].map((_, i) => (
          <button className={styles.pageNumber} onClick={() => paging(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

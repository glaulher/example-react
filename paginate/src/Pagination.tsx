import React from 'react'
import { usePagination, DOTS } from './usePagination'
import './pagination.scss'

type PaginationProps = {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className: string
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange![paginationRange!.length - 1]
  return (
    <ul className="pagination-container">
      <li
        className={`pagination-item ${currentPage === 1 && 'disabled'}`}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange!.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="pagination-item dots">
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={`pagination-item ${
              pageNumber === currentPage && 'selected'
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={`pagination-item ${currentPage === lastPage && 'disabled'}`}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  )
}

export default Pagination

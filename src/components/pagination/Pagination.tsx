import { useEffect, useState, useMemo } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import PageNumber from "./PageNumber"
import "./Pagination.css"

interface MyProps {
  moviesPerPage: number
  totalMovies: number
  paginate: (args: any) => void
  currentPage: number
}

const Pagination: React.FC<MyProps> = ({
  moviesPerPage,
  totalMovies,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = useMemo(() => [], [])
  const [isNextDisabled, setIsNextDisabled] = useState(false)
  const [isPrevDisabled, setIsPrevDisabled] = useState(false)

  useEffect(() => {
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
      pageNumbers.push(i)
    }
  }, [totalMovies, moviesPerPage, pageNumbers])

  useEffect(() => {
    if (currentPage === pageNumbers.length) {
      return setIsNextDisabled(true)
    } else {
      return setIsNextDisabled(false)
    }
  }, [currentPage, pageNumbers])

  useEffect(() => {
    if (currentPage === 1) {
      return setIsPrevDisabled(true)
    } else {
      return setIsPrevDisabled(false)
    }
  }, [currentPage])

  return (
    <div className="paginationContainer">
      <div className="paginationNavContainer">
        <nav className="paginationNav" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`paginationButton-prev ${
              isPrevDisabled ? "paginationButton-disabled" : "paginationButton"
            }`}
            disabled={isPrevDisabled}
          >
            <ChevronLeftIcon className="chevronIcon" />
          </button>
          {pageNumbers.map((number) => (
            <PageNumber
              number={number}
              paginate={paginate}
              currentPage={currentPage}
            />
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`paginationButton-next ${
              isNextDisabled ? "paginationButton-disabled" : "paginationButton"
            }`}
            disabled={isNextDisabled}
          >
            <ChevronRightIcon className="chevronIcon" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Pagination

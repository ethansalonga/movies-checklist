import { useEffect, useState, useMemo } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
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

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i)
  }

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
      {/* Mobile buttons */}
      <div className="paginationMobileContainer">
        <button
          onClick={() => {
            paginate(currentPage - 1)
          }}
          className={`paginationMobile ${
            isPrevDisabled ? "paginationButton-disabled" : "paginationButton"
          }`}
          disabled={isPrevDisabled}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          className={`paginationMobile ${
            isNextDisabled ? "paginationButton-disabled" : "paginationButton"
          }`}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
      <div className="paginationNavContainer">
        <nav className="paginationNav" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`paginationStandard paginationStandard-prev ${
              isPrevDisabled ? "paginationButton-disabled" : "paginationButton"
            }`}
            disabled={isPrevDisabled}
          >
            <ChevronLeftIcon className="chevronIcon" />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`${number === currentPage && "bg-gray-200"} ${
                number > currentPage + 2
                  ? "hidden"
                  : number < currentPage - 2
                  ? "hidden"
                  : null
              } list-none bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
            >
              <li>{number}</li>
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`paginationStandard paginationStandard-next ${
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

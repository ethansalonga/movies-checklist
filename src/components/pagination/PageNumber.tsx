import React from "react"

interface PageNumberProps {
  number: number
  paginate: (args: any) => void
  currentPage: number
}

const PageNumber: React.FC<PageNumberProps> = ({
  number,
  paginate,
  currentPage,
}) => {
  return (
    <button
      key={number}
      onClick={() => paginate(number)}
      className={`${number === currentPage && "pageNumber-active"} 
    ${currentPage === 1 && number > currentPage + 4 && "pageNumber-hidden"}
    ${currentPage === 2 && number > currentPage + 3 && "pageNumber-hidden"}
    ${currentPage === 24 && number < currentPage - 3 && "pageNumber-hidden"}
    ${currentPage === 25 && number < currentPage - 4 && "pageNumber-hidden"}
    ${
      currentPage !== 1 &&
      currentPage !== 2 &&
      currentPage !== 24 &&
      currentPage !== 25 &&
      (number > currentPage + 2 || number < currentPage - 2) &&
      "pageNumber-hidden"
    } pageNumber`}
    >
      <li>{number}</li>
    </button>
  )
}

export default PageNumber

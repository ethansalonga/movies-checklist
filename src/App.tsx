import { useEffect, useState } from "react"
import axios from "axios"
import MovieCard from "./components/MovieCard"
import { Movie } from "./types"
import "./styles/App.css"
import Pagination from "./components/pagination/Pagination"

function App() {
  const [moviesArr, setMoviesArr] = useState<Movie[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/list/8245387?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((res) => setMoviesArr(res.data.items))
  }

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage] = useState(10)

  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = moviesArr.slice(indexOfFirstMovie, indexOfLastMovie)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <main>
        <div className="headerContainer">
          <h1 className="header">Top 250 Movies of All Time</h1>
        </div>
        <div className="widthContainer">
          <section className="movieCards">
            {currentMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </section>
        </div>
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={moviesArr.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </>
  )
}

export default App

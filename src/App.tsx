import { useEffect, useState } from "react"
import axios from "axios"
import MovieCard from "./components/MovieCard"
import { Movie } from "./types"
import "./styles/App.css"

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

  return (
    <>
      <main>
        <div className="headerContainer">
          <h1 className="header">Top 250 Movies of All Time</h1>
        </div>
        <div className="widthContainer">
          <section className="movieCards">
            {moviesArr.map((movie, index) => (
              <MovieCard movie={movie} key={movie.id} index={index} />
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default App

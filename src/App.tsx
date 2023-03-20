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
    const requestUrlString = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=`
    const urls = [
      `${requestUrlString}1`,
      `${requestUrlString}2`,
      `${requestUrlString}3`,
      `${requestUrlString}4`,
      `${requestUrlString}5`,
    ]
    const requests = urls.map((url) => axios.get(url))

    const tempArr: Movie[] = []
    await axios.all(requests).then((responses) => {
      responses.forEach((res) => {
        tempArr.push(...res.data.results)
      })
    })

    setMoviesArr(tempArr)
  }

  return (
    <>
      <main>
        <div className="headerContainer">
          <h1 className="header">Top 100 Rated Movies</h1>
          <h3 className="subheader">
            in order, according to The Movie Database (TMDB) users
          </h3>
        </div>
        <div className="widthContainer">
          <section className="movieCards">
            {moviesArr.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default App

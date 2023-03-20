import { useEffect, useState } from "react"
import axios from "axios"
import "./styles/App.css"

type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

function App() {
  const [moviesArr, setMoviesArr] = useState<Movie[]>([])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(moviesArr)
  }, [moviesArr])

  const getData = async () => {
    const requestString =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=3f5496b71014011752928a7f26121beb&language=en-US&page="
    const urls = [
      `${requestString}1`,
      `${requestString}2`,
      `${requestString}3`,
      `${requestString}4`,
      `${requestString}5`,
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
              <div className="movieItem">
                <div className="movieTitle">{movie.title}</div>
                <img
                  className="movieCard"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default App

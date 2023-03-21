import { useState } from "react"
import { Movie } from "../types"

interface MovieCardProps {
  movie: Movie
  index: number
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  const [isWatched, setIsWatched] = useState(false)

  return (
    <div className="movieItem">
      <div className="movieTitle">
        {index + 1}. {movie.title}
      </div>
      <img
        className={`movieCard ${isWatched && "watched"}`}
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={`${movie.title} poster`}
        onClick={() => setIsWatched((prev) => !prev)}
      />
    </div>
  )
}

export default MovieCard

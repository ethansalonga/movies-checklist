import "./styles/App.css"
import top100MoviesArr from "./data/top100movies"

function App() {
  return (
    <>
      <main>
        <h1 className="header">Top 100 Movies of All Time</h1>
        <div className="widthContainer">
          <section className="movieCards">
            {top100MoviesArr.map((item) => (
              <div className="movieItem">
                <div className="movieTitle">{item.title}</div>
                <img className="movieCard" src={item.image} alt="" />
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default App

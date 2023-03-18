import "./styles/App.css"
import top100AnimeArr from "./data/top100anime"

function App() {
  return (
    <>
      <main>
        <h1 className="header">Top 100 Anime Checklist</h1>
        <div className="widthContainer">
          <section className="animeCards">
            {top100AnimeArr.map((item) => (
              <div className="animeItem">
                <div className="animeTitle">{item.title}</div>
                <div className="animeCard"></div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default App

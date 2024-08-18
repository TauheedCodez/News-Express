import { useState, useEffect } from 'react'
import './App.css'
import { CiSearch } from "react-icons/ci";
import { GiNewspaper } from "react-icons/gi";

function App() {
  const [newsData, setnewsData] = useState([])
  const [searchquery, setsearchquery] = useState('India')

  const fetchData = async (query) => {
    let a = await fetch(`https://newsapi.org/v2/everything?q=${query}&apikey=f1551241dc2c41e799e446e38979a52d`)
    let data = await a.json()
    setnewsData(data.articles)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const query = event.target.elements.search.value
    setsearchquery(query)
  }

  useEffect(() => {
    fetchData(searchquery)
  }, [searchquery])

  return (
    <>
      <div className="express">
        <GiNewspaper className='logo-svg' />
        <div className="logo-text">
          <div className='logo-text-primary'>NEWS</div>
          <div className='logo-text-primary'>EXPRESS</div>
        </div>
        <GiNewspaper className='logo-svg' />
      </div>
        <form onSubmit={handleSubmit} className='search-bar-container'>
          <CiSearch className='search-icon' />
          <input type="text" name='search' placeholder='search for news..' className="search-bar" />
          <button type='submit' className="btn-primary">Search</button>
        </form>
      <div className="container">
        {newsData.map((article, index) => {
          return <div key={index} className="cards">
            <img className='image' src={article.urlToImage} />
            <div className="card-body">
              <h4 className="card-title">{article.title}</h4>
              <p className="card-text">{article.description}</p>
              <a className="btn" href={article.url}>Read more &gt;</a>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App

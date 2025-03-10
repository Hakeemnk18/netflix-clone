import React, { useEffect, useRef, useState } from 'react'
import './TitileCard.css'
import card_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitileCard = ({title,category}) => {
  const cardsRef = useRef()
  const [apiData,setApiData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDNlMDYxNGFiYjZhMGNkN2MyZWI0ZmM5ZWQ5ZDRiMCIsIm5iZiI6MTc0MTU4MjcyMC45NzIsInN1YiI6IjY3Y2U3MTgwZjlhNDg2OThlMmUyZjhkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CFiBhIGuvB5lRq6kpFIwtJpL3_32CD6aZMTMog0XUuQ'
    }
  };
  
  

  const handleWheel=(event)=>{
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltay
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return (
          
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
          </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitileCard

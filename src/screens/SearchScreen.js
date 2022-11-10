import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card'
import { selectMovie } from '../features/counter/userSlice'
import Nav from '../Nav'
import './searchScreen.css'

function SearchScreen() {
    const [movies, setMovies] = useState([])
    const searchMovies = useSelector(selectMovie)
    useEffect(()=>{
        setMovies(searchMovies)
    },[searchMovies])
    console.log(movies)
  return (
    <div className='searchScreen'>
        <Nav/>
        <div className='search_info'>
            <h1>Your Search</h1>
            <div className='search_movies'>
            {movies?.map((movie)=>{
                <h2>Movie</h2>
                // <Card key={movie.id} movie={movie}/>
            })}
            </div>
            
        </div>
        
    </div>
  )
}

export default SearchScreen
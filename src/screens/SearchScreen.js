import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card'
import { selectMovie } from '../features/counter/userSlice'
import Nav from '../Nav'
import './searchScreen.css'

function SearchScreen(isLargeRow) {

    const searchMovies = useSelector(selectMovie)
    console.log(searchMovies)
  return (
    <div className='searchScreen'>
        <Nav/>
        <div className='search_info'>
            <h1>Your Search</h1>
            <div className='search_movies'>
            {searchMovies?.map((movie)=>
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&
                (<Card key={movie.id} movie={movie}/>)
            )}
            </div>
            
        </div>
        
    </div>
  )
}

export default SearchScreen
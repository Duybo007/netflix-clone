import React from 'react'
import { useSelector } from 'react-redux'
import { selectMovie } from '../features/counter/userSlice'
import Nav from '../Nav'

function SearchScreen() {
    const searchMovies = useSelector(selectMovie)
    console.log(searchMovies)
  return (
    <div>
        <Nav/>
    </div>
  )
}

export default SearchScreen
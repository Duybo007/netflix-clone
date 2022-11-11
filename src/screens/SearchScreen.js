import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from '../Card'
import { selectMyMovie, selectUser } from '../features/counter/userSlice'
import Nav from '../Nav'
import './searchScreen.css'
import {updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebase'

function SearchScreen(isLargeRow) {
  const {term} = useParams()
  const [movies, setMovies] = useState([])
  const url = `https://api.themoviedb.org/3/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=${term}`
  useEffect(()=>{
    async function fetchData(){
      const res = await axios.get(url)
      setMovies(res.data.results)
    }
    fetchData()
  },[url])

    //Pass down deleteShow func to Card in Home page
    const user = useSelector(selectUser)
    const myMovies = useSelector(selectMyMovie)
    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedID) => {
      try {
        const res = myMovies.filter((movie)=> movie.id !== passedID)
        await updateDoc(movieRef, {
          savedShows: res
        })
      } catch(err) {
        console.log(err)
      }
    }  
  
  return (
    <div className='searchScreen'>
        <Nav/>
        <div className='search_info'>
            <h1>Your Search</h1>
            <div className='search_movies'>
            {movies?.map((movie)=>
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&
                (<Card key={movie.id} movie={movie} deleteShow={deleteShow}/>)
            )}
            </div>
            
        </div>
        
    </div>
  )
}

export default SearchScreen
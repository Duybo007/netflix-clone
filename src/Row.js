import axios from './axios'
import React, { useEffect, useState } from 'react'
import "./Row.css"
import Card from './Card'
import { useSelector } from 'react-redux'
import { selectMyMovie, selectUser } from './features/counter/userSlice'

import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import { db } from './firebase'


function Row({title, fetchUrl, isLargeRow}) {
    // fetch movies from API
    const[movies, setMovies] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    },[fetchUrl])
    
    

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
    <div className='row'>
        <h2 className=''>{title}</h2>

        <div className='row_posters'>
            {movies.map((movie)=> 
                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&(
                    <Card key={movie.id} movie={movie} deleteShow={deleteShow} isLargeRow={isLargeRow}/>
                ) 
            )}
        </div>
        
        
    </div>
  )
}

export default Row
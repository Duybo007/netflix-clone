import axios from './axios'
import React, { useEffect, useState } from 'react'
import "./Row.css"
import Card from './Card'


function Row({title, fetchUrl, isLargeRow}) {

    const[movies, setMovies] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    },[fetchUrl])

    
  return (
    <div 
    className='row'>
        <h2 className=''>{title}</h2>

        <div className='row_posters'>
            {movies.map((movie)=> 
                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&(
                    <Card key={movie.id} movie={movie} isLargeRow={isLargeRow}/>
                ) 
            )}
        </div>
        
        
    </div>
  )
}

export default Row
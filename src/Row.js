import axios from './axios'
import React, { useEffect, useState } from 'react'
import "./Row.css"
import Card from './Card'


function Row({title, fetchUrl, isLargeRow}) {
    const obj ={}
    const gen = []
    const genName=[]
    const genID=[]
    const[movies, setMovies] = useState([])
    // const base_url = "https://image.tmdb.org/t/p/original/"
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    },[fetchUrl])

    useEffect(()=>{
        async function genreList(){
            const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=3d39d6bfe362592e6aa293f01fbcf9b9')
            gen.push(res.data.genres)
            gen[0].map((genre)=>{
                genName.push(genre.name)
            })
            gen[0].map((genre)=>{
                genID.push(genre.id)
            })
            genID.forEach((element, index)=>{
                obj[element]=genName[index]
            })
            
            console.log(obj)
        }
        genreList()
    }, [])
    console.log(movies)
    
  return (
    <div 
    className='row'>
        <h2 className=''>{title}</h2>

        <div className='row_posters'>
            {movies.map((movie)=> 
                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&(
                    <Card movie={movie} isLargeRow={isLargeRow}/>
                ) 
            )}
        </div>
        
        
    </div>
  )
}

export default Row
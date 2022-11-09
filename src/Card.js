import React, { useEffect, useState } from 'react'
import "./Card.css"
import { PlayIcon, CheckCircleIcon, ThumbUpIcon, ThumbDownIcon, PlusCircleIcon, ArrowCircleDownIcon} from '@heroicons/react/solid'
import {db} from './firebase'
import {arrayUnion, doc, updateDoc} from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/userSlice'
import axios from 'axios'


function Card({movie, isLargeRow, deleteShow}) {
  const[genreName, setGenreName] = useState({})
  const obj ={}
  const gen = []
  const genName=[]
  const genID=[]

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
        setGenreName(obj)
        
    }
    genreList()
  }, [])
  
    const user = useSelector(selectUser)
    const [isLiked, setIsLiked] = useState(false)
    const [hover, setHover] = useState(false)
    const base_url = "https://image.tmdb.org/t/p/original/"
    const [saved, setSaved] = useState(false)
    const movieID = doc(db , 'users', `${user?.email}`)
    const savedMovies = async () => {
      if (user?.email){
        setSaved(true)
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: movie.id,
            title: movie?.title || movie?.name || movie?.original_name,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path
          })
        })
      }
      }
    
    
  return (                
    <div 
    className='card_container'
    onMouseLeave={()=> setHover(false)}>
    <img 
      onMouseEnter={()=> setHover(true)}
      className={`row_poster ${isLargeRow && "row_posterLarge"}`}
      key={movie.id}
      src={`${base_url}${
      isLargeRow ? movie.poster_path : movie.backdrop_path
      }`} alt={movie.name}/>
    
    {hover && (
      <div className='hovered'>
        <div className='hovered_poster'>
          <img 
          
          className='hovered_img' src={`${base_url}${movie.backdrop_path}`}/>
        </div>

        <div className='hovered_info'>
          <h3>{movie?.title || movie?.name || movie?.original_name}</h3>
          <div className='hovered_icons'>
            <div className='hovered_icons_controls'>
              <PlayIcon />
              {isLiked ? (
                <ThumbDownIcon title="Dislike" onClick={()=> setIsLiked(false)}/>
              ) : (
                <ThumbUpIcon title="Like" onClick={()=> setIsLiked(true)}/>
              )}
              {saved ? (
                <CheckCircleIcon onClick={() => deleteShow(movie.id)}/>
              ) : (
                <PlusCircleIcon onClick={savedMovies} title="Add to my list"/>
              )}
              
              <ArrowCircleDownIcon title="More Info"/>
            </div>
          
          </div>
          <div className='hovered_genres'>
              <ul>
                {movie.genre_ids.map((genre) => (
                  <li>
                    {genreName[genre]}
                  </li>
                ))}
              </ul>
          </div>
        </div>
        
      </div>
    )}
    
    
    </div>
  )
}

export default Card


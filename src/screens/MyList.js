import React, { useEffect, useState } from 'react'
import Nav from '../Nav'
import './MyList.css'
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { myMovies, selectUser } from '../features/counter/userSlice'
import { db } from '../firebase'
import Card from '../Card'

function MyList() {
    const dispatch=useDispatch()
    const [movies, setMovies] = useState([])
    const user = useSelector(selectUser)
    useEffect(()=> {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=> {
            setMovies(doc.data()?.savedShows)
            dispatch(myMovies(doc.data()?.savedShows))
        })
    }, [user?.email])

    
    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedID) => {
      try {
        const res = movies.filter((movie)=> movie.id !== passedID)
        await updateDoc(movieRef, {
          savedShows: res
        })
      } catch(err) {
        console.log(err)
      }
    }  

  return (
    <div className='myList'>
        <Nav />
        
        <div className='myList_info'>
            <h1>My List</h1>
            <div className='myList_movies'>
                {movies.map((movie)=> (
                    <Card key={movie.id} movie={movie} deleteShow={deleteShow} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default MyList
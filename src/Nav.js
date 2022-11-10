import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'
import {SearchIcon} from '@heroicons/react/solid'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { searchMovies } from './features/counter/userSlice';
import { async } from '@firebase/util';

function Nav() {
    const [showSearch, setShowSearch] = useState(false);
    
    const navigate = useNavigate()
    //scroll black bar effect above and below codes
    const [show, handleShow] =useState(false)
    
    const transitionNavBar = () => {
        if (window.scrollY > 100){
            handleShow(true)
        }else {
            handleShow(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener('scroll',transitionNavBar)
    }
    ,[])
    //scroll black bar effect above and below codes
    const links = [
        { name: "Home", link: "/" },
        { name: "My List", link: "/mylist" },
      ];

      const base_Url = "https://api.themoviedb.org/3"
      const dispatch = useDispatch()
      const [search,setSearch]=useState()
      const [url_set,setUrl]=useState(base_Url)
      
      //Search movie with search bar
      const searchMovie= (evt) => {
        if(evt.key=="Enter"){
            evt.preventDefault()
            const url = `https://api.themoviedb.org/3/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=${search}`
            setUrl(url)
            setSearch(" ")
            // navigate('/search')
            
        }
      }
      useEffect(()=> {
        async function fetchData(){
            const res = await axios.get(url_set)
            dispatch(searchMovies(res.data.results))

        }
        fetchData()
      }, [url_set])

  return (
    <div className={`nav ${show && "nav_black"}`}>
        <div className='nav_contents'>
            <div className='logo'>
            <img 
            onClick={()=> navigate("/")}
            className='nav_logo' src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt=''/>
            </div>
            <div className='nav_links'>
                {links.map(({name, link})=>
                <p onClick={()=> navigate(link)}>{name}</p>
                )}
            </div>
            {/* expandable search bar */}
            <div className={`search ${showSearch ? "show-search" : ""}`}>
            <SearchIcon 
            onClick={() => setShowSearch(true)}
            onBlur={() => {setShowSearch(false);}}/>
            
            <input
                onChange={(e)=>{setSearch(e.target.value)}}
                value={search}
                onKeyPress={searchMovie}
                type="text"
                placeholder="Search"
                onBlur={() => {
                setShowSearch(false);
              }}
            />
          </div>

            <img 
            onClick={()=> navigate("/profile")}
            className='nav_avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt=''/>
        </div>
    </div>
  )
}

export default Nav
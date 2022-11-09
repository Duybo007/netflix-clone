import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'


function Nav() {
    
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
  return (
    <div className={`nav ${show && "nav_black"}`}>
        <div className='nav_contents'>
            <img 
            onClick={()=> navigate("/")}
            className='nav_logo' src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt=''/>
            <div className='nav_links'>
                {links.map(({name, link})=>
                <p onClick={()=> navigate(link)}>{name}</p>
                )}
            </div>
            <img 
            onClick={()=> navigate("/profile")}
            className='nav_avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt=''/>
        </div>
    </div>
  )
}

export default Nav
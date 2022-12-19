import React, { useRef, useState } from 'react'
import './SignupScreen.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setDoc, doc} from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom';

function SignupScreen({email}) {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [newEmail, setNewEmail] = useState(email)
    const auth = getAuth()
    const navigate = useNavigate()
    const register = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth,
        emailRef.current.value,
        passwordRef.current.value)
        setDoc(doc(db, 'users', emailRef.current.value), {
            savedShows: []
          })
        .then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        })
        navigate('/')
    }

  return (
    <div className='signup'>
        <form className='signup_form'>
            <h1>Create a password to start your membership</h1>
            <h3>Just a few more steps and you're done!</h3>
            <h3>We hate paperwork, too.</h3>
            <input 
            ref={emailRef} 
            value={newEmail} 
            type="email" 
            placeholder="Email"
            onChange={(e)=>setNewEmail(e.target.value)}/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <button className='signup-btn' onClick={register}>Sign Up</button>
        </form>
    </div>
  )
}

export default SignupScreen
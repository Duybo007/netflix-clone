import React, { useRef } from 'react'
import { db } from '../firebase'
import './SigninScreen.css'
import {setDoc, doc} from 'firebase/firestore'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


function SigninScreen() {
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const auth = getAuth()
  const register = (e) =>{
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

  const signIn = (e) =>{
    e.preventDefault()

    signInWithEmailAndPassword(auth,
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
      console.log(authUser)
    }).catch((error) => {
      console.log(error.message)
    })
    navigate('/')
  }

  return (
    <div className='signinScreen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Password"/>
        <button 
        onClick={signIn}
        type='submit'>Sign In</button>
      
        <h4>
          <span className='signupScreen_gray'>New to NetFflix? </span>
          <span 
          onClick={register}
          className='signupScreen_link'>Sign up now</span>
          </h4>
      </form>
    </div>
  )
}

export default SigninScreen
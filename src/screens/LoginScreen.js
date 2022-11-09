import React, { useState } from 'react'
import './LoginScreen.css'
import SigninScreen from './SigninScreen'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)



  return (
    <div className='loginScreen'>
        <div className='loginScreen_background'>
            <img className='loginScreen_logo' src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'/>
        
        <button 
        onClick={()=> setSignIn(true)}
        className='loginScreen_button'>
            Sign In
        </button>
        <div className='loginScreen_gradient'/>
        </div>

        <div className='loginScreen_body'>
            {signIn ? (
                <SigninScreen />
            ) : (
                <>
                <h1>Unlimited films, TV pshows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            
                <div className='loginScreen_input'>
                    <form className=''>
                        <input type="email" placeholder="Email Adress"/>
                        <button 
                        onClick={()=>setSignIn(true)}
                        className='loginScreen_getStarted'>GET STARTED</button>
                    </form>
                </div>
                </>
            )}
            
        </div>
    </div>
  )
}

export default LoginScreen
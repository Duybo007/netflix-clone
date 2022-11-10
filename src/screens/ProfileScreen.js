import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/counter/userSlice'
import Nav from '../Nav'
import './ProfileScreen.css'
import { getAuth, signOut } from "firebase/auth";

function ProfileScreen() {

    const user = useSelector(selectUser);
    const auth = getAuth();

  return (
    <div className='profileScreen'>
        <Nav/>
        <div className='profileScreen_body'>
            <h1>Edit profile</h1>
            <div className='profileScreen_info'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt=""/>
                <div className='profileScreen_details'>
                    <h2>{user.email}</h2>
                    <div className='profileScreen_plans'>
                        
                        <button 
                        onClick={() => signOut(auth)}
                        className='profileScreen_signOut'>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen
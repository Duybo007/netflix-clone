import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import MyList from './screens/MyList';
import SearchScreen from './screens/SearchScreen';


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth){
        //Login
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        //Logout
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen/>
          ) : (
            <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/search/:term" element={<SearchScreen />} />
            </Routes>
          )}
        
      </Router>
    </div>
  );
}

export default App;

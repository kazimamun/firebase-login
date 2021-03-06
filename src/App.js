import React, { useState } from 'react';
import './App.css';
import firebaseConfig from './firebase.config';
import * as firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name : "",
    email : '',
    photo : '',
    password : ""
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  //sign in function
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider) // here provider is upper variable.
    .then(res =>{
      const {displayName, photoURL, email} = res.user;
      const signedInUser ={
        isSignedIn: true,
        name : displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      //console.log(displayName, email, photoURL);
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }
  //sign out function
  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name : '',
        email: '',
        photo: '',
        password : ""
      }
      setUser(signOutUser);
    })
    .catch(error =>{
       
    })
  }

  //Custom Registration Function
  const handleChange = e =>{
    const newUserIfo = {...user};
    newUserIfo[e.target.name] = e.target.value;
    setUser(newUserIfo);
  }

  const createAccount = () =>{
    console.log("account created");
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && 
          <div>
            <p>Welcome, {user.name}</p>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
      }
      {/* custom Registration form */}
      <h1>Our own authentication</h1>
      <input type="text" onBlur={handleChange} name="email" placeholder="Your Email" />
      <br/>
      <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" id=""/>
      <br/>
      <button onClick={createAccount}>Create Account</button>
    </div>
  );
}

export default App;

import React, { useState,useContext } from 'react';
import {useHistory,Link}from 'react-router-dom'

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [username,setusername] = useState('')
  const [email, setemail] = useState('')
  const [phonenumber, setphonenumber] = useState('')
  const [password, setpassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const submission = (e)=>{
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('user').add({
          id:result.user.uid,
          username:username,
          phonenumber:phonenumber
        }).then(()=>{
          history.push('/')
        })
      }).catch((err)=>{
        console.log(err);
      })
    }).catch((err)=>{
      console.log(err);
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={submission}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            id="fname"
            name="name"
            placeholder="John"
            required
      
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            id="fname"
            name="email"
            placeholder="John"
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            vlaue={phonenumber}
            onChange={(e)=>setphonenumber(e.target.value)}
            id="lname"
            name="phone"
            placeholder="Doe"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            id="lname"
            name="password"
            placeholder="Doe"
            required
          />
          <br />
          <br />
         
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

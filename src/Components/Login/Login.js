import React  from 'react';
import {Link, useHistory} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';
import { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/Context'
import OlxLogo from '../../assets/OlxLogo';

function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const history = useHistory()
  const {firebase}= useContext(FirebaseContext)
  const Login =(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>{
      alert('success')
      history.push('/')
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div>
      <nav class="navbar navbar-light bg-light" >
      <div className="brandName ml-2" onClick={()=>history.push('/')}>
          <OlxLogo ></OlxLogo>
        </div>
    </nav>
      <div className="loginParentDiv">
        <img width="100px" height="100px" src={Logo}></img>
        <form onSubmit={Login}>
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
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;

import React, { useContext } from 'react';
import {useHistory,Link}from 'react-router-dom'
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import OlxLogo from '../../assets/OlxLogo';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const {firebase} = useContext(FirebaseContext)
  const schema = yup.object().shape({
    username: yup.string().required('Username is Required').trim().min(4,'name of min 4 letter'),
    email:yup.string().required('Email is required').email('Invalid email'),
    number:yup.string().required('Enter contact number').min(10,'invalid number').max(10),
    password:yup.string().required('Password is required').min(6,'min 6 char required').max(15)
  });
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)})



  const signupSubmission= (data)=>{
    const{username,email,password,number} = data
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('user').add({
          id:result.user.uid,
          username:username,
          phonenumber:number
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
        <nav class="navbar navbar-light bg-light" >
      <div className="brandName ml-2" onClick={()=>history.push('/')}>
          <OlxLogo ></OlxLogo>
        </div>
       </nav>
      <div className="signupParentDiv">
        <img width="100px" height="100px" src={Logo}></img>
        <form onSubmit={handleSubmit(signupSubmission) }>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
           {...register('username')}
           placeholder="Username"
          />
          <br />
          {errors.username?.message && <small>{errors.username?.message}</small>}<br/>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"         
            {...register('email')}
            placeholder="email"
       
          />
          <br />
          {errors.email?.message && <small>{errors.email?.message}</small>}<br/>
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"  
            {...register('number')}
            placeholder="Phonenumber"
          />
          <br />
          {errors.number?.message && <small>{errors.number?.message}</small>}<br/>
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            {...register('password')}
            placeholder="Password"
           
          />
          <br />
          {errors.password?.message && <small>{errors.password?.message}</small>}<br/>
          <button type='submit'>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

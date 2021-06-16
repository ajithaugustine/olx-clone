import React ,{useEffect,useContext}from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import {AuthContext, FirebaseContext} from './store/Context'
import Signup from './Pages/Signup'
import Login from './Components/Login/Login'
import './App.css';
import Home from './Pages/Home';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';
import Post from './store/PostContext'

function App() {
  const{setuser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setuser(user)
    })
  })
  return (
    <div>
        <Post>
      <BrowserRouter>
    
      <Route path='/' exact><Home /></Route>
      <Route  path='/login'><Login/> </Route>
      <Route path='/signup'> <Signup/> </Route>
      <Route path='/sell' component={Create}/>
      <Route path='/view'> <ViewPost/> </Route>
      
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
  
import React ,{useEffect,useContext}from 'react';
import {BrowserRouter,Route, Switch,Redirect} from 'react-router-dom'
import {AuthContext, FirebaseContext} from './store/Context'
import Signup from './Pages/Signup'
import Login from './Components/Login/Login'
import './App.css';
import Home from './Pages/Home';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';
import Post from './store/PostContext'
import Profile from './Pages/Profile';
function App() {
  const{user,setuser} = useContext(AuthContext)
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
    <Switch>
      <Route path='/' exact><Home /></Route>
      <Route path='/login'exact><Login/> </Route>
      <Route path='/signup'exact> <Signup/> </Route>
      <Route path='/sell'exact component={Create}/>
      <Route path='/view'exact> <ViewPost/> </Route>
   { user?  <Route path='/profile/:id' exact> <Profile/> </Route>:<Redirect to='/'/>}
      <Route path='*' exact> <h3>page not fount</h3> </Route>
      </Switch>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
  
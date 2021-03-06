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
import Editpost from './Components/Editpost/Editpost';
import Notfound from './Components/Pagenotfound/Notfound';
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
      <Route path='/login'><Login/> </Route>
      <Route path='/signup'> <Signup/> </Route>
      <Route path='/sell' component={Create}/>
      <Route path='/view'> <ViewPost/> </Route>
      <Route path='/profile/:id'>{user?<Profile/> :<Redirect to="/"/>}</Route> 
      <Route path='/edit/:itemid'> {user?<Editpost/> :<Redirect to="/"/>}</Route>
      <Route > <Notfound/></Route>
      </Switch>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
  
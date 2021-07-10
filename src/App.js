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
     {user? <Route path='/profile/:id'><Profile/> </Route> :<Redirect to="/"/>}
     {user?  <Route path='/edit/:itemid'><Editpost/> </Route>:<Redirect to="/"/>}
      <Route path='*' > <h3>page not fount</h3> </Route>
      </Switch>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
  
import React,{useContext,useEffect} from 'react'
import { Link,useParams,useRouteMatch,Switch,Route} from 'react-router-dom'
import { AuthContext } from '../../store/Context';
import Userdetails from './Userdetails'
import Userproducts from './Userproducts'
import './UserProfile.css'
function UserProfile() {
const {user} = useContext(AuthContext)
const {id}=useParams()
const {url,path}=useRouteMatch()
useEffect(() => {
   window.scroll(0,0)
  
}, [])
    return (
        <div >
            <div className="container-fluid">
                <div className="row">
                    <div className="dashbord col-2">
                        <h5>{user.displayName}</h5>
                   
                   <ul className='profilelist'>
                       <li><Link id='profilelinks' to={`${url}`} >userdetails</Link> </li>
                       <li><Link id='profilelinks'to={`${url}/items`} >Items</Link> </li>
                      
                   </ul>

                    </div>
                    <div className="contents col-9">
                  <Switch>
                      <Route path={`${path}`} exact> <Userdetails userid={id}/></Route>
                      <Route path={`${path}/items`} > <Userproducts userid={id}/></Route>
                  </Switch>
                        
                    </div>

                </div>
            </div>
           

        </div>
    )
}

export default UserProfile

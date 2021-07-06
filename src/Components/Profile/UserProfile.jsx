import React,{useContext} from 'react'
import { Route,Link,useRouteMatch,Switch} from 'react-router-dom'
import { AuthContext } from '../../store/Context';
import Userdetails from './Userdetails'
import Userproducts from './Userproducts'
import './UserProfile.css'
function UserProfile() {
    const {user} = useContext(AuthContext)
    const{path,url}= useRouteMatch()
    return (
        <div >
            <div className="container-fluid">
                <div className="row">
                    <div className="dashbord col-2">
                        <h5>{user.displayName}</h5>
                   
                   <ul className='profilelist'>
                       <li><Link id='profilelinks' to={url}>userdetails</Link> </li>
                       <li><Link id='profilelinks' to={`${url}/userproducts`}>products</Link> </li>
                      
                   </ul>

                    </div>
                    <div className="contents col-9">
                    <Switch>
                        <Route exact path={path}><Userdetails userid={user.uid}/></Route>
                        <Route path={`${path}/userproducts`}><Userproducts userid={user.uid}/></Route>
                    </Switch>

                    </div>

                </div>
            </div>
           

        </div>
    )
}

export default UserProfile

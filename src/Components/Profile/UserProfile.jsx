import React,{useContext,useState} from 'react'
import { Link,useParams} from 'react-router-dom'
import { AuthContext } from '../../store/Context';
import Userdetails from './Userdetails'
import Userproducts from './Userproducts'
import './UserProfile.css'
function UserProfile() {
    const [state, setstate] = useState(true)
    const {user} = useContext(AuthContext)
   const {id}=useParams()
    return (
        <div >
            <div className="container-fluid">
                <div className="row">
                    <div className="dashbord col-2">
                        <h5>{user.displayName}</h5>
                   
                   <ul className='profilelist'>
                       <li><Link id='profilelinks'onClick={()=>setstate(true)} >userdetails</Link> </li>
                       <li><Link id='profilelinks' onClick={()=>setstate(false)}>products</Link> </li>
                      
                   </ul>

                    </div>
                    <div className="contents col-9">
                   
                       {state? <div><Userdetails userid={id}/></div> :<div ><Userproducts userid={id} /></div>}
                        
                    </div>

                </div>
            </div>
           

        </div>
    )
}

export default UserProfile

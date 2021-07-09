import React ,{useEffect,useState,useContext}from 'react';
import { FirebaseContext } from '../../store/Context';
function Userdetails(props) {
const {userid} =props
const [userDetails, setuserDetails] = useState([])
const {firebase} = useContext(FirebaseContext)
useEffect(()=>{
    firebase.firestore().collection('user').where('id','==',userid).get().then((snapshot)=>{
        const alluser = snapshot.docs.map((user)=>{
          return{
            ...user.data(),
            
        }})
    setuserDetails(alluser)
    
      })

},[])
    return (
        <div>
            {
                userDetails.map((user)=>{
                    return <div>
            <h6>{user.username}</h6>
            <h6>{user.phonenumber}</h6> 
                    </div>
                } )
            }
           
        </div>
    )
}

export default Userdetails

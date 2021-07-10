import React ,{useEffect,useState,useContext}from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import{useHistory} from 'react-router-dom'

import './View.css';
function View() {
  const history=useHistory()
  const [userDetails, setuserDetails] = useState()
  const {postdetailes} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
      const {userId}= postdetailes
      if(postdetailes ===''){
       console.log('ath pattathilla ketto')
       history.push('/')
      }
     else{
      firebase.firestore().collection('user').where('id','==',userId).get().then((res)=>{
        res.forEach(doc => {setuserDetails(doc.data())});
      })
     }

  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postdetailes.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postdetailes.price} </p>
          <span>{postdetailes.productname}</span>
          <p>{postdetailes.category}</p>
          <span>{postdetailes.createdAt}</span>
        </div>
    { userDetails &&   <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phonenumber}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;

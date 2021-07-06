import React ,{useState,useEffect, useContext}from 'react';
import {FirebaseContext}  from '../../store/Context'

function Userproducts(props) {
    const {firebase} = useContext(FirebaseContext)
    const [products, setproducts] = useState([])
    const{userid}=props
 console.log(userid)
 useEffect(() => {
    firebase.firestore().collection('products').where('userId','==',userid).get().then((snapshot)=>{
      const allpost = snapshot.docs.map((product)=>{
        return{
          ...product.data(),
          
      }})
  setproducts(allpost)
  
    })
     
    }, [])
    return (
        <div>
            <h6>userproducts</h6>
            <div className="cards row ">
    {
        products.map((product)=>{
         return <div className="card " >
          <div className="favorite">
          </div>
          <div className="image">
            <img width="200px" height="200px" src={product.url} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <p className="name"> {product.Productname}</p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>   }) 
    }
        </div>
        </div>
    )
}

export default Userproducts

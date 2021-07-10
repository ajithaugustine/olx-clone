import React ,{useState,useEffect, useContext}from 'react';
import {FirebaseContext}  from '../../store/Context'
import { Button } from 'react-bootstrap';
import{useHistory} from 'react-router-dom'

function Userproducts(props) {
  const history =useHistory()
    const {firebase} = useContext(FirebaseContext)
    const [products, setproducts] = useState([])
    const [update, setupdate] = useState('')
    const{userid}=props
 useEffect(() => {
   console.log('ok')
    firebase.firestore().collection('products').where('userId','==',userid).get().then((snapshot)=>{
      const allpost = snapshot.docs.map((product)=>{
        return{
          ...product.data(),
          key:product.id
          
      }})
  setproducts(allpost)
  
    })
     
    },[update])

const deleteitem=(key)=>{
  firebase.firestore().collection('products').doc(key).delete().then(()=>{
setupdate('updated')
  }).catch(()=>{
    alert('failed')
  })
}
    return (
        <div>
            <h6 className='font-italic'>sell items</h6>
          <div className="moreView1">
            <div className="cards row ">
    {
      products.map((product)=>{
         return <div
         className="Card ">
       
          <div className="image">
            <img width="200px" height="200px" src={product.url} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <p className="name"> {product.Productname}</p>
          </div>
          <div className="Date">
            <span>{product.createdAt}</span>
          </div>
          <div>
          <Button variant="outline-success"  size="sm px-3 " onClick={()=>history.push(`/edit/${product.key}`)}>Edit  </Button>{' '}
          <Button variant="outline-danger" size="sm" onClick={()=>deleteitem(product.key)}>Delete</Button>
          </div>
          
        </div>   })  
    }
        </div>
        </div>
    </div>
    )
}

export default Userproducts

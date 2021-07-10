import React, {useState ,useContext,useEffect} from 'react';
import './Editpost.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'
import Footer from '../Footer/Footer';
import {useHistory,useParams} from 'react-router-dom'

const Editpost = () => {
  const history =useHistory()
  const{itemid}=useParams()
  const [itemname, setitemname] = useState('')
  const [category, setcategory] = useState('')
  const [price, setprice] = useState('')
  const [image, setimage] = useState('')
  const [url, seturl] = useState('')
  const [uploading, setuploading] = useState(false)
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const date = new Date()
  useEffect(() => {
    firebase.firestore().collection('products').doc(itemid).get().then((doc)=>{
       let itemdata=doc.data()
       setitemname(itemdata.Productname)
       setcategory(itemdata.category)
       setprice(itemdata.price)
       seturl(itemdata.url)
    })
 
  }, [])
  const handleSubmit=(e)=>{
    e.preventDefault()
    setuploading(true)
    if(image){
        firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
            ref.getDownloadURL().then((url)=>{
            firebase.firestore().collection('products').doc(itemid).update({
             Productname:itemname,
             category,
             price,
             url,
             userId:user.uid,
             createdAt:date.toDateString()
           }).then(()=> 
           alert('success'))
           setuploading(false)
           history.goBack()
            })
          })
    }
    else{
        firebase.firestore().collection('products').doc(itemid).update({
            Productname:itemname,
            category,
            price,
            userId:user.uid,
            createdAt:date.toDateString()
          }).then(()=> 
          alert('success'))
          setuploading(false)
          history.goBack()

    }

  }
  return (
  <div>
      <Header /><br/><br/><br/><br/>
      <div className='sellbox'>
        <div className="centerDiv">
          <h6 id='heading'>Edit item</h6>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={itemname}
              onChange={(e)=>setitemname(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setcategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
             value={price}
             onChange={(e)=>setprice(e.target.value)}
            type="number" id="fname" name="Price" />
            <br />
        
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):url}></img>
        
            <br />
            <input className="btn  btn-sm "
              onChange={(e)=>setimage(e.target.files[0])}
              type="file" />
            <br />
           {uploading?<button className='uploadBtn'disabled>updating</button>: <button className='uploadBtn'> Submit</button>}
          </form>
        </div>
      </div>
      <Footer/>
      </div>
  );
};

export default Editpost;

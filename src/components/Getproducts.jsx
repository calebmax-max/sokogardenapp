import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {

  // Initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState("");

  // declare the navigate hook

  const navigate  = useNavigate()

  // Below we specify the image base url
   const img_url = "https://calebtonny.alwaysdata.net/static/images/"

  // Create a function to help you fetch the products from your API
  const fetchProducts = async() =>{
    try{

      // Update the loading hook
      setLoading(true) 

      //.Interact with your end point for fetching the products
      const response = await axios.get("https://calebtonny.alwaysdata.net/api/get_products")

      //Update the products hook with the response given from the API
      setProducts(response.data)

      //set the loading hook back to default
      setLoading(false)
      


    }
    catch(error){
      //step 8
      // if there is an error 
      // set the laoding hook back to default
      setLoading(false)

      // update the error hook with a message
      setError(error.message)

    }
  }

  // We shall use the useEffect hook. It enables us to automatically re-render new features incase of any changes
  useEffect(() =>{
    fetchProducts()
  }, [])

  // console.log(products)
  


  return (
    <div className='row'>
      <h3 className="text-primary">Available products</h3>
      {loading && <Loader/>}
      <h4 className="text-danger">{error}</h4>
      

    {/* map the products fetched from the API to the user interface*/}
    
    {products.map((product) => (
      <div className="col-md-3 justify-content-center mb-3">
        <div className="card shadow ">
          <img 
          src={img_url + product.product_photo}
          alt="product name"
          className='product_img mt-3' />

          <div className="card-body">
            <h5 className="text-primary">
              {product.product_name}
            </h5>
            <p className="text-dark"> {product.product_description.slice( 0 , 100)}...</p>
            <h4 className="text-warning">Kes {product.product_cost}</h4>

           <button className="btn btn-outline-dark"     onClick={ () => navigate ("/makepayment", {state : {product}})

           }>Purchase now</button>


          </div>
        </div>

      </div>

    )  )}

    </div>
  )
}

export default Getproducts;

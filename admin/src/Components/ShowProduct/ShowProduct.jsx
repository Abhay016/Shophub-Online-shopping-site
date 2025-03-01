import React, { useEffect, useState } from 'react'
import remove_icon from '../../assets/cart_cross_icon.png'
import './ShowProduct.css'
const ShowProduct = () => {
  const [allproducts, setallproducts] = useState([]);
  const fetchInfo = async () =>{
    await fetch('https://shophub-repo-7.onrender.com/allproducts').then((res)=>res.json()).then((data)=>{
      setallproducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const remove_product=async(id)=>{
    await fetch('https://shophub-repo-7.onrender.com/removeproduct',
      {
        method: 'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id}),
      }
    )
    await fetchInfo();
  }
  return (
      <div className='list-product'>
        <h1>Showing Products in the DataBase..</h1>
        <div className='listproduct-format-main'>
          <p>Product</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className='listproduct-allproducts'>
          <hr/>
          {allproducts.map((product, index)=>{
            return <><div className='listproduct-format-main listproduct-format'>
                  <img src={product.image} alt="" className='listproduct-product-icon' />
                  <p>{product.name}</p>
                  <p>₹{product.old_price}</p>
                  <p>₹{product.new_price}</p>
                  <p>{product.category}</p>
                  <img className="remove_image" onClick={()=>{remove_product(product.id)}} src={remove_icon} alt=""/>
              </div>
              <hr/>
              </>
              
          })}
        </div>
      </div>
  )
}

export default ShowProduct
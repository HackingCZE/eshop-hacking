import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';


import { urlFor } from '../lib/client';


const Product = ({ product: { image, name, slug, price, details, keys } }) => {
  const { keys: productKeys } = useStateContext();
  const [currentKeys, SetCurrentKeys] = useState([]);
  const nf = new Intl.NumberFormat("cs", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
    roundingIncrement: 1,
  });

  useEffect(() => {
   getKey(keys)
}, [])

  const getKey = (key) => {
    let newArray = [];
    productKeys.forEach(element => {
      key.forEach(element1 => {
        if (element._id === element1._ref) {
          newArray.push(element);
        }
      });
     
    });

    SetCurrentKeys(newArray)
  }
  return (
    <Link href={`/product/${slug.current}`} >

      <div className="showcase">

        <div className="showcase-banner">

          <img src={urlFor(image && image[0])} width={300}
            className="product-img default" />
          <img src={urlFor(image.length > 1 && image[1])} width={300} className="product-img hover" />

          {/* <p className="showcase-badge">15%</p> */}



        </div>

        <div className="showcase-content">

          <div className="showcase-category">{name}</div>

          <div>
            <h3 className="showcase-title">{details.substring(0, 35)}{details.length > 35 ? "..." : ""}</h3>
          </div>



          <div className="price-box">

            <div className="price">{nf.format(price)}</div>
            {/* <del>{nf.format(price)}</del> */}
          </div>

          {currentKeys.map((key) => <div className="price-box" key={key._id}>{key.name}</div>)}

        </div>

      </div>

      {/* <div className='product-card'>
        <img
          src={urlFor(image && image[0])}
          width={250}
          height={250}
          className='product-image' />
        <p className='product-name'>{name}</p>
        <p className='product-price'>{price}CZK</p>
      </div> */}
    </Link >
  )
};

export default Product;
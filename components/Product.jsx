import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price, details } }) => {
  const nf = new Intl.NumberFormat("cs", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
    roundingIncrement: 1,});
    return(
    <Link href = {`/product/${slug.current}`} >
    <div className="showcase">

      <div className="showcase-banner">

        <img src={urlFor(image && image[0])} width={300}
          className="product-img default" />
        <img src={urlFor(image.length > 1 && image[1])} width={300} className="product-img hover" />

        {/* <p className="showcase-badge">15%</p> */}

        

      </div>

      <div className="showcase-content">

        <a href="#" className="showcase-category">{name}</a>

        <a href="#">
          <h3 className="showcase-title">{details.substring(0, 35)}{details.length > 35 ? "..." : ""}</h3>
        </a>



        <div className="price-box">

          <p className="price">{nf.format(price)}</p>
          {/* <del>{nf.format(price)}</del> */}
        </div>

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
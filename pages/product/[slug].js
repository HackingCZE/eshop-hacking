import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';




const ProductDetails = ({ product, products, keys, sections, subsections }) => {

  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, inQty, qty, onAdd, setShowCart, setProducts, setKeys, setSections, setSubsections } = useStateContext();

  useEffect(() => {
    setProducts(products)
    setKeys(keys)
    setSections(sections)
    setSubsections(subsections)

  }, [])
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);

  }
  return (

    <div>

      <div className='product-detail-container'>
        <div>
          <div className='image-container'>

            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {/* {console.log(image)}
            {console.log(image.length)} */}

            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>


        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Podrobnosti:</h4>
          <p>{details}</p>
          <p className='price'>{price}CZK</p>
          <div className='quantity'>
            <h3>Množství:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num' >{qty}</span>
              <span className='plus' onClick={inQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Přidat do košíku</button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>Koupit hned</button>
          </div>
        </div>
      </div>

      {/* <div className='maylike-products-wrapper' >
        <h2>Může se vám také libit</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const keysQuery = '*[_type == "key"]';
  const keys = await client.fetch(keysQuery);

  const sectionsQuery = '*[_type == "section"]';
  const sections = await client.fetch(sectionsQuery);

  const subsectionsQuery = '*[_type == "subsection"]';
  const subsections = await client.fetch(subsectionsQuery);

  console.log(product);

  return {
    props: { products, product, keys, sections, subsections }
  }
}

export default ProductDetails
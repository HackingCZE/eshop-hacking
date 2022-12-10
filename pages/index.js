import React, { useState, useEffect } from 'react';

import { useStateContext } from '../context/StateContext';

import { client } from '../lib/client';
import { Product, HeroBanner, FooterBanner, GridOfProducts } from '../components';

import PulseLoader from "react-spinners/PulseLoader";

const Home = ({ products, bannerData, bannerProductData, keys, sections, subsections, ordersData }) => {
  const { setProducts, setKeys, setSections, setSubsections, setOrders, orders } = useStateContext();
  useEffect(() => {
    setProducts(products)
    setKeys(keys)
    setSections(sections)
    setSubsections(subsections)
    setOrders(ordersData)
  }, [])

  
  return (
    <div>{console.log(bannerProductData[0].slug + " ///////////////////////////")}
{console.log(orders)}
      <HeroBanner productBanner={bannerProductData.length && bannerProductData[0]} heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Nejlepší produkty na prodej</h2>
        <p>Sluchátka s několika variantami</p>
      </div>

      <GridOfProducts products={products}/>

      <FooterBanner footerBanner={bannerData && bannerData[0]} footerProduct={bannerProductData.length && bannerProductData[0]} />
    </div>

  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerProductQuery = `*[_type == "banner"]{
    product->
  }`;
  const bannerProductData = await client.fetch(bannerProductQuery);


  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const ordersQuery = '*[_type == "order"]';
  const ordersData = await client.fetch(ordersQuery);

  const keysQuery = '*[_type == "key"]';
  const keys = await client.fetch(keysQuery);

  const sectionsQuery = '*[_type == "section"]';
  const sections = await client.fetch(sectionsQuery);

  const subsectionsQuery = '*[_type == "subsection"]';
  const subsections = await client.fetch(subsectionsQuery);


  return {
    props: { products, bannerData, bannerProductData, keys, sections, subsections, ordersData }
  }
}

export default Home;
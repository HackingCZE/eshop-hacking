import React, { useEffect, useState } from 'react';

import { useStateContext } from '../context/StateContext';

import { client } from '../lib/client';
import { Product, HeroBanner, FooterBanner } from '../components';

import PulseLoader from "react-spinners/PulseLoader";

const GridOfProducts = (products, slug) => {
    const {  isLoading, setLoading } = useStateContext();
     const override = {

        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    return (
        <div className="product-main" >
            {console.log(products.products)}
            {slug && <h2 className="title">{slug?.name}</h2>}

            {isLoading && <div className='none'><PulseLoader
                color={"#880808"}
                loading={isLoading}
                cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            /></div>}
            {!isLoading && products.products.length < 1 && <div className='none'><span >Zdá se že nic vyhledávano nenabízíme</span></div>}
            <div className="product-grid">

                {products.products.length > 0 && products.products?.map((product) => <Product product={product} key={product._id}/>)}


            </div>

        </div>
    )
}

export default GridOfProducts
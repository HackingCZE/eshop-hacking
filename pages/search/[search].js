import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/client';

import PulseLoader from "react-spinners/PulseLoader";

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { useStateContext } from '../../context/StateContext';

import { Filter, Product } from '../../components';

import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}
const minDistance = 10;

const SearchedProducts = ({ products, keys, sections, subsections, slug }) => {
    const [allSearchedProducts, setAllSearchedProducts] = useState([]);
    const { setProducts, setKeys, setSections, setSubsections } = useStateContext();
    const [value1, setValue1] = useState([0, 10]);
    const [priceMax, setPriceMax] = useState(0);
    const [priceMin, setPriceMin] = useState(0);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setProducts(products);
        setKeys(keys);
        setSections(sections);
        setSubsections(subsections);
        setAllSearchedProducts(getAllSearchedProducts);
    }, [])


    const override = {

        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const overrideNotDisplay = {

        display: "none",
        margin: "0 auto",
        borderColor: "red",
    };
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    const getAllSearchedProducts = () => {
        setLoading(true)
        console.log("here")
        console.log(slug.slug.current.toLowerCase())
        let newArray = [];
        let pr1 = products.filter(searchingProduct => searchingProduct.keys?.forEach(element => {

            keys.forEach(key => {
                console.log(element._ref == key._id)
                if (element._ref == key._id) {
                    newArray.push(searchingProduct)
                }
            });

        }))
        setFliters(newArray)
        setLoading(false)
        return newArray;
    }

    const setFliters = (array) => {
        let max = 0;
        array.forEach(element => {
            if (element.price > max) {
                max = element.price;
            }
        });

        let min = 99999999999999999999999;
        array.forEach(element => {
            if (element.price < min) {
                min = element.price;
            }
        });

        console.log(max)
        console.log(min)
        setPriceMin(min);
        setPriceMax(max);
        setValue1([min, max])
    }

    const submitFiltres = () => {
        setLoading(true)
        let newArray = [];
        setAllSearchedProducts(newArray)
        setTimeout(() => {
            
        products.filter(searchingProduct => searchingProduct.keys?.forEach(element => {

            keys.forEach(key => {

                if (element._ref == key._id) {
                    newArray.push(searchingProduct)
                }
            });

        }))

        let newFiltredArray = [];
        newArray.forEach(element => {

            if ((element.price >= value1[0] && element.price <= value1[1])) {
                newFiltredArray.push(element)
            }
        });
        setAllSearchedProducts(newFiltredArray)
        setLoading(false)
        }, 1000);
        
    }

    return (
        <div className="product-container">

            <div className="container">
                <div className="sidebar  has-scrollbar" data-mobile-menu>

                    <div className="sidebar-category">

                        <div className="sidebar-top">
                            <h2 className="sidebar-title">Filtry</h2>

                            <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                                <AiOutlineArrowDown />
                            </button>
                        </div>

                        <ul className="sidebar-menu-category-list">
                            <div className='slider-texts'>
                                <span>{value1[0]}</span>
                                <span>{value1[1]}</span>
                            </div>

                            <Slider
                                getAriaLabel={() => 'Minimum distance'}
                                value={value1}
                                onChange={handleChange1}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                step={1}
                                min={priceMin}
                                max={priceMax}
                            />
                            <Filter />

                            <button className='btn' onClick={submitFiltres}>Ulož filtry</button>


                        </ul>

                    </div>


                </div>

                <div className="product-main">

                    <h2 className="title">{slug?.name}</h2>
                    {isLoading && <div className='none'><PulseLoader
                        color={"#880808"}
                        loading={isLoading}
                        cssOverride={override}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /></div>}
                    {!isLoading && allSearchedProducts.length < 1 && <div className='none'><span >Zdá se že nic vyhledávano nenabízíme</span></div>}
                    <div className="product-grid">

                        {allSearchedProducts.length > 0 && allSearchedProducts?.map((product) => <Product product={product} />)}


                    </div>

                </div>


            </div >
        </div >
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "section"] {
                slug {
                current
            }
    }
            `;

    const sections = await client.fetch(query);

    const paths = sections.map((section) => ({
        params: {
            search: section.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { search } }) => {
    const query = `*[_type == "subsection" && slug.current == '${search}'][0]`;
    const slug = await client.fetch(query);



    const productsQuery = '*[_type == "product"]'
    const products = await client.fetch(productsQuery);

    const keysQuery = '*[_type == "key"]';
    const keys = await client.fetch(keysQuery);

    const sectionsQuery = '*[_type == "section"]';
    const sections = await client.fetch(sectionsQuery);

    const subsectionsQuery = '*[_type == "subsection"]';
    const subsections = await client.fetch(subsectionsQuery);



    return {
        props: { products, keys, sections, subsections, slug }
    }
}

export default SearchedProducts
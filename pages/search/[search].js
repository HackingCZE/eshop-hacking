import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/client';

import PulseLoader from "react-spinners/PulseLoader";

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { useStateContext } from '../../context/StateContext';

import { Filter, GridOfProducts, Product } from '../../components';

import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}
const minDistance = 10;

const SearchedProducts = ({ products, keys, sections, subsections, slug }) => {

    const { setProducts, setKeys, setSections, setSubsections, isLoading, setLoading, setAllSearchedProducts, allSearchedProducts } = useStateContext();
    const [value1, setValue1] = useState([0, 10]);
    const [priceMax, setPriceMax] = useState(0);
    const [priceMin, setPriceMin] = useState(0);

    useEffect(() => {
        setProducts(products);
        setKeys(keys);
        setSections(sections);
        setSubsections(subsections);


        let prs = getAllSearchedProducts();
        setAllSearchedProducts(prs);
        setFliters(prs)
    }, [slug.slug.current])





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

        products.filter(searchingProduct => searchingProduct.keys?.forEach(element => {

            keys.forEach(key => {
                console.log(slug.slug.current + " x " + key.name)
                if (element._ref === key._id && slug.slug.current.toLowerCase().includes(key.name.toLowerCase())) {
                    newArray.push(searchingProduct)
                }
            });

        }))

        products.filter(searchingProduct => searchingProduct.keys?.forEach(element => {

            subsections.forEach(key => {
                console.log(key)
                if (element._ref === key._id && slug.slug.current.toLowerCase().includes(key.name.toLowerCase())) {
                    newArray.push(searchingProduct)
                }
            });

        }))
        console.log("-*-*-*-*-*-*-*-*")
        console.log(newArray)
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

        let min = 99999999;
        array.forEach(element => {
            if (element.price < min) {
                min = element.price;
            }
        });


        setPriceMin(min);
        setPriceMax(max);
        setValue1([min, max])
    }

    const submitFiltres = () => {
        setLoading(true)
        let newArray = [];
        setAllSearchedProducts([])
        setTimeout(() => {

            products.filter(searchingProduct => searchingProduct.keys?.forEach(element => {

                keys.forEach(key => {
                    console.log(slug.slug.current + " x " + key.name)
                    if (element._ref === key._id && slug.slug.current.toLowerCase().includes(key.name.toLowerCase())) {
                        newArray.push(searchingProduct)
                    }
                });

            }))

            products.filter(searchingProduct => searchingProduct.keys?.forEach(element => {

                subsections.forEach(key => {
                    console.log(key)
                    if (element._ref === key._id && slug.slug.current.toLowerCase().includes(key.name.toLowerCase())) {
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
                            {allSearchedProducts.length > 1 && <div>
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
                            </div>}
                            <Filter />

                            <button className='btn' onClick={submitFiltres}>Ulož filtry</button>


                        </ul>

                    </div>


                </div>

                <GridOfProducts products={allSearchedProducts} slug={slug} />



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

    console.log(paths)
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { search } }) => {
    let query = `*[_type == "subsection" && slug.current == '${search}'][0]`;
    




    const productsQuery = '*[_type == "product"]'
    const products = await client.fetch(productsQuery);

    const keysQuery = '*[_type == "key"]';
    const keys = await client.fetch(keysQuery);

    const sectionsQuery = '*[_type == "section"]';
    const sections = await client.fetch(sectionsQuery);

    const subsectionsQuery = '*[_type == "subsection"]';
    const subsections = await client.fetch(subsectionsQuery);

    sections.forEach(element => {
        if (element.slug.current === search) {
            query = `*[_type == "section" && slug.current == '${search}'][0]`;
            
        }
    });
    let slug = await client.fetch(query);
    return {
        props: { products, keys, sections, subsections, slug }
    }
}

export default SearchedProducts;
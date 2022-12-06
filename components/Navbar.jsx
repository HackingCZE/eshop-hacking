import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai';

import { Cart, Category } from './';
import { useStateContext } from '../context/StateContext';
import { client } from '../lib/client';

import { Container, FormControl, FormLabel, Heading, Input, Textarea, FormErrorMessage, Text, useToast } from '@chakra-ui/react';

import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping } from '@fortawesome/free-solid-svg-icons';
const initValues = {
  search: "",

};

const initState = { values: initValues };

const Navbar = () => {
 
  const { showCart, products, keys, setShowCart, totalQuantities, sections, subsections } = useStateContext();
  const [state, setState] = useState(initState);
  const [searching, setSearching] = useState(false);
  const [searchedProductsState, setSearchedProducts] = useState([]);
  const [searchedCategoriesState, setSearchedCategories] = useState([]);

  let searchedProducts = [];
  const searchProduct = ({ target }) => {

    console.log(target.value)


    let searchedProductsToAdd = [];
    let searchedCategoriesToAdd = [];

    let pr = products.filter(searchingProduct => searchingProduct.name.toLowerCase().includes(target.value.toLowerCase()))

    let pr1 = products.filter(searchingProduct => searchingProduct.slug.current.toLowerCase().includes(target.value.toLowerCase()))


    products.filter(searchingProduct => {
      typeof (searchingProduct.keys) === "object" && searchingProduct.keys.forEach(element => {
        console.log("keys")
        keys.forEach(key => {
          if (element._ref === key._id) {

            console.log(key.name + " * " + element._ref + " x " + searchingProduct.name + " x " + key._id + " - " + key.name.toLowerCase().includes(target.value.toLowerCase()))
            if (key.name.toLowerCase().includes(target.value.toLowerCase())) {
              searchedProductsToAdd.push(searchingProduct)
            }
          }
        });
        console.log("/keys")

      })
    })


    searchedProducts = pr;


    pr1.forEach(element => {
      let ok = true;
      searchedProducts.forEach(element1 => {
        if (element === element1) {
          ok = false;
        }
      });
      if (ok) {
        searchedProductsToAdd.push(element)
      }
    });



    searchedProductsToAdd.forEach(element => {
      searchedProducts.push(element)
    });
    console.log(searchedProducts)


    let ct = subsections.filter(searchingCategory => searchingCategory.name.toLowerCase().includes(target.value.toLowerCase()))

    setSearching(true)
    setSearchedProducts(searchedProducts);
    setSearchedCategories(ct);
  }



  const handleChange = ({ target }) => setState((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      [target.name]: target.value,
    }

  }));

  let newSections = [];


  return (

    <div >
      {sections.forEach(sec => {
        let subs = []
        subsections.forEach(sub => {

          sec.subsections.forEach(element => {
            console.log(element._ref === sub._id)
            if (element._ref === sub._id) {

              subs.push(sub)
            }
          });

        });
        newSections.push({ name: sec.name, slug: sec.slug, subsections: subs, _id:uuidv4() })
      })}



      <div className="header-main">

        <div className="container">


          <Link href='/' className="header-logo">E-shop</Link>


          <div className="header-search-container">
            <Input type="search" name='search' className="search-field" onChange={searchProduct}
            />
            {console.log(searchedProductsState)}
            <ul className="dropdown-list active" >
              {searching && searchedProductsState.length > 0 && <div>
                <span className="menu-title search-box">Produkty</span>
                {searchedProductsState?.map((searchedProduct) =>
                  <Link href={`/product/${searchedProduct.slug.current}`}>
                    <li className="dropdown-item search-box">
                      <a href="#">{searchedProduct.name}</a>
                    </li>
                  </Link>
                )}

                <hr />
                <br />


              </div>}

              {searching && searchedCategoriesState.length > 0 && <div>

                <span className="menu-title search-box">Kategorie</span>
                {searchedCategoriesState?.map((searchedCategory) =>
                  <Link href={`/search/${searchedCategory.slug.current}`}>
                    <li className="dropdown-item search-box">
                      <a href="#">{searchedCategory.name}</a>
                    </li>
                  </Link>
                )}
                <hr />
                <br />
              </div>}
            </ul>
            <button className="search-btn">
              <AiOutlineSearch />

            </button>

          </div>

          <div className="header-user-actions">





            <button className="action-btn cart-icon" onClick={() => setShowCart(true)} >
              <AiOutlineShopping />
              <span className='cart-item-qty'>{totalQuantities}</span>
            </button>

          </div>

        </div>

      </div>

      <nav className="desktop-navigation-menu">

        <div className="container">

          <ul className="desktop-menu-category-list">


            {console.log(newSections)}
            {newSections.map((category => <Category category={category} />))}

          </ul>


        </div>

      </nav>

      <div className="mobile-bottom-navigation">

        <button className="action-btn" data-mobile-menu-open-btn>
          <ion-icon name="menu-outline"></ion-icon>
        </button>

        <button className="action-btn">
          <ion-icon name="bag-handle-outline"></ion-icon>

          <span className="count">0</span>
        </button>

        <button className="action-btn">
          <ion-icon name="home-outline"></ion-icon>
        </button>

        <button className="action-btn">
          <ion-icon name="heart-outline"></ion-icon>

          <span className="count">0</span>
        </button>

        <button className="action-btn" data-mobile-menu-open-btn>
          <ion-icon name="grid-outline"></ion-icon>
        </button>

      </div>

      <nav className="mobile-navigation-menu  has-scrollbar" data-mobile-menu>

        <div className="menu-top">
          <h2 className="menu-title">Menu</h2>

          <button className="menu-close-btn" data-mobile-menu-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <ul className="mobile-menu-category-list">

          <li className="menu-category">
            <a href="#" className="menu-title">Home</a>
          </li>

          <li className="menu-category">

            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Men's</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Shirt</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Shorts & Jeans</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Safety Shoes</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Wallet</a>
              </li>

            </ul>

          </li>

          <li className="menu-category">

            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Women's</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Dress & Frock</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Earrings</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Necklace</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Makeup Kit</a>
              </li>

            </ul>

          </li>

          <li className="menu-category">

            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Jewelry</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Earrings</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Couple Rings</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Necklace</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Bracelets</a>
              </li>

            </ul>

          </li>

          <li className="menu-category">

            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Perfume</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Clothes Perfume</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Deodorant</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Flower Fragrance</a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">Air Freshener</a>
              </li>

            </ul>

          </li>

          <li className="menu-category">
            <a href="#" className="menu-title">Blog</a>
          </li>

          <li className="menu-category">
            <a href="#" className="menu-title">Hot Offers</a>
          </li>

        </ul>

        <div className="menu-bottom">

          <ul className="menu-category-list">

            <li className="menu-category">

              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Language</p>

                <ion-icon name="caret-back-outline" className="caret-back"></ion-icon>
              </button>

              <ul className="submenu-category-list" data-accordion>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">English</a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">Espa&ntilde;ol</a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">Fren&ccedil;h</a>
                </li>

              </ul>

            </li>

            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Currency</p>
                <ion-icon name="caret-back-outline" className="caret-back"></ion-icon>
              </button>

              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">USD &dollar;</a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">EUR &euro;</a>
                </li>
              </ul>
            </li>

          </ul>

          <ul className="menu-social-container">

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>

          </ul>

        </div>

      </nav>



      {/* {console.log("navBar")}
      {console.log(products)}
      {console.log(keys)}
      <p className='logo'>
        <Link href='/'>E-shop</Link>
      </p>
      <ul>
        <li><Input type="text" name='search' onChange={searchProduct} /></li>
      </ul>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
*/}
      {showCart && <Cart />}
    </div>
  )
}





export default Navbar
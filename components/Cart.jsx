import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import {Order} from '../components';





const Cart = () => {
  
  const { totalPrice, totalQuantities, cartItems, setShowCart, setShowOrder, showOrder, toggleCartItemQuantity, onRemove} = useStateContext();
  
  return (
    <div className='cart-wrapper' >
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Váš košík</span>
          <span className='cart-num-items'>({totalQuantities} položek)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Váš nákupní košík je prazdný</h3>
            <Link href="/">
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className="btn">
                Pokračovat
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
   
          {cartItems.length >= 1 && cartItems.map((item) => (
              
            <div className='product'>
              
              <img src={urlFor(item.image[0])} className="cart-product-image" />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>{item.price}CZK</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                    <span className='num' >{item.quantity}</span>
                    <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                  </p>
                </div>
                <button
                type='button'
                className='remove-item'
                onClick={() => onRemove(item)}>
<TiDeleteOutline/>
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 &&(
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Celkem:</h3>
              <h3>{totalPrice}CZK</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={() =>setShowOrder(true)}>Objednat
              </button>
            </div>
          </div>
        )}
      </div>
      {showOrder && <Order/>}
    </div>
  )
}

export default Cart
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [sections, setSections] = useState([]);
    const [orders, setOrders] = useState([]);
    const [subsections, setSubsections] = useState([]);
    const [keys, setKeys] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [allSearchedProducts, setAllSearchedProducts] = useState([]);

    const onAdd = (product, quantity) => {
        
        let checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            let updatedCartItems = cartItems.map((cartProduct) => {

                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
                else{
                    return {...cartProduct};
                }
            })

            setCartItems(updatedCartItems.sort((a, b) => a.name.localeCompare(b.name)));
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }].sort((a, b) => a.name.localeCompare(b.name)));
        }
       
        toast.success(`${qty} ${product.name} byl přidán do košíku.`);

    }

    const onRemove = (product) => {
        let foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuintities) => prevTotalQuintities - foundProduct.quantity);
        setCartItems(newCartItems.sort((a, b) => a.name.localeCompare(b.name)));
    }

    const toggleCartItemQuantity = (id, value) => {
        let foundProduct = cartItems.find((item) => item._id === id);
        let index = cartItems.findIndex((product) => product._id === id);

        const newCartItems = cartItems.filter((item) => item._id !== id);




        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }].sort((a, b) => a.name.localeCompare(b.name)));
            setTotalQuantities((prevTotalQuintities) => prevTotalQuintities + 1);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {

                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }].sort((a, b) => a.name.localeCompare(b.name)));
                setTotalQuantities((prevTotalQuintities) => prevTotalQuintities - 1);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            }
        }
    }

    const inQty = () => {
        setQty((prevQTY) => prevQTY + 1);
    }

    const decQty = () => {
        setQty((prevQTY) => {
            if (prevQTY - 1 < 1) return 1;

            return prevQTY - 1;
        });
    }
    
  
    return (
        <Context.Provider
            value={{
                setOrders,
                orders,
                setSubsections,
                subsections,
                setSections,
                sections,
                setKeys,
                keys,
                products,
                setProducts,
                showCart,
                showOrder,
                setShowCart,
                setShowOrder,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                inQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                isLoading,
                setLoading,
                setAllSearchedProducts,
                allSearchedProducts,
                onRemove
            }}>
            {children}
        </Context.Provider>
    )
}



export const useStateContext = () => useContext(Context);
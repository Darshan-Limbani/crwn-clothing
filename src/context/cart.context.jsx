import {queries} from "@testing-library/react";
import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    removeItemFromCart: () => {
    },
    clearItemFromCart: () => {
    },
    cartCount: 0,
    cartTotal: 0
});

function addCartItem(cartItems, productToAdd) {

    console.log("cartItems, productToAdd==========>", cartItems, productToAdd);

    const itemIsExist = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (itemIsExist) {

        console.log("itemIsExist==>", itemIsExist);

        return cartItems.map((item) => (
            item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item
        ));
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((item) => (
        item.id === cartItemToRemove.id ? {...item, quantity: item.quantity - 1} : item
    ));

};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

};

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {

        setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));

    }, [cartItems]);

    useEffect(() => {

        setCartTotal(cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0));

    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };


    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
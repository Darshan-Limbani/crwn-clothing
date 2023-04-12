import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    cartCount: 0
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


function cartItemCount(cartItem) {

}

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount] = useState(0);


    useEffect(() => {

        setCartCount(cartItems.reduce((total, cartItem) => total + Number(cartItem.quantity), 0));

    }, [cartItems]);


    const addItemToCart = (productToAdd) => {

        console.log("productToAdd--------->", productToAdd);

        setCartItems(addCartItem(cartItems, productToAdd));

    };


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
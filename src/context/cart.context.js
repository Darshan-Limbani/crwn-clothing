import {createContext, useState} from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {

        console.log("productToAdd--------->", productToAdd);

        setCartItems(addCartItem(cartItems, productToAdd));

    };


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
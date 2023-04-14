import {createAction} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPE} from "./cart.types";


export const setCartIsOpen = (bool) => {
    return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool);
};

function addCartItem(cartItems, productToAdd) {

    const itemIsExist = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if (itemIsExist) {
        return cartItems.map((item) => (item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item));
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((item) => (item.id === cartItemToRemove.id ? {...item, quantity: item.quantity - 1} : item));

};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
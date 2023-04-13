import {createContext, useReducer} from "react";
import {createAction} from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
    isCartOpen: false, setIsCartOpen: () => {
    }, cartItems: [], addItemToCart: () => {
    }, removeItemFromCart: () => {
    }, clearItemFromCart: () => {
    }, cartCount: 0, cartTotal: 0
});

function addCartItem(cartItems, productToAdd) {

    console.log("cartItems, productToAdd==========>", cartItems, productToAdd);

    const itemIsExist = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (itemIsExist) {

        console.log("itemIsExist==>", itemIsExist);

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

const CART_ACTION_TYPE = {
    SET_CART_ITEMS: 'SET_CART_ITEMS', SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};


const INITIAL_STATE = {
    isCartOpen: true, cartItems: [], cartCount: 0, cartTotal: 0
};

const cartReducer = (state, action) => {
    const {type, payload} = action;
    console.log(type, payload);
    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state, ...payload
            };
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state, isCartOpen: payload
            };

        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
};
export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{
        cartItems, cartCount, cartTotal, isCartOpen
    }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


    // useEffect(() => {
    //
    //     setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));
    //
    // }, [cartItems]);
    //
    // useEffect(() => {
    //
    //     setCartTotal(cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0));
    //
    // }, [cartItems]);


    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);


        dispatch(createAction(
            CART_ACTION_TYPE.SET_CART_ITEMS, {
                cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount,
            }));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));
    };


    const value = {
        isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
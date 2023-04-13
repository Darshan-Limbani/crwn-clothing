import {createContext} from "react";
import {USER_ACTION_TYPES} from "../store/user/user.types";

export const UserContext = createContext({
    currentUser: null, setCurrentUser: () => null
});


const INITIAL_STATE = {
    currentUser: null
};


const userReducer = (state, action) => {

    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state, currentUser: payload
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }

};
import {Fragment, useContext} from "react";
import {useSelector} from "react-redux";
import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/logo.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {CartContext} from "../../context/cart.context";
import {selectCurrentUser} from "../../store/user/user.selector";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {

    // const {currentUser, setCurrentUser} = useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser);

    const {isCartOpen} = useContext(CartContext);

    return (<Fragment>
        <div className={'navigation'}>
            <Link to={'/'} className={'logo-container'}>
                <CrwnLogo className={'logo'}/>
            </Link>
            <div className={'nav-links-container'}>
                <Link to={'/shop'} className={'nav-link'}>
                    SHOP
                </Link>
                {currentUser ? (<span className={'nav-link'} onClick={signOutUser}>SIGN OUT</span>) : (
                    <Link to={'/auth'} className={'nav-link'}>
                        SIGN IN
                    </Link>)}
                <CartIcon/>
            </div>
            {isCartOpen && <CartDropdown/>}
        </div>
        <Outlet/>
    </Fragment>);
};

export default Navigation;
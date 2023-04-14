import {Fragment} from "react";
import {useSelector} from "react-redux";
import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/logo.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {selectCurrentUser} from "../../store/user/user.selector";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {

    // const {currentUser, setCurrentUser} = useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);
    console.log("isCartOpen Navigation=====>", isCartOpen);


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
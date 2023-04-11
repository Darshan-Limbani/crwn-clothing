import {Fragment, useContext} from "react";
import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/logo.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {UserContext} from "../../context/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext);

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

        </div>
        <Outlet/>
    </Fragment>);
};

export default Navigation;
import {Fragment, useContext} from "react";
import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/logo.svg";
import './navigation.styles.scss';
import {UserContext} from "../../context/user.context";

const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    console.log(currentUser);
    return (
        <Fragment>
            <div className={'navigation'}>
                <Link to={'/'} className={'logo-container'}>
                    <CrwnLogo className={'logo'}/>
                </Link>
                <div className={'nav-links-container'}>
                    <Link to={'/shop'} className={'nav-link'}>
                        SHOP
                    </Link>
                    <Link to={'/auth'} className={'nav-link'}>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    );
};

export default Navigation;
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Route, Routes} from "react-router-dom";
import './App.css';
import logger from "redux-logger";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/sign-in/authentication.component";
import {getCurrentUser} from "./utils/firebase/firebase.utils";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getCurrentUser().then((user) => console.log(user));
    }, []);
    return (<Routes>
        <Route path={'/'} element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path={'shop/*'} element={<Shop/>}/>
            <Route path={'auth'} element={<Authentication/>}/>
            <Route path={'checkout'} element={<Checkout/>}/>
        </Route>
    </Routes>);
};

export default App;
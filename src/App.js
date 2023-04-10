import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./routes/home/home.component";

const App = () => {

    return (
        <Routes>
            <Route path={'/home'} element={<Home/>}>

            </Route>
        </Routes>
    );
};

export default App;
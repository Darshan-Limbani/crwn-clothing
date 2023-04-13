import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {setCategoriesMap} from "../../store/category/category.action";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.compoent";
import Category from "../category/category.component";
import './shop.styles.scss';

const Shop = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const getCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            dispatch(setCategoriesMap(categoryMap));
        };
        getCategories();
    }, []);

    return (<Routes>
        <Route index element={<CategoriesPreview/>}/>
        <Route path=":category" element={<Category/>}/>
    </Routes>);
};

export default Shop;
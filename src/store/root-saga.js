import {all, call, put} from 'redux-saga/effects';
import {categoriesSaga} from "./categories/category.saga";

export function* rootSaga() {

    yield all([call(categoriesSaga)]);
}
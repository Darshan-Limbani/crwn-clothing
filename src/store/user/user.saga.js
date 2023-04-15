import {call, all, put, takeLatest} from 'redux-saga/effects';
import {getCurrentUser} from "../../utils/firebase/firebase.utils";
import {USER_ACTION_TYPES} from "./user.types";

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) {
            return;
        }
    } catch (error) {

    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,);
}

export function* userSaga() {
    yield all([]);
}
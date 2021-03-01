import { createStore, combineReducers } from "redux";

//importing reducers
import showregisterReducers from "../reducers/showregisterReducers/showregisterReducers";


const rootReducers = combineReducers({
    showregisterReducers: showregisterReducers
});

const configureStore = () => createStore(rootReducers)

export default configureStore;
import { createStore, combineReducers } from "redux";

//importing reducers
import showregisterReducers from "../reducers/showregisterReducers/showregisterReducers";
import showforgetpasswordReducers from "../reducers/showforgetpassword/showforgetpassword"
import showtooltipReducers from "../reducers/showtooltipReducers/showtooltipReducers";
import showsidebarReducers from "../reducers/showsidebarReducers/showsidebarReducers";
import activesidebarReducers from "../reducers/activesidebarReducers/activesidebarReducers";

const rootReducers = combineReducers({
    showregisterReducers: showregisterReducers,
    showforgetpasswordReducers: showforgetpasswordReducers,
    showtooltipReducers: showtooltipReducers,
    showsidebarReducers: showsidebarReducers,
    activesidebarReducers: activesidebarReducers,
});

const configureStore = () => createStore(rootReducers)

export default configureStore;
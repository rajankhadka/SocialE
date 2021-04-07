import { createStore, combineReducers } from "redux";

//importing reducers
import showregisterReducers from "../reducers/showregisterReducers/showregisterReducers";
import showforgetpasswordReducers from "../reducers/showforgetpassword/showforgetpassword"
import showtooltipReducers from "../reducers/showtooltipReducers/showtooltipReducers";
import showsidebarReducers from "../reducers/showsidebarReducers/showsidebarReducers";
import activesidebarReducers from "../reducers/activesidebarReducers/activesidebarReducers";
import loginReducers from "../reducers/loginuserReducers/loginuserReducers";

const rootReducers = combineReducers({
    showregisterReducers: showregisterReducers,
    showforgetpasswordReducers: showforgetpasswordReducers,
    showtooltipReducers: showtooltipReducers,
    showsidebarReducers: showsidebarReducers,
    activesidebarReducers: activesidebarReducers,
    loginReducers: loginReducers
});

const configureStore = () => createStore(rootReducers)

export default configureStore;
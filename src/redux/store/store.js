import { createStore, combineReducers } from "redux";

//importing reducers
import showregisterReducers from "../reducers/showregisterReducers/showregisterReducers";
import showforgetpasswordReducers from "../reducers/showforgetpassword/showforgetpassword"
import showtooltipReducers from "../reducers/showtooltipReducers/showtooltipReducers";
import showsidebarReducers from "../reducers/showsidebarReducers/showsidebarReducers";
import activesidebarReducers from "../reducers/activesidebarReducers/activesidebarReducers";
import loginReducers from "../reducers/loginuserReducers/loginuserReducers";
import tokensavedReducers from "../reducers/tokensavedReducers/tokensavedReducers";
import templateReducers from "../reducers/templateReducers/templateReducers";


const rootReducers = combineReducers({
    showregisterReducers: showregisterReducers,
    showforgetpasswordReducers: showforgetpasswordReducers,
    showtooltipReducers: showtooltipReducers,
    showsidebarReducers: showsidebarReducers,
    activesidebarReducers: activesidebarReducers,
    loginReducers: loginReducers,
    tokensavedReducers: tokensavedReducers,
    templateReducers: templateReducers,
});

const configureStore = () => createStore(rootReducers)

export default configureStore;
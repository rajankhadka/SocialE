import { createStore, combineReducers } from "redux";

import templateReducers from "../reducers/templatereducer";

const rootReducers = combineReducers({
    templateReducers
});

const configureStore = () => createStore(rootReducers);

export default configureStore;
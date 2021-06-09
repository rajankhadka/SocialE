import {modelRegister} from "../../actions/actionTypes";

const initialState = {
    showregister: false
}

const showregisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case modelRegister.CLOSEREGISTER:
            return {
                ...state,
                showregister: false
            };
        case modelRegister.OPENREGISTER:
            return {
                ...state,
                showregister: true
            };
        default:
            return state;
    }
}

export default showregisterReducer;
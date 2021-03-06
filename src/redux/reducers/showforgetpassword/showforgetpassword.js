import { modelRegister } from "../../actions/actionTypes";

const initialState = {
    showforgetpassword: false
}

const showforgetpasswordReducers = (state = initialState, action) =>{
    switch (action.type) {
        case modelRegister.CLOSEFORGETPASSWORD:
            return {
                ...state,
                showforgetpassword: false
            }
        case modelRegister.OPENFORGETPASSWORD:
            return {
                ...state,
                showforgetpassword: true,
            }
        default:
            return state;
    }
}

export default showforgetpasswordReducers;
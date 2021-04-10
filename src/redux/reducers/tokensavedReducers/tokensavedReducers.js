import { token } from "../../actions/actionTypes";

const initialState = {
    token: ""
};

const tokensavedReducers = (state = initialState, action) => {
    console.log("reducers token saved--->",action.data)
    switch (action.type) {
        case token.TOKEN:
            
            return {
                ...state,
                token: action.data
            }
    
        default:
            return state;
    }
}

export default tokensavedReducers;
import { TEMPLATESEND } from "../action/actionTypes";

const initialState = {
    templatename: ""
}

const templateReducers = (state = initialState, action) => {
    switch (action.type) {
        case TEMPLATESEND:
            console.log("action.data",action.data)
            return {
                ...state,
                templatename : action.data
            }
    
        default:
            return state
    }
}

export default templateReducers;
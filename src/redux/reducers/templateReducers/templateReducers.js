import { TEMPLATE } from "../../actions/actionTypes";

const initialState = {
    templateName: '',
}

const templateReducers = (state = initialState, action) => {
    console.log("template new reducers");
    switch (action.type) {
        case TEMPLATE.SETTEMPLATE:
            return {
                templateName : action.data
            }
    
        default:
            return state
    }
}

export default templateReducers;
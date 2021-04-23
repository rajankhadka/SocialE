import { TEMPLATEPAGE } from "../../actions/actionTypes";

const initialState = {
    templatePageToggle : "view"
}

const templatePageToggleReducers = (state = initialState, action) =>{
    switch (action.type) {
        case TEMPLATEPAGE.TEMPLATEVIEW:
            return {
                templatePageToggle:"view"
            }
        
        case TEMPLATEPAGE.TEMPLATECREATE:
            return {
                templatePageToggle: "create"
            }
    
        default:
            return state
    }
}


export default templatePageToggleReducers;
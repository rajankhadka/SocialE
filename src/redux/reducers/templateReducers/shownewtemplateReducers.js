import { SHOWNEWTEMPLATE } from "../../actions/actionTypes";

const initialState = {
    shownewtemplate: "",
}

const shownewtemplateReducers = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case SHOWNEWTEMPLATE.NEWTEMPLATE:
            return {
                shownewtemplate: action.data
            }
    
        default:
            return state;
    }
}

export default shownewtemplateReducers;
import { headerTooltip } from "../../actions/actionTypes";

const initialState = {
    visibility:  false ,  //"hidden",
    tooltipzIndex:  false ,   //"-1",
    bodyzIndex: true ,  //"1",
    border: false,
}

const showtooltipReducers = (state = initialState, action) => {
    switch (action.type) {
        case headerTooltip.CLOSETOOLTIP:
            return {
                ...state,
                visibility:  false ,  //"hidden",
                tooltipzIndex:  false ,   //"-1",
                bodyzIndex:  true   //"1",
            }
        
        case headerTooltip.OPENTOOLTIP:
            return {
                visibility: !state.visibility  ,  //"hidden",
                tooltipzIndex:  !state.tooltipzIndex ,   //"-1",
                bodyzIndex: !state.bodyzIndex,   //"1",
                border: !state.border,
            }
    
        default:
            return state;
    }
}

export default showtooltipReducers;
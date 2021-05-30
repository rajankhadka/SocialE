import { TargetAudience } from "../../actions/actionTypes";

const initialState = {
    availableAudience: [],
    groupName:[],
}

const targetaudienceReducers = (state = initialState, action) => {
    switch (action.type) {
        case TargetAudience.AVAILABLEAUDIENCE:
            let newdata = action.data.map((item) => {
                return {
                    ...item,
                    click : true
                }
            });
            return {
                ...state,
                availableAudience: [...newdata]
            }
        
        case TargetAudience.CLICKAUDIENCE:
            let clickdata = state.availableAudience.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        click : true
                    }
                }
                return item
            })

            return {
                ...state,
                availableAudience: clickdata
            }
        
        case TargetAudience.DISABLEAUDIENCE:
            let disabledata = state.availableAudience.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        click: false,
                    }
                }
                return item
            })

            return {
                ...state,
                availableAudience: disabledata
            }
        
        case TargetAudience.ADDNEWAUDIENCE:
            return {
                ...state,
                availableAudience: state.availableAudience.concat({...action.data}),
            }

        case TargetAudience.GROUPADD:
            console.log("Group Reducers", action.data);
            return {
                ...state,
                groupName: action.data
            }
        
        default:
            return state
    }
}

export default targetaudienceReducers;
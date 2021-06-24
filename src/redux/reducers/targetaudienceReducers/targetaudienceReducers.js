import { TargetAudience } from "../../actions/actionTypes";

const initialState = {
    availableAudience: [],
    groupName: [],
}

const targetaudienceReducers = (state = initialState, action) => {
    let distinctUser = [];
    let newdata = [];
    let flag = false;

    switch (action.type) {
        case TargetAudience.AVAILABLEAUDIENCE:

            //making distinct array
            if (state.availableAudience.length > 0) {
                for (let i = 0; i < state.availableAudience.length; i++){
                    for (let j = 0; j < action.data.length; j++){
                        
                        if (action.data[j].email !== state.availableAudience[i].email) {
                            for (let k = 0; k < state.availableAudience.length; k++){
                                if (action.data[j].email === state.availableAudience[k].email) {
                                    flag = true;
                                }   
                            }
                            if (!flag) {
                                distinctUser.push(action.data[j]);
                            }
                        }
                    }
                }
                console.log('distinct data', distinctUser);
            } else {
                newdata = action.data.map((item) => {
                    return {
                        // ...item,
                        email: item.email,
                        targetusergroup:item.targetusergroup,
                        click: true,
                        id:item.id
                    }
                });
            }

            
            
            if (distinctUser.length > 0) {

                newdata = distinctUser.map((item) => {
                    return {
                        // ...item,
                        email: item.email,
                        targetusergroup:item.targetusergroup,
                        click: true,
                        id:item.id
                    }
                });
            }
            
            // let newdata = action.data.map((item) => {
            //     return {
            //         // ...item,
            //         email: item.email,
            //         targetusergroup:item.targetusergroup,
            //         click: true,
            //         id:item.id
            //     }
            // });
            return {
                ...state,
                availableAudience: state.availableAudience.concat(newdata),
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
                availableAudience: clickdata,
                
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
                availableAudience: [...disabledata],
            }
        
        case TargetAudience.ADDNEWAUDIENCE:

            if (state.availableAudience.length > 0) {

                for (let k = 0; k < state.availableAudience.length; k++){
                    if (action.data.email === state.availableAudience[k].email) {
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }  
                }

                if (!flag) {
                    distinctUser.push({ ...action.data });
                }

                newdata = newdata.concat(distinctUser);
                
            } else {
                newdata = newdata.concat({ ...action.data })
            }
            
            return {
                ...state,
                availableAudience: state.availableAudience.concat(newdata),
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
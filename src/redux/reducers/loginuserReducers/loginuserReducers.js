import { LOGINACTIVITY } from "../../actions/actionTypes";

const initialState = {
    login : ""
}

const loginReducers = (state = initialState,action) => {
    switch (action.type) {
        case LOGINACTIVITY.LOGIN:
            window.localStorage.setItem("token",action.data)
            return {
                login : action.data
            }
        
        case LOGINACTIVITY.LOGOUT:
            return {
                login : action.data
            }
        
        default:
            return state
    }
}

export default loginReducers;
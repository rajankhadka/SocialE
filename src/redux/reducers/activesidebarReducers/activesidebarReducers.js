import { sidebarActive } from "../../actions/actionTypes";

const initialState = {
    home: true,
    template: false,
    logs: false,
    tragetInfo: false,
    userManagement : false
}

const activesidebarReducers = (state = initialState, action) => {
    switch (action.type) {
        case sidebarActive.HOME:
            return {
                home: true,
                template: false,
                logs: false,
                tragetInfo: false,
                userManagement : false  
            }
        
        case sidebarActive.TARGETINFO:
            return {
                home: false,
                template: false,
                logs: false,
                tragetInfo: true,
                userManagement : false  
            }
        
        case sidebarActive.LOGS:
            return {
                home: false,
                template: false,
                logs: true,
                tragetInfo: false,
                userManagement : false  
            }
        
        
        case sidebarActive.TEMPLATE:
            return {
                home: false,
                template: true,
                logs: false,
                tragetInfo: false,
                userManagement : false  
            }
        
        case sidebarActive.USERMANAGEMENT:
            return {
                home: false,
                template: false,
                logs: false,
                tragetInfo: false,
                userManagement : true  
            }
    
        default:
            return state;
    }
}

export default activesidebarReducers;


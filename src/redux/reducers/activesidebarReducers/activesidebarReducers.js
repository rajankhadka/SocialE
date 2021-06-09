import { sidebarActive } from "../../actions/actionTypes";

const initialState = {
    home: true,
    template: false,
    logs: false,
    tragetInfo: false,
    userManagement: false,
    setting: false,
    userProfile: false,
    targetaudiencegroup:false,
}

const activesidebarReducers = (state = initialState, action) => {
    switch (action.type) {
        case sidebarActive.HOME:
            return {
                home: true,
                template: false,
                logs: false,
                tragetInfo: false,
                userManagement: false,
                setting: false,
                userProfile: false,
                targetaudiencegroup:false,
            }
        
        case sidebarActive.TARGETINFO:
            return {
                home: false,
                template: false,
                logs: false,
                tragetInfo: true,
                userManagement: false,
                setting: false,
                userProfile: false,
                targetaudiencegroup:false,
            }
        
        case sidebarActive.TARGETAUDIENCEGROUP:
            return {
                home: false,
                template: false,
                logs: false,
                tragetInfo: false,
                userManagement: false,
                setting: false,
                userProfile: false,
                targetaudiencegroup:true,
            }
        
        case sidebarActive.LOGS:
            return {
                home: false,
                template: false,
                logs: true,
                tragetInfo: false,
                userManagement: false,
                setting: false,
                userProfile: false,
                targetaudiencegroup:false,
            }
        
        
        case sidebarActive.TEMPLATE:
            return {
                home: false,
                template: true,
                logs: false,
                tragetInfo: false,
                userManagement: false,
                setting: false,
                userProfile: false,
                targetaudiencegroup:false,
            }
        
        case sidebarActive.USERMANAGEMENT:
            return {
                home: false,
                template: false,
                logs: false,
                tragetInfo: false,
                userManagement: true,
                setting: false,
                userProfile: false,
                targetaudiencegroup:false,
            }
        
        case sidebarActive.USERPROFILE:
            return {
                home: false,
                template: false,
                logs: false,
                tragetInfo: false,
                userManagement: false,
                setting: false,
                userProfile: true,
                targetaudiencegroup:false,
            }
            
        case sidebarActive.SETTING:
            return {
                home: false,
                template: false,
                logs: false,
                tragetInfo: false,
                userManagement: false,
                setting: true,
                userProfile: false,
                targetaudiencegroup:false,
            }

    
        default:
            return state;
    }
}

export default activesidebarReducers;


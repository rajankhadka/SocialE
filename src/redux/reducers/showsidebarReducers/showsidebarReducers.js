import { sidebar } from "../../actions/actionTypes";

const initialState = {
    sidebaropen: true,
}

const showsidebarReducers = (state = initialState, action) => {
    switch (action.type) {
        
        case sidebar.CLOSESIDEBAR:
            
            return {
                sidebaropen: !state.sidebaropen
            }
    
        default:
            return state;
    }
}

export default showsidebarReducers;
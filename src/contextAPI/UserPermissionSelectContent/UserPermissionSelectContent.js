import React,{useReducer,createContext} from 'react'

const initialState = {
    selectedGroup : [],
    formDtata : {},
    userSaved: false,
}

const reducer = (state,action) =>{
    switch (action.type){

        case 'USERSAVEDOFF':
            return{
                ...state,
                userSaved:false
            }
        
        case 'USERSAVEDON':
            return{
                ...state,
                userSaved:true
            }


        //right side
        case 'ADD':
            

            return {
                ...state,
                selectedGroup:[...action.data]
            }

        case 'REMOVE':
            return {
                ...state,
                selectedGroup:[...action.data]
            }
        
        case 'ADDALL':
            return {
               ...state,
               selectedGroup:[...state.selectedGroup,...action.data]
            }

        case 'REMOVEALL':
            
            return{
                ...state,
                selectedGroup:[]
            }
            

        default:
            break;
    }
}

const UserPermissionSelectContent = createContext();

function UserPermissionSelectContentProvider(props) {

    const [createuserState,createuserdispatch] = useReducer(reducer,initialState)

    return(
        <UserPermissionSelectContent.Provider value={[createuserState,createuserdispatch]} >
            {props.children}
        </UserPermissionSelectContent.Provider>
    )
   
}

export { UserPermissionSelectContent,UserPermissionSelectContentProvider }



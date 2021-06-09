import { sidebar } from "./actionTypes";

export const opensidebar = () => {
    return {
        type: sidebar.OPENSIDEBAR
    }
}

export const closesidebar = () => {
    return {
        type: sidebar.CLOSESIDEBAR
    }
}



import { sidebarActive } from "./actionTypes";

export const homesidebar = () => {
    return {
        type: sidebarActive.HOME
    }
}

export const templatesidebar = () => {
    return {
        type: sidebarActive.TEMPLATE
    }
}

export const logssidebar = () => {
    return {
        type: sidebarActive.LOGS
    }
}

export const targetinfosidebar = () => {
    return {
        type: sidebarActive.TARGETINFO
    }
}

export const usermanagementsidebar = () => {
    return {
        type: sidebarActive.USERMANAGEMENT
    }
}
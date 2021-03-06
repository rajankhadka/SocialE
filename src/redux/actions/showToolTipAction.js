import { headerTooltip } from "./actionTypes";

export const openTooltip = () => {
    return {
        type: headerTooltip.OPENTOOLTIP
    }
}

export const closeTooltip = () => {
    return {
        type: headerTooltip.CLOSETOOLTIP
    }
}
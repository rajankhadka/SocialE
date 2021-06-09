import { TEMPLATE } from "./actionTypes";

export const setTemplate = (data) => {
    console.log("action called");
    return {
        type: TEMPLATE.SETTEMPLATE,
        data: data
    }
}


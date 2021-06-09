import { SHOWNEWTEMPLATE } from "./actionTypes";

export const shownewtemplate = (data) => {
    console.log("action data url --->", data);
    return {
        type: SHOWNEWTEMPLATE.NEWTEMPLATE,
        data: data
    }
};


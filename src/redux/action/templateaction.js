import { TEMPLATESEND } from "./actionTypes";

export const templatesendaction = (data) => {
    console.log("templatesendaction", data);
    return {
        type: TEMPLATESEND,
        data: data
    }
}
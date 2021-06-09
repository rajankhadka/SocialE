import { token } from "./actionTypes";

export const savedtoken = (data) => {
    console.log("action token saved--->",data)
    return {
        type: token.TOKEN,
        data: data
    }
}
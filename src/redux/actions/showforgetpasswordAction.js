import { modelRegister } from "./actionTypes";

export const openForgetPassword = () => {
    return {
        type: modelRegister.OPENFORGETPASSWORD
    }
}

export const closeForgetPassword = () => {
    return {
        type: modelRegister.CLOSEFORGETPASSWORD
    }
}
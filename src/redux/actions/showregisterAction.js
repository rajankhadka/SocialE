import { modelRegister } from "./actionTypes"

export const openRegister = () => {
    return {
        type: modelRegister.OPENREGISTER
    };
}

export const closeRegister = () => {
    return {
        type: modelRegister.CLOSEREGISTER
    };
}



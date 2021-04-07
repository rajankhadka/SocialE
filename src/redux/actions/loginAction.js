import { LOGINACTIVITY } from "./actionTypes";

export const login = (data) => {
    return {
        type: LOGINACTIVITY.LOGIN,
        data: data
    }
}

export const logout = () => {
    return {
        type: LOGINACTIVITY.LOGOUT
    }
}
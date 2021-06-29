import { TargetAudience } from "./actionTypes";

export const availableTargetAudience = (data) => {

    // console.log("availableTargetAudienceAction-->", data);

    return {
        type: TargetAudience.AVAILABLEAUDIENCE,
        data: data,
        
    }
}

export const clickTargetAudience = (id) => {
    return {
        type: TargetAudience.CLICKAUDIENCE,
        id: id,
    }
}

export const disableTargetAudience = (id) => {
    return {
        type: TargetAudience.DISABLEAUDIENCE,
        id: id,
    }
}

export const addnewTargetAudience = (data) => {
    return {
        type: TargetAudience.ADDNEWAUDIENCE,
        data: data,
    }
}

export const addnewGroup = (data) => {
    console.log("new group --->", data);
    return {
        type: TargetAudience.GROUPADD,
        data:data,
    }
}

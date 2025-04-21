import apiClient, { createUrl } from "./apiClient.js";


const loginUser = async(payload) =>{
    const url = createUrl('/auth/login');
    const response = apiClient.post(url, payload, {withCredentials: true});
    return response;
}

const authCheck = async(payload)=>{
    const url = createUrl('/auth/test');
    const response = apiClient.get(url, {withCredentials: true});
    return response
}

export {loginUser, authCheck}
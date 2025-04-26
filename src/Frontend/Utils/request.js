import apiClient, { createUrl } from "./apiClient.js";

/*-------------------------------- Authenticate -------------------------------------------*/ 
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

/*-------------------------------- Users -------------------------------------------*/ 
const getAllUser = async()=>{
    const url = createUrl('/users');
    const response = apiClient.get(url, {withCredentials: true});
    return response
}

const createUser = async(payload)=>{
    const url = createUrl('/users');
    const response = apiClient.post(url, payload, {withCredentials: true});
    return response
}

const saveUser = async(payload)=>{
    const url = createUrl(`/users/${payload._id}`);
    delete payload._id;
    delete payload.__v;
    const response = apiClient.put(url, payload, {withCredentials: true});
    return response
}

export {loginUser, authCheck, getAllUser, createUser, saveUser}
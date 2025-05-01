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

const logUserOut = async()=>{
    const url = createUrl('/auth/logout');
    const response = apiClient.get(url, {withCredentials: true});
    return response;
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

/*-------------------------------- Area -------------------------------------------*/ 
const getListArea = async()=>{
    const url = createUrl('/areas');
    const response = apiClient.get(url, {withCredentials: true});
    return response;
}

/*-------------------------------- Machine -------------------------------------------*/ 
const getListMachine = async()=>{
    const url = createUrl('/machines');
    const response = apiClient.get(url, {withCredentials: true});
    return response;
}

const addNewMachine = async(payload) =>{
    const url = createUrl('/machines')
    const response = apiClient.post(url, payload, {withCredentials: true})
    return response
}

export {loginUser, authCheck, logUserOut,
    getAllUser, createUser, saveUser,
    getListArea, 
    getListMachine, addNewMachine
}
import axios from "axios"

const loginUser = async(payload) =>{
    const response = await axios.post('/auth/login', payload,{withCredentials: true});
    return response;
}

export {loginUser}
import { useState } from 'react';
import '../Style/Login.css'
import LoadingSpinner from '../Component/LoadingSpinner.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaSolid from '@fortawesome/free-solid-svg-icons'
import { loginUser } from '../Utils/request.js';
import logo from'../Asset/Login/logo.png';

export default function Login(){
    const [username, setUsername] = useState('');
    const [LoadingStatus, setLoadingStatus] = useState(false)

    const handleLogin = async()=>{
        if(username !== ''){
            setLoadingStatus(true);
            const loginInput = document.getElementById("loginInput");
            loginInput.value = '';
            try{
                const response = await loginUser({username});
                if(response.status === 200){
                    localStorage.setItem("user", JSON.stringify(response.data.userObject))
                }
            }catch(err){

            }
            setUsername('');
            setLoadingStatus(false);
        }
    }

    document.addEventListener('keydown', (event) =>{
        if(event.code === 'Enter' ){
            const loginBtn = document.getElementById('loginBtn');
            if(loginBtn){
                document.activeElement.blur();
                loginBtn.click();
            }
        }
    });
    

    return(
        <div className="loginPageContainer">
            <figure>
                <img src={logo} alt='South Georgia Pecan logo' width={250}/> {/* this is set to 20% 20 max screen width (1250 px) */}
            </figure>
            <h1 className='h1 programTitle'>Middle Room QC Program</h1>
                <input id='loginInput' autoComplete='off' type='text' onChange={(e)=>{ setUsername(e.target.value.toLowerCase())}} className='loginInput' placeholder='Username' required name='username'/>
                <button id='loginBtn' className='loginBtn' type='submit' onClick={()=>{handleLogin()}} disabled={LoadingStatus  }>
                    <span>Login</span>
                    {LoadingStatus? <LoadingSpinner />: 
                    <FontAwesomeIcon icon={FaSolid.faRightToBracket}/>}
                </button>
        </div>
    )
}
import { useEffect, useState } from 'react';
import '../Style/Login.css'
import LoadingSpinner from '../Component/LoadingSpinner.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaSolid from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Utils/request.js';
import logo from'../Asset/Login/logo.png';

export default function Login(){
    const [width, setWidth] = useState(window.innerWidth);
    const [username, setUsername] = useState('');
    const [LoadingStatus, setLoadingStatus] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
      
        window.addEventListener("resize", handleResize);
    
        return () => {
        window.removeEventListener("resize", handleResize);
        };
      
      }, []);


    const handleLogin = async()=>{
        if(username !== ''){
            try{
                setLoadingStatus(true);
                const loginInput = document.getElementById("loginInput");
                loginInput.value = '';
                const response = await loginUser({username});
                setUsername('');
                setLoadingStatus(false);
                if(response.status === 200){
                    navigate('/menu');
                }
            }catch(err){    
                console.log(err.message)
            }
        }
    }
    return(
        <div className="loginPageContainer">
            <figure>
                <img src={logo} alt='South Georgia Pecan logo' width={250}/> {/* this is set to 20% 20 max screen width (1250 px) */}
            </figure>
            <h1 className='h1'>Middle Room QC Program by Richie</h1>
            {/* <form action="#" className='loginFrom'> */}
                <input id='loginInput' type='text' onChange={(e)=>{ setUsername(e.target.value)}} className='loginInput' placeholder='Username' required name='username'/>
                <button id='loginBtn' className='loginBtn' type='submit' onClick={()=>{handleLogin()}} disabled={LoadingStatus  }>
                    <span>Login</span>
                    {LoadingStatus? <LoadingSpinner />: 
                    <FontAwesomeIcon icon={FaSolid.faRightToBracket}/>}
                </button>
            {/* </form> */}
        </div>
    )
}
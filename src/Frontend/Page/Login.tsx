import { useEffect, useState } from 'react';
import '../Style/Login.css'
import LoadingSpinner from '../Component/LoadingSpinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaSolid from '@fortawesome/free-solid-svg-icons'

export default function Login(){
    const [width, setWidth] = useState(window.innerWidth);
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
      
          window.addEventListener("resize", handleResize);
      
          return () => {
            window.removeEventListener("resize", handleResize);
          };
      
      }, []);


    const handleLogin = ()=>{
        if(username !== ''){
            alert("login user: "+ username);
        }
    }
    return(
        <div className="pageContainer">
            <figure>
                <img src={require('../Asset/Login/logo.png')} alt='South Georgia Pecan logo' width={250}/> {/* this is set to 20% 20 max screen width (1250 px) */}
            </figure>
            <h1 className='h1'>Middle Room QC Program by Richie</h1>
            {/* <form action="#" className='loginFrom'> */}
                <input type='text' onChange={(e)=>{ setUsername(e.target.value)}}className='loginInput' placeholder='Username' required name='username'/>
                <button className='loginBtn' type='submit' onClick={()=>{handleLogin()}}>
                    <span>Login</span>
                    {status === 'loading'? <LoadingSpinner />: 
                    <FontAwesomeIcon icon={FaSolid.faRightToBracket}/>}
                </button>
            {/* </form> */}
        </div>
    )
}
import { useEffect, useState } from 'react';
import '../Style/Menu.css'
import { authCheck } from '../Utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Menu(){
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        const checkAuthentication = async ()=>{
            const isAuth = await authCheck();
            if(!isAuth){
                navigate('/');
                return null;
            }
            setAuthenticated(isAuth)
        }
        checkAuthentication();
    },[])
    return(
        <>
        {authenticated? <div>This is Menu Page</div>: null}
        </>
    );
}
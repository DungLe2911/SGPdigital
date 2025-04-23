import '../Style/PageNotFound.css'
import '@fontsource/arvo'; // Defaults to weight 400
import gif from '../Asset/404/404NotFound.gif';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();
    const handleClickBtn =()=>{
        navigate('/menu');
    }
    return (
        <div className='PageNotFoundContainer'>
            <h1 className='title404'> 404</h1>
            <img className='gifImage' src={gif} alt='404 Page Not Found'/>
            <h3 className='text1'>Look like you're lost</h3>
            <p className='text2'>the page you are looking for does not exist!</p>
            <div className='homeBtn' onClick={()=>{handleClickBtn()}}>Go Home</div>
        </div>
    )
}
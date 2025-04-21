import { useEffect, useState } from 'react';
import '../Style/Menu.css';
import { authCheck } from '../Utils/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { menuItem } from '../Asset/Data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Menu() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuth = await authCheck();
            if (!isAuth) {
                navigate('/');
                return;
            }
            setAuthenticated(isAuth);
        };
        checkAuthentication();
    }, [navigate]);

    return (
        <>
            {authenticated && (
                <ul className='menuPageContainer'>
                    {menuItem.map((item, index) => (
                        <Link to={item.path} key={index} className='menuItem'>
                            {/* Render icon based on type */}
                            {item.type === 'MUI' ? (
                                (() => {
                                    const Icon = item.icon;
                                    return Icon ? <Icon sx={{fontSize: '4rem'}}/> : null;
                                })()
                            ) :
                                <FontAwesomeIcon icon={item.icon} className='menuIcon'/>
                            }
                            <h2 className='h2 menuItemText'>{item.name}</h2>
                        </Link>
                    ))}
                </ul>
            )}
        </>
    );
}

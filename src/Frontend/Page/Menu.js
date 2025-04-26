import { useEffect, useState } from 'react';
import '../Style/Menu.css';

import { Link } from 'react-router-dom';
import { menuItem } from '../Asset/Data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authCheck } from '../Utils/request.js';

export default function Menu() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try{
                const response = await authCheck();
                const isAuth = response.data.isAuthenticated;
                if (!isAuth) {
                    return;
                }
                setAuthenticated(isAuth);
            }catch(error){
                console.log(error)
            }
        };
        checkAuthentication();
    }, []);

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

import '../Style/PageHeader.css'
import logo from '../Asset/logoIcon.png'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logUserOut } from '../Utils/request.js';

export default function PageHeader() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        function adjustAppMargin() {
            const contentArea = document.querySelector('.contentArea');
            const pageContent = document.querySelector('.pageContent');

            if (contentArea && pageContent) {
                const pageContentWitdh = pageContent.getBoundingClientRect().width;
                contentArea.style.width = `${pageContentWitdh}px`;
            }
        }

        // Run on load
        adjustAppMargin();
        window.addEventListener('resize', adjustAppMargin);
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
        return () => {
            window.removeEventListener('resize', adjustAppMargin);
        };
    }, []);

    const handleClickLogo = () => {
        navigate('/menu');
    }

    const handleLogOut = async() => {
        localStorage.clear();
        try{
            await logUserOut();
        }catch(err){

        }
    }
    return (
        <div className="headerContainer">
            <div className='contentArea'>
                <div className='leftSide'>
                    <figure onClick={() => { handleClickLogo() }} className='headerLogo'>
                        <img src={logo} alt='Sotuh Georgia Pecan Co. Logo' />
                    </figure>
                    <h2 className='headerText'>{`${firstName} ${lastName}`}</h2>
                </div>
                <div className="menuToggle">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <IconButton {...bindTrigger(popupState)}>
                                    <MenuIcon sx={{color: 'white', fontSize:'3rem'}}/>
                                </IconButton>

                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </div>
            </div>
        </div>
    );
}
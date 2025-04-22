import '../Style/PageHeader.css'
import logo from '../Asset/logoIcon.png'
import { useEffect, useState } from 'react';

export default function PageHeader() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
        setFirstName(user.firstName);
        setLastName(user.lastName);
        return () => {
            window.removeEventListener('resize', adjustAppMargin);
        };
    }, []);


    return (
        <div className="headerContainer">
            <div className='contentArea'>
                <div className='leftSide'>
                    <figure className='headerLogo'>
                        <img src={logo} alt='Sotuh Georgia Pecan Co. Logo' />
                    </figure>
                    <h2 className='headerText'>{`Welcome! ${firstName} ${lastName}`}</h2>
                </div>
                <div className="menuToggle">
                    <input type="checkbox" id="menu-toggle" />
                    <label htmlFor="menu-toggle" className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
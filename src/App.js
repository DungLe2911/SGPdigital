import React, { useEffect, useState } from 'react';
import './Frontend/Style/App.css';
import {Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './Frontend/Page/Login.js';
import Menu from './Frontend/Page/Menu.js';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { setupApiClient } from './Frontend/Utils/apiClient.js';
import PageHeader from './Frontend/Component/PageHeader.js';
import PageNotFound from './Frontend/Page/NotFound.js';

function App() {
    const navigate = useNavigate();
    const [displayHeader, setDisplayHeader] = useState(false);
    const location = useLocation();
    useEffect(() => {
      setupApiClient({ navigate, toast });
      const allowHeader = ['/menu', '/qc', '/manage', '/report' , '/lookup'];
      if(allowHeader.includes(location.pathname) ){
        setDisplayHeader(true);
      }else{
        setDisplayHeader(false);
      }
    }, [navigate, location]);

    useEffect(()=>{
      async function adjustAppMargin() {
        await new Promise(resolve => setTimeout(resolve, 50));
        const app = document.querySelector('.App');
        const header = document.querySelector('.headerContainer');
        if (app && header) {
          const headerHeight = header.getBoundingClientRect().height + 10;
          app.style.marginTop = `${headerHeight}px`;
        }
      }
      adjustAppMargin();
      window.addEventListener('resize', adjustAppMargin);
      return () => {
        window.removeEventListener('resize', adjustAppMargin);
      };
    },[])

    
  return (
    <div className='App'>
      {displayHeader? <PageHeader /> : <></>}
      <ToastContainer className='toastNotification' position='top-right' autoClose={3000} hideProgressBar ={false} theme='light' transition={Bounce} pauseOnHover={false}/>
      <div className='pageContent'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/menu' element={<Menu />}/>
          <Route path='*' element={<PageNotFound />}/>
          {/* <Route />
          <Route /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

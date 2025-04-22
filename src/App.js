import React, { useEffect, useState } from 'react';
import './Frontend/Style/App.css';
import {Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './Frontend/Page/Login.js';
import Menu from './Frontend/Page/Menu.js';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { setupApiClient } from './Frontend/Utils/apiClient.js';
import PageHeader from './Frontend/Component/PageHeader.js';

function App() {
    const navigate = useNavigate();
    const [displayHeader, setDisplayHeader] = useState(false);
    const location = useLocation();
    useEffect(() => {
      setupApiClient({ navigate, toast });
      if(location.pathname !== '/'){
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
        console.log(app)
        console.log(header)
        if (app && header) {
          console.log("wedfwqefwef")
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
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar ={false} theme='light' transition={Bounce} pauseOnHover={false}/>
      <div className='pageContent'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/menu' element={<Menu />}/>
          {/* <Route />
          <Route />
          <Route /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

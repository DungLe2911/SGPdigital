import React, { useEffect } from 'react';
import './Frontend/Style/App.css';
import {Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Frontend/Page/Login.js';
import Menu from './Frontend/Page/Menu.js';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { setupApiClient } from './Frontend/Utils/apiClient.js';

function App() {
    const navigate = useNavigate();

    useEffect(() => {
      setupApiClient({ navigate, toast });
    }, [navigate]);


  return (
    <div className='App'>
      <div className='pageContent'>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar ={false} theme='light' transition={Bounce}/>
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

import React, { useEffect, useState } from 'react';
import './Frontend/Style/App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './Frontend/Page/Login.js';
import Menu from './Frontend/Page/Menu.js';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { setupApiClient } from './Frontend/Utils/apiClient.js';
import PageHeader from './Frontend/Component/PageHeader.js';
import PageNotFound from './Frontend/Page/NotFound.js';
import Manage from './Frontend/Page/Manage.js';

function App() {
  const navigate = useNavigate();
  const [displayHeader, setDisplayHeader] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setupApiClient({ navigate, toast });
    const allowHeader = ['/menu', '/qc', '/manage', '/report', '/lookup'];
    if (allowHeader.includes(location.pathname)) {
      setDisplayHeader(true);
    } else {
      setDisplayHeader(false);
    }
  }, [navigate, location]);

  return (
    <div>
      {displayHeader ? <PageHeader /> : <></>}
      <div className='App'>
        <ToastContainer className='toastNotification' position='top-right' autoClose={3000} hideProgressBar={false} theme='light' transition={Bounce} pauseOnHover={false} />
        <div className='pageContent'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/manage' element={<Manage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

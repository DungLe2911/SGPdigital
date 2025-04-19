import React from 'react';
import './Frontend/Style/App.css';
import {Route, Routes } from 'react-router-dom';
import Login from './Frontend/Page/Login';
import Menu from './Frontend/Page/Menu';

function App() {
  return (
    <div className='App'>
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

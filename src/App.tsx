import React from 'react';
import './Frontend/Style/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Frontend/Page/Login';

function App() {
  return (
    <div className='App'>
      <div className='pageContent'>
        <Routes>
          <Route path='/' element={<Login />}/>
          {/* <Route path='/menu' element={<Menu />}/> */}
          {/* <Route />
          <Route />
          <Route /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

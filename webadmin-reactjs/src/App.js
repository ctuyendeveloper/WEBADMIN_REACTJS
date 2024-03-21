import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, 
  Routes, Navigate, Outlet } from 'react-router-dom'
import React, { useState } from 'react';


import Admin from './component/user/trangchu'
import Login from './component/LoginSignup/Login'
import ThongKe from './component/thongke/Thongke'

function App() {
  return (
  
      <Router>
        <Routes>
       <Route path='/Admin' element={<Admin/>}/>
       <Route path='/Login' element={<Login/>}/>
       <Route path='/ThongKe' element={<ThongKe/>}/>
        </Routes>
      </Router>
  
  );
}


export default App;

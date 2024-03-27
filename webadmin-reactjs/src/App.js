import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, 
  Routes, Navigate, Outlet } from 'react-router-dom'
import React, { useState } from 'react';

import Login from './admin/Login'
import Main from './product/main'
import ListProduct from './product/listproduct2'

function App() {

  // doc thong tin user tu localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    if (userString)
    {
      return JSON.parse(userString);
    }
    return null;
  }

  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo)
    {
      localStorage.removeItem('user');
      setUser(null);
      return;
    }
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  const [user, setUser] = useState(getUserFromLocalStorage);

  // Những componet phải đăng nhập mới truy cập được
  const ProtectedRoute = () => {
    if(user)
    {
      return <Outlet/>
    }
    return <Navigate to="/login"/>
  }

  // Những componet không đăng nhập truy cập được
  
  const PubliceRoute = () => {
    if(user)
    {
    return <Navigate to="/"/>
    }
    return <Outlet/>
  }

  return (
    <div className="container">
      <Router>
        <Routes>
        {/* <Route path="/reset-password" element={<ResetPassword/>} /> */}
          <Route element={<PubliceRoute/>}>
            <Route path="/login" element={<Login saveUser={saveUserToLocalStorage}/>} />
          </Route>
          
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Main user={user}/>} />
            <Route path="/list-product" element={<ListProduct user={user}/>} />
            {/* <Route path="/addtp" element={<Addtp user={user}/>} />
            <Route path="/edittp/:id" element={<Edittp user={user}/>} />
            <Route path="/add" element={<Add user={user}/>} />
            <Route path="/edit/:id" element={<Edit user={user}/>} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

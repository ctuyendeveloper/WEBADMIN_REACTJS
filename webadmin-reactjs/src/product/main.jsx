import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import Logo from '../image/logo.png'
import Profile from '../admin/profiledialog'

const ProductList = (props) => {

    const [userData, setUserData] = useState(props); // State để lưu thông tin người dùng

    const [showProfileDialog, setProfileDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [showOverlay, setShowOverlay] = useState(false); // State để điều khiển hiển thị overlay

    const openProfileDialog = () => {
        setProfileDialog(true);
        setShowOverlay(true);
    };

    const closeProfileDialog = () => {
        setProfileDialog(false);
        setShowOverlay(false);
    };

    return (
        <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150}/></a>
                <a className='profile' onClick={openProfileDialog}><p>{userData.user.ADMIN_PHONE}</p></a>
                <div className={`overlay ${showOverlay ? 'show-overlay' : ''}`}></div> {/* Overlay */}
                {showProfileDialog && <Profile userData={userData} onClose={closeProfileDialog} />}
            </div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" style={{color: '#fff'}}>Tổng quan</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/list-product" className="nav-link" style={{color: '#fff'}}>Sản phẩm</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-bill" className="nav-link" style={{color: '#fff'}}>Hóa Đơn</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-customer" className="nav-link">Khách Hàng</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/baocao" className="nav-link">Báo cáo</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProductList;
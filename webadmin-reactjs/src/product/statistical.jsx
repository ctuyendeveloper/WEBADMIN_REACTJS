import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import './css/ProductList.css'; // Import CSS file for styling
import './css/statistical.css'; // importy css 
import Logo from '../image/logo.png'
import Profile from '../admin/profiledialog'
import AxiosInstance from '../helper/AxiosInstance';

const Statistical = () => {
    const [totals, setTotals] = useState({
        total_products: 0,
        total_customers: 0,
        total_bills: 0
    });
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
    // dùng useeffect để thực thi 


    useEffect(() => {

        //dùng fecth gọi api 
        fetch('http://127.0.0.1:8686/statistical.php')
            .then(response => {
                // set điều kiện 
                if (!response.ok) {
                    // hiện dòng báo lỗi
                    throw new Error('kết nối tới sever thất bại ');
                }
                // thành công  gữi đọc json
                return response.json();
            })
            // tính sum cái id của các thành phần được lấy ra 
            .then(data => {
                // // xử lý 
                // let sumUser = 0;
                // let sumProduct = 0;
                // let sumBill = 0 ;
                // data.forEach(item => {
                //     sumUser += item.PRODUCT_ID;
                //     sumProduct += item.CUSTOMER_ID;
                //     sumBill += item.BILL_ID;    
                // });
                // setTotalId_userSum(sumUser);
                // setTotalId_productSum(sumProduct);
                // setTotalId_billSum(sumBill);
                setTotals({
                    total_products: data.total_products,
                    total_customers: data.total_customers,
                    total_bills: data.total_bills
                });
            })
            .catch(error => {
                console.error('lỗi: ', error);
            });


    }
        // khởi load lại dữ liệu khi có thay đổi 
        , []
    );

    return (
        <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150} /></a>
                <a className='profile' onClick={openProfileDialog}><p>373982102</p></a>
                <div className={`overlay ${showOverlay ? 'show-overlay' : ''}`}></div> {/* Overlay */}
                {showProfileDialog && <Profile onClose={closeProfileDialog} />}
            </div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" style={{ color: '#fff' }}>Tổng quan</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-product" className="nav-link" style={{ color: '#fff' }}>Sản phẩm</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-bill" className="nav-link" style={{ color: '#fff' }}>Hóa Đơn</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-khachhang" className="nav-link">Khách Hàng</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/baocao" className="nav-link">Báo cáo</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="body">
                <div className="card_Main">
                    <div className='card'><p>Total products: {totals.total_products}</p></div>
                    <div className='card'><p>Total customers: {totals.total_customers}</p></div>
                    <div className='card'><p>Total bills: {totals.total_bills}</p></div>
                </div>

            </div>
        </div>
    );
};

export default Statistical;
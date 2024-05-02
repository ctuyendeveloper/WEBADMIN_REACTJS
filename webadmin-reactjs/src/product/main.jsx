import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import Logo from '../image/logo.png'
import Profile from '../admin/profiledialog'

const ProductList = (props) => {

    const [userData, setUserData] = useState(props); // State để lưu thông tin người dùng

    const [showProfileDialog, setProfileDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [customer, setCustomer] = useState([]); // State để lưu trữ dữ liệu sản phẩm
    const [product, setProduct] = useState([]); // State để lưu trữ dữ liệu sản phẩm
    const [doanhthuthang, setdoanhthuthang] = useState(); // State để lưu trữ dữ liệu sản phẩm
    const [showOverlay, setShowOverlay] = useState(false); // State để điều khiển hiển thị overlay
    const [showSubMenu, setShowSubMenu] = useState(false); // State để điều khiển hiển thị submenu loại sản phẩm

    const openProfileDialog = () => {
        setProfileDialog(true);
        setShowOverlay(true);
    };

    const closeProfileDialog = () => {
        setProfileDialog(false);
        setShowOverlay(false);
    };
    const handleMouseEnter = () => {
        setShowSubMenu(true);
    };

    const handleMouseLeave = () => {
        setShowSubMenu(false);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API để lấy dữ liệu sản phẩm
                const response = await AxiosInstance().get('getlistcustomer5.php')
                setCustomer(response); // Cập nhật state với dữ liệu sản phẩm từ API
                const response2 = await AxiosInstance().get('testproduct5.php')
                console.log(response2)
                setProduct(response2); // Cập nhật state với dữ liệu sản phẩm từ API
                const response3 = await AxiosInstance().get('testapimonth.php')
                setdoanhthuthang(response3.monthly_revenue); // Cập nhật state với dữ liệu sản phẩm từ API
                // console.log('TEST user', user)
                console.log(response)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Gọi hàm fetchProducts khi component được mount
        fetchProducts();
    }, []);

    // Phần hiển thị doanh thu hàng tháng
    const renderMonthlyRevenue = () => {
        return (
            <div className="monthly-revenue">
                <h2>Doanh thu trong tháng</h2>
                <h2>{doanhthuthang}$</h2>
            </div>
        );
    };

    // Phần hiển thị danh sách người mua hàng nhiều
    const renderTopBuyers = () => {
        return (
            <div>
                <h2>Danh sách người mua hàng nhiều</h2>
                <div className="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>Số tiền đã mua</th>
                            </tr>
                        </thead>
                        {customer.length === 0 ? (
                            <p>Không có sản phẩm nào được tìm thấy.</p>
                        ) : (
                            <tbody>
                                {customer.map(product => (
                                    <tr key={product.customer_id} className="product-item">
                                        <td>{product.customer_name}</td>
                                        <td>{product.customer_phone}</td>
                                        <td>{product.customer_totalprice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        );
    };

    // Phần hiển thị danh sách top 5 sản phẩm bán chạy
    const renderTopSellingProducts = () => {
        return (
            <div>
                <h2>Top 5 sản phẩm bán chạy</h2>
                <div className="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng đã bán</th>
                            </tr>
                        </thead>
                        {product.length === 0 ? (
                            <p>Không có sản phẩm nào được tìm thấy.</p>
                        ) : (
                            <tbody>
                                {product.map(product => (
                                    <tr key={product.PRODUCT_ID} className="product-item">
                                        <td>{product.PRODUCT_ID}</td>
                                        <td>{product.PRODUCT_NAME}</td>
                                        <td>{product.total_quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150} /></a>
                <a className='profile' onClick={openProfileDialog}><p>0{userData.user.ADMIN_PHONE}</p></a>
                <div className={`overlay ${showOverlay ? 'show-overlay' : ''}`}></div> {/* Overlay */}
                {showProfileDialog && <Profile userData={userData} onClose={closeProfileDialog} />}
            </div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" style={{ color: '#fff' }}>Tổng quan</NavLink>
                    </li>
                    <li className="nav-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <NavLink to="/list-product" className="nav-link" style={{ color: '#fff' }}>Sản phẩm</NavLink>
                        {showSubMenu && (
                            <ul className="submenu">
                                <NavLink to="/list-productcategory">Loại sản phẩm</NavLink>
                                {/* Add more product types as needed */}
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-bill" className="nav-link" style={{ color: '#fff' }}>Hóa Đơn</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-customer" className="nav-link">Khách Hàng</NavLink>
                    </li>
                </ul>
            </nav>
            {renderMonthlyRevenue()}
            <div className="bottom-section">
                {renderTopBuyers()}
                {renderTopSellingProducts()}
            </div>
        </div>
    );
};

export default ProductList;
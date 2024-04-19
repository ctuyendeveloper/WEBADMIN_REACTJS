import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import Logo from '../image/logo.png'
import AxiosInstance from '../helper/AxiosInstance';
import Profile from '../admin/profiledialog'
import DetailCustomerDialog from './detailcustomer';


const ProductList = (props) => {

    const [userData, setUserData] = useState(props); // State để lưu thông tin người dùng

    const [customers, setcustomers] = useState([]); // State để lưu trữ dữ liệu sản phẩm
    const [showProfileDialog, setProfileDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu trữ từ khóa tìm kiếm
    const [showOverlay, setShowOverlay] = useState(false); // State để điều khiển hiển thị overlay
    const [selectedCustomer, setSelectedCustomer] = useState(null); // State để lưu trữ sản phẩm được chọn

    const openProfileDialog = () => {
        setProfileDialog(true);
        setShowOverlay(true);
    };

    const closeProfileDialog = () => {
        setProfileDialog(false);
        setShowOverlay(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = customers.filter(customers =>
        customers.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleProductClick = (customers) => {
        openDetailProductDialog(customers, true); // Truyền true để ở chế độ chỉnh sửa
    };
    const openDetailProductDialog = (customers) => { // Thêm chế độ chỉnh sửa vào hàm này
        setSelectedCustomer(customers);
        setShowOverlay(true);
    };
    const closeDetailProductDialog = () => {
        setSelectedCustomer(null);
        setShowOverlay(false);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API để lấy dữ liệu sản phẩm
                const response = await AxiosInstance().get('getlistcustomer.php')
                setcustomers(response); // Cập nhật state với dữ liệu sản phẩm từ API
                console.log(response)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        // Gọi hàm fetchProducts khi component được mount
        fetchProducts();
    }, []);



    return (
        <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150} /></a>
                <a className='profile' onClick={openProfileDialog}><p>{userData.user.ADMIN_PHONE}</p></a>
                {showProfileDialog && <Profile userData={userData} onClose={closeProfileDialog} />}
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
                        <NavLink to="/list-customer" style={{ color: '#fff' }} className="nav-link">Khách Hàng</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/baocao" style={{ color: '#fff' }} className="nav-link">Báo cáo</NavLink>
                    </li>
                </ul>
            </nav>
            <div className='sanphamchucnang'>
                <h2>Danh sách khách hàng</h2>
                <div className="search-bar">
                    <div className={`overlay ${showOverlay ? 'show-overlay' : ''}`}></div> {/* Overlay */}
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>Mã khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Tổng tiền đã mua</th>
                        </tr>
                    </thead>
                    {filteredProducts.length === 0 ? (
                        <p>Không tìm thấy khách hàng.</p>
                    ) : (
                        <tbody>
                            {filteredProducts.map(customers => (
                                <tr key={customers.customer_id} className="product-item" onClick={() => handleProductClick(customers)}>
                                    <td>{customers.customer_id}</td>
                                    <td>{customers.customer_name}</td>
                                    <td>{customers.customer_phone}</td>
                                    <td>{customers.customer_totalprice}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            {selectedCustomer && <DetailCustomerDialog product={selectedCustomer} onClose={closeDetailProductDialog}/>}
        </div>
    );
};

export default ProductList;
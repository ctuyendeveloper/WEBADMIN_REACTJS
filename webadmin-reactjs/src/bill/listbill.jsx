import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import './css/ProductList.css'; // Import CSS file for styling
// import './css/addproduct.css'; // Import CSS file for styling
import Logo from '../image/logo.png'
// import AddProductDialog from './addproduct'; // Import component dialog thêm mới sản phẩm
import Profile from '../admin/profiledialog'
import DetailCPN from './detail';

const BillList = () => {

    const [products, setProducts] = useState([]); // State để lưu trữ dữ liệu sản phẩm
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu trữ từ khóa tìm kiếm
    const [showAddProductDialog, setShowAddProductDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [showOverlay, setShowOverlay] = useState(false); // State để điều khiển hiển thị overlay
    const [selectedProduct, setSelectedProduct] = useState(null); // State để lưu trữ sản phẩm được chọn
    const [editMode, setEditMode] = useState(false); // Thêm state cho chế độ chỉnh sửa
    const [showProfileDialog, setProfileDialog] = useState(false); // State để điều khiển hiển thị dialog

    const openProfileDialog = () => {
        setProfileDialog(true);
        setShowOverlay(true);
    };

    const closeProfileDialog = () => {
        setProfileDialog(false);
        setShowOverlay(false);
    };





    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API để lấy dữ liệu sản phẩm
                const response = await AxiosInstance().get('getlistbill.php')
                setProducts(response); // Cập nhật state với dữ liệu sản phẩm từ API
                console.log(response)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Gọi hàm fetchProducts khi component được mount
        fetchProducts();
    }, []);

    // Hàm xử lý thay đổi từ khóa tìm kiếm
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter(product =>
        product.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAddProductDialog = () => {
        setShowAddProductDialog(true);
        setShowOverlay(true);
    };

    const closeAddProductDialog = () => {
        setShowAddProductDialog(false);
        setShowOverlay(false);
    };

    const openDetailProductDialog = (product, editMode = false) => { // Thêm chế độ chỉnh sửa vào hàm này
        setSelectedProduct(product);
        setEditMode(editMode); // Cập nhật chế độ chỉnh sửa
        setShowOverlay(true);
    };

    const closeDetailProductDialog = () => {
        setSelectedProduct(null);
        setEditMode(false); // Đặt lại chế độ chỉnh sửa khi đóng dialog
        setShowOverlay(false);
    };

    const handleProductClick = (product) => {
        openDetailProductDialog(product, true); // Truyền true để ở chế độ chỉnh sửa
    };


    return (
        <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150} /></a>
                <a className='profile' onClick={openProfileDialog}><p>373982102</p></a>
                {showProfileDialog && <Profile onClose={closeProfileDialog} />}
            </div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Tổng quan</NavLink>
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
            <div className='sanphamchucnang'>
                <h2>Danh sách hóa đơn</h2>
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
                            <th>Mã hóa đơn</th>
                            <th>Thời gian (tạo)</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái thanh toán</th>
                        </tr>
                    </thead>
                    {filteredProducts.length === 0 ? (
                        <p>Không có hóa đơn nào được tìm thấy.</p>
                    ) : (
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
                                    <td>{product.bill_id}</td>
                                    <td>{product.bill_createdat}</td>
                                    <td>{product.customer_name}</td>
                                    <td>{product.orderdetail_price}</td>
                                    <td>{product.bill_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            {selectedProduct && <DetailCPN product={selectedProduct} onClose={closeDetailProductDialog} editMode={editMode} />}
        </div>
    );
};

export default BillList;
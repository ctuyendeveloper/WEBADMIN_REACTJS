import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import './css/ProductList.css'; // Import CSS file for styling
import Logo from '../image/logo.png'
import AddProductDialog from './addproductcategory'; // Import component dialog thêm mới sản phẩm
import DetailProductDialog from './detailproductcategory';
import Profile from '../admin/profiledialog'

const ProductList = (props) => {

    const [userData, setUserData] = useState(props); // State để lưu thông tin người dùng

    const [products, setProducts] = useState([]); // State để lưu trữ dữ liệu sản phẩm
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu trữ từ khóa tìm kiếm
    const [showAddProductDialog, setShowAddProductDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [showOverlay, setShowOverlay] = useState(false); // State để điều khiển hiển thị overlay
    const [selectedProduct, setSelectedProduct] = useState(null); // State để lưu trữ sản phẩm được chọn
    const [editMode, setEditMode] = useState(false); // Thêm state cho chế độ chỉnh sửa
    const [showProfileDialog, setProfileDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [showSubMenu, setShowSubMenu] = useState(false); // State để điều khiển hiển thị submenu loại sản phẩm

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
                const response = await AxiosInstance().get('getlistproductcategory.php')
                setProducts(response); // Cập nhật state với dữ liệu sản phẩm từ API
                // console.log('TEST user', user)
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
        product.PRODUCTCATEGORY_NAME.toLowerCase().includes(searchTerm.toLowerCase())
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
    const handleMouseEnter = () => {
        setShowSubMenu(true);
    };

    const handleMouseLeave = () => {
        setShowSubMenu(false);
    };


    return (
       <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150} /></a>
                <a className='profile' onClick={openProfileDialog}><p>{userData.user.ADMIN_PHONE}</p></a>
                {/* <div className={`overlay ${showOverlay ? 'show-overlay' : ''}`}></div> Overlay */}
                {showProfileDialog && <Profile userData={userData} onClose={closeProfileDialog}/>}
            </div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Tổng quan</NavLink>
                    </li>
                    <li className="nav-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <NavLink to="/list-product" className="nav-link" style={{color: '#fff'}}>Sản phẩm</NavLink>
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
            <div className='sanphamchucnang'>
                <h2>Loại Sản Phẩm</h2>
                <div className="search-bar">
                    <button className="add-button" onClick={openAddProductDialog}>Thêm mới sản phẩm</button>
                    <div className={`overlay ${showOverlay ? 'show-overlay' : ''}`}></div> {/* Overlay */}
                    {showAddProductDialog && <AddProductDialog onClose={closeAddProductDialog} />}
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
                            <th>Mã loại sản phẩm</th>
                            <th>Tên loại sản phẩm</th>
                            <th>Nội dung loại sản phẩm</th>
                        </tr>
                    </thead>
                    {filteredProducts.length === 0 ? (
                        <p>Không có loại sản phẩm nào được tìm thấy.</p>
                    ) : (
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.PRODUCTCATEGORY_ID} className="product-item" onClick={() => handleProductClick(product)}>
                                    <td>{product.PRODUCTCATEGORY_ID}</td>
                                    <td>{product.PRODUCTCATEGORY_NAME}</td>
                                    <td>{product.PRODUCTCATEGORY_DESCRIBE}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            {selectedProduct && <DetailProductDialog product={selectedProduct} onClose={closeDetailProductDialog} editMode={editMode} />}
        </div>
    );
};

export default ProductList;
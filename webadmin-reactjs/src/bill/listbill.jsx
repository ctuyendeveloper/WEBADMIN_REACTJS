import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import './css/ProductList.css'; // Import CSS file for styling
// import './css/addproduct.css'; // Import CSS file for styling
import Logo from '../image/logo.png'
// import AddProductDialog from './addproduct'; // Import component dialog thêm mới sản phẩm
import Profile from '../admin/profiledialog'
import DetailCPN from './detail';


const BillList = (props) => {
    const [userData, setUserData] = useState(props); // State để lưu thông tin người dùng


    const [products, setProducts] = useState([]); // State để lưu trữ dữ liệu sản phẩm
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu trữ từ khóa tìm kiếm
    const [showAddProductDialog, setShowAddProductDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [showOverlay, setShowOverlay] = useState(false); // State để điều khiển hiển thị overlay
    const [selectedProduct, setSelectedProduct] = useState(null); // State để lưu trữ sản phẩm được chọn
    const [editMode, setEditMode] = useState(false); // Thêm state cho chế độ chỉnh sửa
    const [showProfileDialog, setProfileDialog] = useState(false); // State để điều khiển hiển thị dialog
    const [showSubMenu, setShowSubMenu] = useState(false); // State để điều khiển hiển thị submenu loại sản phẩm
    const [filterStatus, setFilterStatus] = useState(0); // State để lưu trữ giá trị của trạng thái lọc

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

    const mapStatusToString = (status) => {
        switch (status) {
            case 1:
                return "Pending approval";
            case 2:
                return "Shipping";
            case 3:
                return "Delivered";
            default:
                return "Unknown";
        }
    };



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API để lấy dữ liệu sản phẩm
                const response = await AxiosInstance().get('getlistbill.php')
                setProducts(response.data); // Cập nhật state với dữ liệu sản phẩm từ API
                console.log(response.data)
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
    const filteredProducts = products.filter((product) => {
        // Lọc theo trạng thái đơn hàng
        const statusCondition = filterStatus === 0 || product.BILL_STATUS === filterStatus;

        // Tìm kiếm theo tên khách hàng
        const searchCondition = product.CUSTOMER_NAME.toLowerCase().includes(searchTerm.toLowerCase());

        // Trả về true nếu cả hai điều kiện đều đúng
        return statusCondition && searchCondition;
    });


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

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    const handleProductClick = (product) => {
        openDetailProductDialog(product, true); // Truyền true để ở chế độ chỉnh sửa
    };


    return (
        <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150} /></a>
                <a className='profile' onClick={openProfileDialog}><p>0{userData.user.ADMIN_PHONE}</p></a>
                {showProfileDialog && <Profile userData={userData} onClose={closeProfileDialog} />}
            </div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Tổng quan</NavLink>
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
            <div className='sanphamchucnang'>
                <h2>Danh sách hóa đơn</h2>
                <div className="search-bar">
                    <div className={`overlay ${showOverlay ? 'show-overlay' : ''}`}></div> {/* Overlay */}
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Tìm kiếm tên khách hàng..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(parseInt(e.target.value))}>
                    <option value={0}>All</option>
                    <option value={1}>Pending approval</option>
                    <option value={2}>Shipping</option>
                    <option value={3}>Delivered</option>
                </select>

            </div>
            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>Mã hóa đơn</th>
                            <th>Thời gian (tạo)</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái đơn hàng</th>
                        </tr>
                    </thead>
                    {filteredProducts.length === 0 ? (
                        <p>Không có hóa đơn nào được tìm thấy.</p>
                    ) : (
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.BILL_ID} className="product-item" onClick={() => handleProductClick(product)}>
                                    <td>{product.BILL_ID}</td>
                                    <td>{product.BILL_CREATEDAT}</td>
                                    <td>{product.CUSTOMER_NAME}</td>
                                    <td>{product.totalPrice}</td>
                                    <td>{mapStatusToString(product.BILL_STATUS)}</td>
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
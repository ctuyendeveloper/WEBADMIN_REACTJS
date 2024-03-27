import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các tab chuyển hướng
import './css/ProductList.css'; // Import CSS file for styling
import Logo from '../image/logo.png'

const ProductList = () => {
    const [products, setProducts] = useState([]); // State để lưu trữ dữ liệu sản phẩm
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu trữ từ khóa tìm kiếm



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API để lấy dữ liệu sản phẩm
                const response = await AxiosInstance().get('/get-listproduct.php');
                setProducts(response); // Cập nhật state với dữ liệu sản phẩm từ API
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
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="full">
            <div className="top">
                <a href="/"><img src={Logo} alt="Mô tả của ảnh" height={80} width={150} /></a>
                <a href="/profile" className='profile'><p>373982102</p></a>
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
                        <NavLink to="/list-hoadon" className="nav-link" style={{ color: '#fff' }}>Hóa Đơn</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/list-khachhang" className="nav-link">Khách Hàng</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/baocao" className="nav-link">Báo cáo</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="product-list">
                <h2>Sản Phẩm</h2>

                <div className="search-bar">
                    <button className="add-button">Thêm mới sản phẩm</button>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Loại sản phẩm</th>
                            <th>Giá sản phẩm</th>
                            <th>Giá sản phẩm (khuyến mãi)</th>
                            <th></th>
                        </tr>
                    </thead>
                    {filteredProducts.length === 0 ? (
                        <p>Không có sản phẩm nào được tìm thấy.</p>
                    ) : (
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="product-item">
                                    <td>{product.product_id}</td>
                                    <td>{product.product_name}</td>
                                    <td>{product.productcategory_name}</td>
                                    <td>{product.product_price}</td>
                                    <td>{product.product_promotionprice}</td>
                                    <td><button className="btn btn-danger">Xóa</button></td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default ProductList;
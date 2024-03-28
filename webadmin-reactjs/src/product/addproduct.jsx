import React, { useState } from 'react';
import './css/addproduct.css'; // Import CSS file for styling

const AddProductDialog = ({ onClose }) => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productPromotionPrice, setProductPromotionPrice] = useState('');

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductCategoryChange = (e) => {
        setProductCategory(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleProductPromotionPriceChange = (e) => {
        setProductPromotionPrice(e.target.value);
    };

    const handleAddProduct = () => {
        // Thực hiện logic để thêm sản phẩm mới, có thể gọi API tại đây
        // Sau khi thêm xong, đóng dialog
        onClose();
    };

    return (
        <div className="add-product-dialog">
            <h3>Thêm mới sản phẩm</h3>
            <label htmlFor="product-name">Tên sản phẩm:</label>
            <input type="text" id="product-name" value={productName} onChange={handleProductNameChange} />
            <label htmlFor="product-category">Loại sản phẩm:</label>
            <input type="text" id="product-category" value={productCategory} onChange={handleProductCategoryChange} />
            <label htmlFor="product-price">Giá sản phẩm:</label>
            <input type="text" id="product-price" value={productPrice} onChange={handleProductPriceChange} />
            <label htmlFor="product-promotion-price">Giá sản phẩm (khuyến mãi):</label>
            <input type="text" id="product-promotion-price" value={productPromotionPrice} onChange={handleProductPromotionPriceChange} />
            <button onClick={handleAddProduct}>Thêm</button>
            <button onClick={onClose}>Hủy</button>
        </div>
    );
};

export default AddProductDialog;
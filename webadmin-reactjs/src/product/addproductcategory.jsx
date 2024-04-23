import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import './css/addproduct.css'; // Import CSS file for styling

const AddProductDialog = ({ onClose }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [intervalId, setIntervalId] = useState(null);
    const [productPromotionPrice, setProductPromotionPrice] = useState('');
    const [productdescribe, setProductdescribe] = useState('');
    const [productcategory, setproductcategory] = useState([]);
    const [productcategory2, setproductcategory2] = useState(1);
    const [previewImages, setPreviewImages] = useState([]);



    const handleAddProduct = async () => {
        try {
            if (!productName || !productPrice) {
                // Nếu một trong hai trường dữ liệu bị bỏ trống, hiển thị cảnh báo và ngăn không cho gửi yêu cầu
                alert('Vui lòng nhập đầy đủ thông tin sản phẩm.');
                return;
            }
    
            const formData = new FormData();
            formData.append('categoryName', productName);
            formData.append('categoryDescribe', productPrice);
            
            const response = await AxiosInstance().post(`/addproductcategory.php`, formData);
            if (response.status) {
                alert(response.message);
                onClose();
                window.location.href = '/list-productcategory';
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="add-product-dialog">
            <h3>Thêm mới sản phẩm</h3>
            <label htmlFor="product-name">Tên loại sản phẩm:</label>
            <input type="text" id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <label htmlFor="product-price">Mô tả về loại sản phẩm: </label>
            <textarea
            id="product-price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            style={{
                width: '300px', // Thiết lập chiều rộng
                height: '80px', // Thiết lập chiều cao
                fontSize: '16px', // Thiết lập kích thước font chữ
                resize: 'none', // Không cho phép thay đổi kích thước của textarea
                // Các thuộc tính CSS khác nếu cần thiết
            }}
        />
            <br />
            <button onClick={handleAddProduct}>Thêm</button>
            <button onClick={onClose}>Hủy</button>
        </div>
    );
};

export default AddProductDialog;

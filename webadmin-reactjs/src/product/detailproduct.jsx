import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import './css/detailproduct.css'; // Import CSS file for styling

const DetailProductDialog = ({ product, onClose, editMode }) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const [intervalId, setIntervalId] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    // Mảng chứa các URL hình ảnh
    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                // Gọi API để lấy danh sách các URL hình ảnh
                const response = await AxiosInstance().get(`/getimage.php?id=${editedProduct.product_id}`); // Thay thế '/get-image-urls' bằng endpoint thích hợp của bạn
                console.log(response)
                setImageUrls(response); // Cập nhật state với danh sách các URL hình ảnh từ API
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        // Gọi hàm fetchImageUrls khi component được mount
        fetchImageUrls();
    }, [editedProduct.product_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện các hành động cập nhật thông tin sản phẩm ở đây
        // Ví dụ: Gửi request API để cập nhật thông tin sản phẩm
        console.log("Thông tin sản phẩm đã được cập nhật:", editedProduct);
        onClose(); // Đóng dialog sau khi cập nhật thành công
    };

    const handleImageMouseDown = () => {
        clearInterval(intervalId); // Dừng lướt tự động nếu đang chạy
        const id = setInterval(() => {
            // Lướt đến hình ảnh tiếp theo
            const imageContainer = document.querySelector('.image-slider');
            if (imageContainer) {
                imageContainer.scrollLeft += 5; // Điều chỉnh tốc độ lướt ở đây
            }
        }, 10); // Điều chỉnh tốc độ lướt ở đây
        setIntervalId(id); // Lưu id của setInterval để có thể dừng nó sau này
    };

    const handleImageMouseUp = () => {
        clearInterval(intervalId); // Dừng lướt tự động khi chuột được thả ra
    };

    const handleEditButtonClick = () => {
        // Xử lý sự kiện khi nút "Chỉnh Sửa" được nhấn
        // Ví dụ: Mở form chỉnh sửa sản phẩm
    };
    let saveChangesButton = null;
    if (editMode) {
        saveChangesButton = <button type="submit">Lưu Thay Đổi</button>;
    }

    return (
        <div className="detail-product-dialog">
            <h3>{editMode ? "Chỉnh Sửa" : "Chi Tiết"} Sản Phẩm</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mã Sản Phẩm:</label>
                    <input type="text" name="product_id" value={editedProduct.product_id} onChange={handleChange} disabled />
                </div>
                <div>
                    <label>Tên Sản Phẩm:</label>
                    <input type="text" name="product_name" value={editedProduct.product_name} onChange={handleChange} />
                </div>
                <div>
                    <label>Loại Sản Phẩm:</label>
                    <input type="text" name="productcategory_name" value={editedProduct.productcategory_name} onChange={handleChange} />
                </div>
                <div>
                    <label>Giá Sản Phẩm:</label>
                    <input type="text" name="product_price" value={editedProduct.product_price} onChange={handleChange} />
                </div>
                <div>
                    <label>Giá Sản Phẩm (khuyến mãi):</label>
                    <input type="text" name="product_promotionprice" value={editedProduct.product_promotionprice} onChange={handleChange} />
                </div>
                <div className="image-slider"
                    onMouseDown={handleImageMouseDown}
                    onMouseUp={handleImageMouseUp}
                >
                    {imageUrls.map((imageUrl, index) => (
                        <img key={index} src={imageUrl.image_link} alt={editedProduct.product_name} />
                    ))}
                </div>
                {saveChangesButton}
                <button type="button" onClick={onClose}>Đóng</button>
            </form>
        </div>
    );
};

export default DetailProductDialog;

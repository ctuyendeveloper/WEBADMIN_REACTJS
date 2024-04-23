import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import './css/detailproduct.css'; // Import CSS file for styling

const DetailProductDialog = ({ product, onClose, editMode }) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const [intervalId, setIntervalId] = useState(null);
    const [productcategory, setproductcategory] = useState([]);
    const [product_category, setproduct_category] = useState([]);
    const [previewImages, setPreviewImages] = useState([]); // Thêm state để lưu trữ các ảnh được chọn từ máy tính cho xem trước

    console.log(editedProduct.PRODUCTCATEGORY_ID)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };
    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                // Gọi API để lấy danh sách các URL hình ảnh
                const response = await AxiosInstance().get(`/get-listproduct.php`);
                if (response && response.length > 0) {
                    // Tạo một mảng để lưu trữ các productcategory_id
                    const productCategoryIds = [];

                    // Duyệt qua danh sách sản phẩm để lấy productcategory_id từ mỗi sản phẩm
                    response.forEach(product => {
                        // Kiểm tra nếu productcategory_id không tồn tại trong mảng thì thêm vào
                        if (!productCategoryIds.includes(product.productcategory_id)) {
                            productCategoryIds.push(product.productcategory_id);
                        }
                    });

                    // Lưu trữ danh sách productcategory_id vào state hoặc làm bất cứ điều gì bạn muốn với nó
                    console.log('Product Category IDs:', productCategoryIds);
                    setproduct_category(productCategoryIds)
                }

            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        // Gọi hàm fetchImageUrls khi component được mount và khi sản phẩm được cập nhật
        fetchImageUrls();
    }, []); // Thêm editMode vào dependencies để khi chế độ chỉnh sửa thay đổi, danh sách ảnh cũng được cập nhật



    // Xử lý khi người dùng gửi biểu mẫu
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Cập nhật thông tin sản phẩm
            const formData = new FormData();
            formData.append('name', editedProduct.PRODUCTCATEGORY_NAME);
            formData.append('describe', editedProduct.PRODUCTCATEGORY_DESCRIBE);

            // Gửi ảnh mới

            // Kiểm tra nếu editedProduct.PRODUCTCATEGORY_ID không thuộc mảng product_category
            if (!product_category.includes(editedProduct.PRODUCTCATEGORY_ID)) {
                const response = await AxiosInstance().put(`/updateproduct.php?id=${editedProduct.PRODUCTCATEGORY_ID}`, formData);
                console.log(response.status)

                // Xử lý kết quả
                if (response.status) {
                    alert(response.message);
                    onClose();
                    window.location.href = '/list-productcategory';
                } else {
                    console.error(response);
                }
            }
            else {
                const confirmDelete = window.confirm('Loại sản phẩm này đang được sử dụng, bạn có muốn tiếp tục sửa không?');
                if (confirmDelete) {
                    const response = await AxiosInstance().put(`/editproductcategory.php?id=${editedProduct.PRODUCTCATEGORY_ID}`, formData);
                    console.log(response.status)

                    // Xử lý kết quả
                    if (response.status) {
                        alert(response.message);
                        onClose();
                        window.location.href = '/list-productcategory';
                    } else {
                        console.error(response);
                    }
                }
                else {
                    window.location.href = '/list-productcategory';
                }
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    const handleDelete = async () => {
        if (!product_category.includes(editedProduct.PRODUCTCATEGORY_ID)) {
            const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');

            if (confirmDelete) {
                // gọi api edit
                await AxiosInstance().delete(`/deleteproductcategory.php?id=${editedProduct.PRODUCTCATEGORY_ID}`);
                alert("Xóa loại sản phẩm thành công")
                window.location.reload();
                // Thực hiện xóa nếu người dùng xác nhận
                // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
            }
        }
        else {
            alert("Không thể xóa vì đang có sản phẩm sử dụng loại sản phẩm này.")
            window.location.reload();
        }
    }


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
                    <input type="text" name="PRODUCTCATEGORY_ID" value={editedProduct.PRODUCTCATEGORY_ID} onChange={handleChange} disabled />
                </div>
                <div>
                    <label>Tên Sản Phẩm:</label>
                    <input type="text" name="PRODUCTCATEGORY_NAME" value={editedProduct.PRODUCTCATEGORY_NAME} onChange={handleChange} />
                </div>
                <div>
                    <label>Mô tả về sản phẩm:</label>
                    <input type="text" name="PRODUCTCATEGORY_DESCRIBE" value={editedProduct.PRODUCTCATEGORY_DESCRIBE} onChange={handleChange} />
                </div>
                <br />
                {saveChangesButton}
                <button type="button" className="btnxoa" onClick={handleDelete}>Xóa Sản Phẩm</button>
                <button type="button" onClick={onClose}>Đóng</button>
            </form>
        </div>
    );
};

export default DetailProductDialog;

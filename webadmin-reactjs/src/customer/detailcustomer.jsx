import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import './css/detailproduct.css'; // Import CSS file for styling

const DetailProductDialog = ({ product, onClose }) => {

    // const [editedProduct, setEditedProduct] = useState(product);
    const [intervalId, setIntervalId] = useState(null);
    const [data, setData] = useState(product);
    const [user, setUser] = useState([]);
    const [product_category, setproduct_category] = useState();
    console.log(product)
    const [previewImage, setPreviewImage] = useState(null); // Thêm state để lưu trữ các ảnh được chọn từ máy tính cho xem trước 

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                // Gọi API để lấy danh sách các URL hình ảnh
                const response = await AxiosInstance().get(`/getdetailcustomer.php?id=${data.customer_id}`)
                // setbilldetail(response)
                const newsbilldetail = Array.isArray(response.data) ? response.data[0] : response.data;
                setUser(newsbilldetail)
                console.log(newsbilldetail)
                setPreviewImage(newsbilldetail.customer_image)
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        // Gọi hàm fetchImageUrls khi component được mount và khi sản phẩm được cập nhật
        fetchImageUrls();
    }, [data.customer_id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn ngừng hoạt động của khách hàng?');

        if (confirmDelete) {
            // gọi api edit
            await AxiosInstance().delete(`/deletecustomer.php?id=${data.customer_id}`);
            alert("Ngừng hoạt động khách hàng thành công")
            window.location.reload();
            // Thực hiện xóa nếu người dùng xác nhận
            // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
        }
    }


    return (
        <div className="detail-admin-dialog">
            <h3>Thông tin tài khoản</h3>
            <form className="detail-admin-dialog2">
                <div className="thongtin">
                    <div>
                        <label>Mã người dùng:</label>
                        <input type="text" name="ADMIN_ID" value={user.CUSTOMER_ID}  disabled />
                    </div>
                    <div>
                        <label>Tên người dùng:</label>
                        <input type="text" name="ADMIN_NAME" value={user.customer_name} disabled />
                    </div>
                    <div>
                        <label>Số điện thoại</label>
                        <input type="text" name="ADMIN_PHONE" value={user.CUSTOMER_PHONE}  disabled/>
                        {/* <select value={product_category} onChange={(e) => setproduct_category(e.target.value)}>
                        {productcategory.map((item, index) => (
                            <option value={item.PRODUCTCATEGORY_ID} key={index}> {item.PRODUCTCATEGORY_NAME} </option>
                        ))}
                    </select> */}
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="ADMIN_EMAIL" value={user.CUSTOMER_EMAIL} disabled/>
                    </div>
                    <div>
                        <label>Địa chỉ: </label>
                        <input type="text" name="ADMIN_ADDRESS" value={user.customer_address} disabled/>
                    </div>
                </div>
                <div className="avatar">
                    <img src={previewImage} alt=' Không tìm thấy hình ảnh khách hàng'/>
                </div>
                {/* Thêm input cho phép chọn nhiều ảnh từ máy tính */}
            </form>
            <br />
            <button type="button" className="btnxoa" onClick={handleDelete}>Ngừng hoạt động</button>
                <button type="button" onClick={onClose}>Đóng</button>
        </div>
    );
};

export default DetailProductDialog;

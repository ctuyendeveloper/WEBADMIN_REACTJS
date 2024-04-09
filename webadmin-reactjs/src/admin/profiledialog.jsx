import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import './css/detailproduct.css'; // Import CSS file for styling

const DetailProductDialog = ({ userData, onClose, editMode }) => {

    // const [editedProduct, setEditedProduct] = useState(product);
    const [intervalId, setIntervalId] = useState(null);
    const [picture, setPicture] = useState();
    const [user, setUser] = useState([]);
    const [product_category, setproduct_category] = useState();
    const [previewImage, setPreviewImage] = useState(null); // Thêm state để lưu trữ các ảnh được chọn từ máy tính cho xem trước

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                const newsbilldetail = Array.isArray(userData.user) ? userData.user[0] : userData.user;
                console.log(newsbilldetail)
                setUser(newsbilldetail)
                setPreviewImage(newsbilldetail.ADMIN_IMAGE)
                // Gọi API để lấy danh sách các URL hình ảnh
                // const response = await AxiosInstance().get(`/getimage.php?id=${editedProduct.product_id}`);
                // const newsItems = Array.isArray(response) ? response : [response]; // Đảm bảo rằng newsItems luôn là một mảng
                // const imageLinks = newsItems.map(item => item.image_link); // Lặp qua từng phần tử và lấy ra các URL hình ảnh
                // // console.log(imageLinks); // Kiểm tra xem imageLinks có chứa các URL hình ảnh hay không
                // setPreviewImages(imageLinks); // Cập nhật state với danh sách các URL hình ảnh từ API
                // const result2 = await AxiosInstance().get(`/getlistproductcategory.php`);
                // // editedProduct.productcategory_id = product_category
                // setproductcategory(result2)
                // // setproduct_category(editedProduct.productcategory_id)
                // // console.log(result2.PRODUCTCATEGORY_ID)
                // // console.log(editedProduct.productcategory_id)

            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        // Gọi hàm fetchImageUrls khi component được mount và khi sản phẩm được cập nhật
        fetchImageUrls();
    }, []); // Thêm editMode vào dependencies để khi chế độ chỉnh sửa thay đổi, danh sách ảnh cũng được cập nhật


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreviewImage(URL.createObjectURL(file))
        const formData = new FormData();
        formData.append('image', file);
        const uploadResponse = await fetch("http://127.0.0.1:8686/uploadfile0m.php", {
          method: "POST",
          body: formData,
        });
        // console.log("asdasd2", uploadResponse)
        const uploadResult = await uploadResponse.json();
        setPicture(uploadResult.path);
      }

    // Xử lý khi người dùng gửi biểu mẫu
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Cập nhật thông tin sản phẩm
            // const formData = new FormData();
            // formData.append('nameproduct', editedProduct.product_name);
            // formData.append('productcategory', editedProduct.productcategory_name);
            // formData.append('productprice', editedProduct.product_price);
            // formData.append('productpricemotion', editedProduct.product_promotionprice);
            // formData.append('productcategoryid', product_category);
            // formData.append('productdescribe', editedProduct.product_describe);
            // // console.log(editedProduct.productcategory_id)

            // // Gửi ảnh mới
            // previewImages.forEach(image => {
            //     formData.append('images[]', image);
            // });

            // // Gọi API cập nhật sản phẩm
            // const response = await AxiosInstance().put(`/updateproduct.php?id=${editedProduct.product_id}`, formData);
            // console.log(response.status)

            // // Xử lý kết quả
            // if (response.status) {
            //     alert(response.message);
            //     onClose();
            //     window.location.href = '/list-product';
            // } else {
            //     console.error(response);
            // }
        } catch (error) {
            // console.error('Error updating product:', error);
        }
    };

    // const handleImageMouseDown = () => {
    //     clearInterval(intervalId); // Dừng lướt tự động nếu đang chạy
    //     const id = setInterval(() => {
    //         // Lướt đến hình ảnh tiếp theo
    //         const imageContainer = document.querySelector('.image-slider');
    //         if (imageContainer) {
    //             imageContainer.scrollLeft += 5; // Điều chỉnh tốc độ lướt ở đây
    //         }
    //     }, 10); // Điều chỉnh tốc độ lướt ở đây
    //     setIntervalId(id); // Lưu id của setInterval để có thể dừng nó sau này
    // };
    // const handleDelete = async () => {
    //     const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');

    //     if (confirmDelete) {
    //         // gọi api edit
    //         await AxiosInstance().delete(`/deleteproduct.php?id=${editedProduct.product_id}`);
    //         alert("Xóa tin tức thành công")
    //         window.location.reload();
    //         // Thực hiện xóa nếu người dùng xác nhận
    //         // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
    //     }
    // }

    // const handleImageMouseUp = () => {
    //     clearInterval(intervalId); // Dừng lướt tự động khi chuột được thả ra
    // };


    let saveChangesButton = null;
    if (editMode) {
        saveChangesButton = <button type="submit">Lưu Thay Đổi</button>;
    }

    return (
        <div className="detail-admin-dialog">
            <h3>Thông tin tài khoản</h3>
            <form onSubmit={handleSubmit} className="detail-admin-dialog2">
                <div className="thongtin">
                    <div>
                        <label>Mã người dùng:</label>
                        <input type="text" name="ADMIN_ID" value={user.ADMIN_ID} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <label>Tên người dùng:</label>
                        <input type="text" name="ADMIN_NAME" value={user.ADMIN_NAME} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Số điện thoại</label>
                        <input type="text" name="ADMIN_PHONE" value={user.ADMIN_PHONE} onChange={handleChange} />
                        {/* <select value={product_category} onChange={(e) => setproduct_category(e.target.value)}>
                        {productcategory.map((item, index) => (
                            <option value={item.PRODUCTCATEGORY_ID} key={index}> {item.PRODUCTCATEGORY_NAME} </option>
                        ))}
                    </select> */}
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="ADMIN_EMAIL" value={user.ADMIN_EMAIL} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Địa chỉ: </label>
                        <input type="text" name="ADMIN_ADDRESS" value={user.ADMIN_ADDRESS} onChange={handleChange} />
                    </div>
                </div>
                <div className="avatar">
                    <img src={previewImage} />
                    <input type="file" accept="image/*" onChange={handleImageChange}  />
                </div>
                {/* Thêm input cho phép chọn nhiều ảnh từ máy tính */}
            </form>
            <br />
                <button type="button" className="btnxoa">Xóa Sản Phẩm</button>
                <button type="button" onClick={onClose}>Đóng</button>
        </div>
    );
};

export default DetailProductDialog;

import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import './css/detailproduct.css'; // Import CSS file for styling

const DetailProductDialog = ({ onClose, product }) => {
    const [detailbill, setdetailbill] = useState(product);
    // const [intervalId, setIntervalId] = useState(null);
    // const [productcategory, setproductcategory] = useState([]);
    const [billdetail, setbilldetail] = useState([]);
    const [product_category, setproduct_category] = useState();
    const [previewImages, setPreviewImages] = useState([]); // Thêm state để lưu trữ các ảnh được chọn từ máy tính cho xem trước

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                // Gọi API để lấy danh sách các URL hình ảnh
                const response = await AxiosInstance().get(`/getdetailbill.php?id=${detailbill.bill_id}`)
                // setbilldetail(response)
                // const newsbilldetails = Array.isArray(response) ? response : [response]; // Đảm bảo rằng newsbilldetails luôn là một mảng
                const newsbilldetail = Array.isArray(response) ? response[0] : response;
                setbilldetail(newsbilldetail)
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        // Gọi hàm fetchImageUrls khi component được mount và khi sản phẩm được cập nhật
        fetchImageUrls();
    }, [detailbill.bill_id]);


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedProduct(prevProduct => ({
    //         ...prevProduct,
    //         [name]: value
    //     }));
    // };

    // const handleImageChange = async (e) => {
    //     // const files = e.target.files; // Lấy ra danh sách các file ảnh được chọn
    //     // const imageArray = Array.from(files).map(file => URL.createObjectURL(file)); // Tạo một mảng chứa URL cho mỗi ảnh
    //     // const formData = new FormData();
    //     // imageArray.forEach(image => {
    //     //     formData.append('image', image);
    //     // });
    //     // console.log(imageArray)
    //     // setSelectedImages(files); // Lưu trữ các file ảnh được chọn
    //     // setPreviewImages(imageArray); // Thêm các URL của các ảnh mới vào trong previewImages
    //     // const uploadResponse = await fetch("http://127.0.0.1:8686/uploadfile.php", {
    //     //   method: "POST",
    //     //   body: formData,
    //     // });
    //     // // console.log("asdasd2", uploadResponse)
    //     // const uploadResult = await uploadResponse.json();
    //     // console.log("asdasd2", uploadResult)

    //     const files = e.target.files;
    //     const imageArray = Array.from(files).map(file => URL.createObjectURL(file)); // Tạo một mảng chứa URL cho mỗi ảnh
    //     const formData = new FormData();
    //     Array.from(files).forEach(file => {
    //         formData.append('image[]', file);
    //     });
    //     setPreviewImages(imageArray); // Thêm các URL của các ảnh mới vào trong previewImages
    //     const uploadResponse = await fetch("http://127.0.0.1:8686/uploadfile.php", {
    //         method: "POST",
    //         body: formData,
    //     });
    //     const uploadResult = await uploadResponse.json();
    //     setPreviewImages(uploadResult.paths)
    //     // setPreviewImages(uploadResult.path);
    // };

    // Xử lý khi người dùng gửi biểu mẫu
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Cập nhật thông tin sản phẩm
    //         const formData = new FormData();
    //         formData.append('nameproduct', editedProduct.product_name);
    //         formData.append('productcategory', editedProduct.productcategory_name);
    //         formData.append('productprice', editedProduct.product_price);
    //         formData.append('productpricemotion', editedProduct.product_promotionprice);
    //         formData.append('productcategoryid', product_category);
    //         formData.append('productdescribe', editedProduct.product_describe);
    //         console.log(editedProduct.productcategory_id)

    //         // Gửi ảnh mới
    //         previewImages.forEach(image => {
    //             formData.append('images[]', image);
    //         });

    //         // Gọi API cập nhật sản phẩm
    //         const response = await AxiosInstance().put(`/updateproduct.php?id=${editedProduct.product_id}`, formData);
    //         console.log(response.status)

    //         // Xử lý kết quả
    //         if (response.status) {
    //             alert(response.message);
    //             onClose();
    //             window.location.href = '/list-product';
    //         } else {
    //             console.error(response);
    //         }
    //     } catch (error) {
    //         console.error('Error updating product:', error);
    //     }
    // };

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


    // let saveChangesButton = null;
    // if (editMode) {
    //     saveChangesButton = <button type="submit">Lưu Thay Đổi</button>;
    // }

    return (
        <div className="detail-product-dialog">
            <h3><b>Chi Tiết Hóa Đơn</b></h3>
            <table>
                <tbody>
                    <tr>
                        <div className="cotcha">
                            <div className="cot1">
                                <label><b> Mã Hóa Đơn: {billdetail.bill_id}</b></label>
                                <label>Ngày tạo: {billdetail.bill_createdat}</label>
                                <label>Tên khách hàng (đặt hàng): {billdetail.customer_name}</label>
                            </div>
                            <div className="cot2">
                                <label>Trạng thái thanh toán: {billdetail.bill_status}</label>
                                <label>Địa chỉ (người nhận): {billdetail.address_detail}</label>
                                <label>Số điện thoại (người nhận): {billdetail.address_phone}</label>
                                <label>Tên (người nhận): {billdetail.address_name}</label>
                                <label>Phương thức thanh toán: {billdetail.bill_paymentmethod}</label>
                            </div>
                            <div className="cot3">
                                <label><b>Ghi chú: </b>{billdetail.bill_note}</label>
                            </div>
                        </div>
                        <td className="cotkhachhang">
                            <label>Tên Sản Phẩm: {billdetail.product_name}</label>
                            <label>Đơn giá: <b>{billdetail.product_price}</b></label>
                            <label>Số lượng: <b>{billdetail.orderdetail_quantity}</b></label>
                            <label>Tổng tiền: <b>{billdetail.orderdetail_price}</b></label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button type="button" onClick={onClose}>Đóng</button>
        </div>
    );
};

export default DetailProductDialog;

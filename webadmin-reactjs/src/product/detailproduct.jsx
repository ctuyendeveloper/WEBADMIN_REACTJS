import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import './css/detailproduct.css'; // Import CSS file for styling

const DetailProductDialog = ({ product, onClose, editMode }) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const [intervalId, setIntervalId] = useState(null);
    const [productcategory, setproductcategory] = useState([]);
    const [product_category, setproduct_category] = useState();
    const [previewImages, setPreviewImages] = useState([]); // Thêm state để lưu trữ các ảnh được chọn từ máy tính cho xem trước

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                // Gọi API để lấy danh sách các URL hình ảnh
                const response = await AxiosInstance().get(`/getimage.php?id=${editedProduct.product_id}`);
                const newsItems = Array.isArray(response) ? response : [response]; // Đảm bảo rằng newsItems luôn là một mảng
                const imageLinks = newsItems.map(item => item.image_link); // Lặp qua từng phần tử và lấy ra các URL hình ảnh
                // console.log(imageLinks); // Kiểm tra xem imageLinks có chứa các URL hình ảnh hay không
                setPreviewImages(imageLinks); // Cập nhật state với danh sách các URL hình ảnh từ API
                const result2 = await AxiosInstance().get(`/getlistproductcategory.php`);
                // editedProduct.productcategory_id = product_category
                setproductcategory(result2)
                setproduct_category(editedProduct.productcategory_id)
                // console.log(result2.PRODUCTCATEGORY_ID)
                // console.log(editedProduct.productcategory_id)
              
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        // Gọi hàm fetchImageUrls khi component được mount và khi sản phẩm được cập nhật
        fetchImageUrls();
    }, [editedProduct.product_id, editMode]); // Thêm editMode vào dependencies để khi chế độ chỉnh sửa thay đổi, danh sách ảnh cũng được cập nhật


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        // const files = e.target.files; // Lấy ra danh sách các file ảnh được chọn
        // const imageArray = Array.from(files).map(file => URL.createObjectURL(file)); // Tạo một mảng chứa URL cho mỗi ảnh
        // const formData = new FormData();
        // imageArray.forEach(image => {
        //     formData.append('image', image);
        // });
        // console.log(imageArray)
        // setSelectedImages(files); // Lưu trữ các file ảnh được chọn
        // setPreviewImages(imageArray); // Thêm các URL của các ảnh mới vào trong previewImages
        // const uploadResponse = await fetch("http://127.0.0.1:8686/uploadfile.php", {
        //   method: "POST",
        //   body: formData,
        // });
        // // console.log("asdasd2", uploadResponse)
        // const uploadResult = await uploadResponse.json();
        // console.log("asdasd2", uploadResult)

        const files = e.target.files;
        const imageArray = Array.from(files).map(file => URL.createObjectURL(file)); // Tạo một mảng chứa URL cho mỗi ảnh
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('image[]', file);
        });
        setPreviewImages(imageArray); // Thêm các URL của các ảnh mới vào trong previewImages
        const uploadResponse = await fetch("http://127.0.0.1:8686/uploadfile.php", {
            method: "POST",
            body: formData,
        });
        const uploadResult = await uploadResponse.json();
        setPreviewImages(uploadResult.paths)
        // setPreviewImages(uploadResult.path);
    };

    // Xử lý khi người dùng gửi biểu mẫu
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Cập nhật thông tin sản phẩm
            const formData = new FormData();
            formData.append('nameproduct', editedProduct.product_name);
            formData.append('productcategory', editedProduct.productcategory_name);
            formData.append('productprice', editedProduct.product_price);
            formData.append('productpricemotion', editedProduct.product_promotionprice);
            formData.append('productcategoryid', product_category);
            formData.append('productdescribe', editedProduct.product_describe);
            console.log(editedProduct.productcategory_id)

            // Gửi ảnh mới
            previewImages.forEach(image => {
                formData.append('images[]', image);
            });

            // Gọi API cập nhật sản phẩm
            const response = await AxiosInstance().put(`/updateproduct.php?id=${editedProduct.product_id}`, formData);
            console.log(response.status)

            // Xử lý kết quả
            if (response.status) {
                alert(response.message);
                onClose();
                window.location.href = '/list-product';
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
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
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');

        if (confirmDelete) {
            // gọi api edit
            await AxiosInstance().delete(`/deleteproduct.php?id=${editedProduct.product_id}`);
            alert("Xóa tin tức thành công")
            window.location.reload();
            // Thực hiện xóa nếu người dùng xác nhận
            // axios.delete(`/api/news/${id}`).then(() => navigate('/list'));
        }
    }

    const handleImageMouseUp = () => {
        clearInterval(intervalId); // Dừng lướt tự động khi chuột được thả ra
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
                    <label>Loại Sản Phẩm: </label>
                    {/* <input type="text" name="product_name" value={editedProduct.productcategory_id} onChange={handleChange} /> */}
                    <select value={product_category} onChange={(e) => setproduct_category(e.target.value)}>
                        {productcategory.map((item, index) => (
                            <option value={item.PRODUCTCATEGORY_ID} key={index}> {item.PRODUCTCATEGORY_NAME} </option>
                        ))}
                    </select>
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
                    {/* Hiển thị xem trước các ảnh mới được chọn từ máy tính */}
                    {/* {previewImages.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Selected ${index + 1}`} />
                    ))} */}
                    {/* Hiển thị danh sách hình ảnh từ API */}
                    {previewImages.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={editedProduct.product_name} />
                    ))}
                </div>
                {/* Thêm input cho phép chọn nhiều ảnh từ máy tính */}
                <input type="file" accept="image/*" onChange={handleImageChange} multiple />
                <div>
                    <label>Mô tả về sản phẩm:</label>
                    <input type="text" name="product_describe" value={editedProduct.product_describe} onChange={handleChange} />
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

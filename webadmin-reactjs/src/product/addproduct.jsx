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
    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                const result2 = await AxiosInstance().get(`/getlistproductcategory.php`);
                // editedProduct.productcategory_id = product_category
                setproductcategory(result2)
                // console.log(result2.PRODUCTCATEGORY_ID)
                // console.log(editedProduct.productcategory_id)

            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        // Gọi hàm fetchImageUrls khi component được mount và khi sản phẩm được cập nhật
        fetchImageUrls();
    }, []);


    const handleImageChange = async (e) => {
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
    };

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('nameproduct', productName);
            formData.append('productprice', productPrice);
            formData.append('productpricemotion', productPromotionPrice);
            formData.append('productdescribe', productdescribe);
            formData.append('productcategoryid', productcategory2);
            console.log(productcategory2)
            previewImages.forEach(image => {
                formData.append('images[]', image);
            });
            const response = await AxiosInstance().post(`/addproduct.php`, formData);
            if (response.status) {
                alert(response.message);
                onClose();
                window.location.href = '/list-product';
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
            <label htmlFor="product-name">Tên sản phẩm:</label>
            <input type="text" id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <label htmlFor="product-category">Loại sản phẩm:</label>
            <select value={productcategory2} onChange={(e) => setproductcategory2(e.target.value)}>
                {productcategory.map((item, index) => (
                    <option value={item.PRODUCTCATEGORY_ID} key={index}> {item.PRODUCTCATEGORY_NAME} </option>
                ))}
            </select>
            <label htmlFor="product-price">Giá sản phẩm:</label>
            <input type="text" id="product-price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            <label htmlFor="product-promotion-price">Giá sản phẩm (khuyến mãi):</label>
            <input type="text" id="product-promotion-price" value={productPromotionPrice} onChange={(e) => setProductPromotionPrice(e.target.value)} />
            <label htmlFor="product-image">Hình ảnh:</label>
            <input type="file" id="product-image" accept="image/*" onChange={handleImageChange} multiple />
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
                    <img key={index} src={imageUrl} alt={'asdasd'} />
                ))}
            </div>
            <label htmlFor="product-promotion-price">Mô tả về sản phẩm: </label>
            <input type="text" id="product-promotion-price" value={productdescribe} onChange={(e) => setProductdescribe(e.target.value)} />
            <br />
            <br />
            <button onClick={handleAddProduct}>Thêm</button>
            <button onClick={onClose}>Hủy</button>
        </div>
    );
};

export default AddProductDialog;

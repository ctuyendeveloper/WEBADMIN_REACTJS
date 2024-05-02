import React from 'react';
import './css/item.css'; // Import CSS file for styling

const DetailProductItem = ({ item }) => {
  return (
    <div className="detail-product-item2">
      <div className="product-image2">
        <img src={item.PRODUCT.image_link} alt={item.PRODUCT.name} />
      </div>
      <div className="product-info2">
        <h6 className="product-name2">{item.PRODUCT.name}</h6>
        <p>Đơn giá: <span className="product-price2">{item.PRODUCT.price}</span></p>
        <p>Số lượng: <span className="product-quantity2">{item.ORDERDETAIL_QUANTITY}</span></p>
        <p>Tổng tiền: <span className="product-total2">{item.ORDERDETAIL_PRICE}</span></p>
      </div>
    </div>
  );
};

export default DetailProductItem;

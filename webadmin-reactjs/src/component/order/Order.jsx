
import React from 'react'
import '../css/Order.css'
import Icon_money from '../asset/money.png'
import Img_pet from '../asset/thucung-card2.jpg'
import Img_user_card3 from '../asset/anh_card3.png'
import Img_note from '../asset/note.png'
import { MdAttachMoney } from "react-icons/md";
import Logo from '../asset/Logo.png';
const Order =()=>{
    return(
        <div className="container_Order">
        <head>
            <img src={Logo} alt="" className='Logo' />
            <ul>
                <li><a href="#">hổ Trợ</a></li>
                <li><a href="#">chi Nhánh</a></li>
                <li><a href="#">Tiếng Việt</a></li>
                <li><a href="#">0903757779</a></li>
            </ul>
        </head>
        <nav>
            <ul>
                <li><a href="#">Quản Lí Người Dùng</a></li>
                <li><a href="#">Quản Lí Đơn Hàng</a></li>
                <li><a href="#">Thống kế</a></li>
                <li><a href="#">Exit</a></li>
            </ul>
        </nav>
        <div className="cardbox">
            <div className="card1">
                <div className="product-card1">
                    <img src={Icon_money} alt="" />
                    <div className="product-info">
                        <h2>75 đơn đã bán </h2>
                        <span>2.653.000</span>
                        <p>14/2</p>
                    </div>
                </div>
                <div className="product-card1">
                    <img src={Icon_money} alt="" />
                    <div className="product-info">
                        <h2>75 đơn đã bán </h2>
                        <span>2.653.000</span>
                        <p>14/2</p>
                    </div>
                </div>
                <div className="product-card1-end">
                    <img src={Icon_money} alt="" />
                    <div className="product-info">
                        <h2>75 đơn đã bán </h2>
                        <span>2.653.000</span>
                        <p>14/2</p>
                    </div>
                </div>

            </div>

            <div className="card2">
                <img src={Img_pet} alt="" />
            </div>
            <div className="card3">
                    <div className="details">
                        <div className="currentusers">
                            <div className="cardhead">
                                <h2>order</h2>
                                <a href="#" className='btn'>All View</a>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Tt</td>
                                        <td>Image</td>
                                        <td>Name </td>
                                        <td>Quantily</td>
                                        <td>prince</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td>Nghĩa</td>
                                        <td>3</td>
                                        <td>3000000</td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                    <td>1</td>
                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td>Nghĩa</td>
                                        <td>3</td>
                                        <td>3000000</td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                    <td>1</td>
                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td>Nghĩa</td>
                                        <td>3</td>
                                        <td>3000000</td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                    <td>1</td>
                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td>Nghĩa</td>
                                        <td>3</td>
                                        <td>3000000</td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                    <td>1</td>
                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td>Nghĩa</td>
                                        <td>3</td>
                                        <td>3000000</td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            <div className="card4">
                <div className="details_wrapper">
                    <div className="current_wrapper">
                        <div className="cardhead_wrapper">
                                <h2>Các hoạt động User</h2>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
    );





}
export default Order;
import React from 'react'
import Logo from '../asset/Logo.png';
import '../css/trangchu.css'
import Icon_money from '../asset/money.png'
import Img_pet from '../asset/thucung-card2.jpg'
import Img_user_card3 from '../asset/anh_card3.png'
import Img_note from '../asset/note.png'
import { MdAttachMoney } from "react-icons/md";
const Trangchu = () => {
    return (
        <div className="container_Admin">
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
                                <h2>Quản Lí Người Dùng</h2>
                                <a href="#" className='btn'>All View</a>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Tt</td>
                                        <td>Name </td>
                                        <td>Phone</td>
                                        <td>Email</td>
                                        <td>Image</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Nghĩa</td>
                                        <td>098657889</td>
                                        <td>nghia@gmail.com</td>
                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>trang</td>
                                        <td>098657889</td>
                                        <td>trang@gmail.com</td>

                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>phap</td>
                                        <td>098657889</td>
                                        <td>phap@gmail.com</td>

                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>hoa</td>
                                        <td>098657889</td>
                                        <td>hoa@gmail.com</td>

                                        <td><img src={Img_user_card3} alt="" /></td>
                                        <td><a href="#" className="update">cập nhật</a></td>
                                        <td><a href="#" className="delete">xóa</a></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>bạch</td>
                                        <td>098657889</td>
                                        <td>bach@gmail.com</td>

                                        <td><img src={Img_user_card3} alt="" /></td>
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
export default Trangchu;
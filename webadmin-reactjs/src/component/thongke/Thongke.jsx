import React from 'react'
import '../css/ThongKe.css'
import Icon_money from '../asset/money.png'
import Img_pet from '../asset/thucung-card2.jpg'
import Img_user_card3 from '../asset/anh_card3.png'
import Img_note from '../asset/note.png'
import { MdAttachMoney } from "react-icons/md";
import Logo from '../asset/Logo.png';
const ThongKe =()=>{
    return(
        <div className="container_ThongKe">
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
                   
                    <img src="https://th.bing.com/th/id/R.3be54dfb27327b88b58d3b6a8c33ac68?rik=Q2Pz3qcZaGib4w&riu=http%3a%2f%2ftitc.vn%2fupload%2fimages%2f2017%2fBCTN5.jpg&ehk=wo27xmYU9DEg8cILz7D107iR3A2AogagtA7p27zgfFc%3d&risl=&pid=ImgRaw&r=0" alt="" />
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
export default ThongKe;

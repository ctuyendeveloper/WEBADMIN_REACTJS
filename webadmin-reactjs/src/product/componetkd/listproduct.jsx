import React, { useState, useEffect, Alert } from 'react';
import AxiosInstance from '../../helper/AxiosInstance';
// import './css/listpd.css'
import { useNavigate } from 'react-router-dom';

const App = (props) => {
    const { user } = props;

    const navigate = useNavigate();
    const [news, setNews] = useState([]);

    const handleClick = (action, id, id2) => {
        switch (action) {
            // case 'add':
            //     console.log("test");
            //     navigate('/add');
            //     break;
            // case 'edit':
            //     console.log("test");
            //     navigate(`/edit/${id}`);
            //     break;
            case 'home':
                // console.log("test");
                navigate(`/`);
                break;
            // case 'listproduct':
            //     navigate(`/list-product`);
            //     break;
            default:
                break;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-listproduct.php');
            console.log('asd', result)
            setNews(result);
            // const result2 = await AxiosInstance().get('/get-topics.php');
            // setTopicid(result2);
            // const result3 = await AxiosInstance().get('/get-users.php');
            // setUserid(result3);
        }
        fetchData();
    }, []);
    
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" onClick={() => handleClick('home')}>Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">ASDZCXXC</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">ASDZCXASD</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">ASDZCXAC</a>
                        </li>
                        {/* <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li> */}
                    </ul>
                </div>
            </div>
        </nav>

        {/* navbar */}

        <div className="containerlist mt-5">
        <h1>List Product</h1>
        <table className="table" >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Loại Sản Phẩm</th>
                    <th>Giá Sản Phẩm</th>
                    <th>Giá Sản Phẩm (Khuyến Mãi)</th>
                </tr>
            </thead>
            <tbody>
                {
                    news.map((item, index) => (
                        <tr key={index} style={{}}>
                            <td>{index + 1}</td>
                            <td>{item.product_name}</td>
                            <td>{item.productcategory_name}</td>
                            <td>{item.product_price}</td>
                            <td>{item.product_promotionprice}</td>
                            {/* <td>{topicid.find((topic) => topic.id === item.topic_id)?.name || 'Unknown'}</td> */}
                            <td>
                                <a className="btn btn-primary" style={{ marginRight: '5%' }} onClick={() => handleClick('edit', item.id)}>Sửa</a>
                                <button className="btn btn-danger" onClick={() => handleClick('delete', item.id, item.NAME)}>Xóa</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button onClick={() => handleClick('add')} className="btn btn-primary" style={{ width: '100%', height: '40px', marginBottom: '1%', }}>Thêm</button>
        <button onClick={() => handleClick('back')} className="btn btn-secondary" style={{ width: '100%', height: '40px', }}>Quay trở lại trang List news</button>
    </div>
    </div>
        
        
    );
}

export default App;
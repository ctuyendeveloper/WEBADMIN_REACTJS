import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = (props) => {
    const { user } = props;

    const navigate = useNavigate();

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
    
    return (
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
        // navbar
        
    );
}

export default App;
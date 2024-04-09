import logo from './logo.svg';
import './App.css';

function App() {

  // doc thong tin user tu localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    if (userString)
    {
      return JSON.parse(userString);
    }
    return null;
  }

  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo)
    {
      localStorage.removeItem('user');
      setUser(null);
      return;
    }
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  const [user, setUser] = useState(getUserFromLocalStorage);

  // Những componet phải đăng nhập mới truy cập được
  const ProtectedRoute = () => {
    if(user)
    {
      return <Outlet/>
    }
    return <Navigate to="/login"/>
  }

  // Những componet không đăng nhập truy cập được
  
  const PubliceRoute = () => {
    if(user)
    {
    return <Navigate to="/"/>
    }
    return <Outlet/>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;

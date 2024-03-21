import React from 'react';
import "../css/register.css"
import Mail_icon from '../asset/Mail.png';
import passworld from '../asset/Passworld.png';
import Logo from '../asset/Logo.png';
const  register = ()=> {


    return(
        <div className="card">
              <div className='container'>
          <div className="header">
              <div className="Login"><img src={Logo} alt="" /></div>
              <div className="nameclass">Register</div>
              <div className="underline"></div>
          </div>
          <div className="inputs">
              <div className="input">
                  <img src={Mail_icon} alt="" />
                  <input type="email" placeholder='Email' />
              </div>
              <div className="input">
                  <img src={passworld} alt="" />
                  <input type="password" placeholder='Passworld' />
              </div>
              
              <div className="input">
                  <img src={passworld} alt="" />
                  <input type="password" placeholder='Passworld again'/>
              </div>
          </div>
          <div className="forgot_passworld">Lost Passworld: <span>Click Here!</span></div>
          <div className="submit_container">
              <div className="submit"><a href="/login">Sign up</a></div>
              <div className="submit">Login</div>
          </div>
        </div>
        </div>
      
      );
}
export default register;
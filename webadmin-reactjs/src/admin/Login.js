import React, { useState } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import './login.css';
import AxiosInstance from "../helper/AxiosInstance";

const Login = (props) => {
    const { saveUser } = props;
    const [phone, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const body = {phone, password}
            console.log(body)
            const result = await AxiosInstance().post('login-admin.php', body)
            console.log(result.user);
            if(result.status)
            {
              alert(result.message);
              saveUser(result.user);
            }
            else
            {
              alert(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
            </div>

            <p>Please sign in to your business account</p>
            <h7>Email address</h7>
            <MDBInput wrapperClass='mb-4' type='phone' value={phone} onChange={(e) => setEmail(e.target.value)} name="phone"/>
            <h7>Password</h7>
            <MDBInput wrapperClass='mb-4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} name="password"/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={login}>Sign in</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    )
}

export default Login;
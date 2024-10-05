import React from 'react';
import { FaArrowLeft, FaPhone } from 'react-icons/fa';
import '../styles/screens/ForgotPassword.css';

const ForgotPasswordPhone = () => {
  return (
    <div className="container">
      <div className="form-wrapper reverse">
        {/* <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Forgot Password" className="image" /> */}
        <div className="form">
          <button className="back-button">
            <FaArrowLeft />
          </button>
          <h2>Quên mật khẩu</h2>
          <p className="subtitle">Hãy nhập số điện thoại của bạn</p>
          <div className="input-group">
            <div className="icon-wrapper">
              <FaPhone />
            </div>
            <input type="tel" placeholder="Số điện thoại" className="input" />
          </div>
          <button className="button-green">Nhận mã OTP</button>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Change Password" className="image" />
      </div>
    </div>
  );
};

export default ForgotPasswordPhone;

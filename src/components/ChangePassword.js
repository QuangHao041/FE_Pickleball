import React, { useState } from 'react';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import '../styles/screens/ChangePassword.css';

const ChangePassword = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="container">
      <div className="form-wrapper reverse">
        <div className="form">
          <button className="back-button">
            <FaArrowLeft />
          </button>
          <h2>Đổi mật khẩu</h2>
          <p className="subtitle">Hãy nhập mật khẩu mới</p>
          <div className="input-group">
            <div className="icon-wrapper">
              <FaLock />
            </div>
            <input type="password" placeholder="Nhập mật khẩu mới" className="input" />
          </div>
          <div className="input-group">
            <div className="icon-wrapper">
              <FaLock />
            </div>
            <input type="password" placeholder="Nhập lại mật khẩu mới" className="input" />
          </div>
          <button className="button-green" onClick={handleButtonClick}>Tiếp tục</button>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Change Password" className="image" />
      </div>
      {showAlert && (
        <div className="alert">
          <div className="alert-content">
            <h3>Đổi mật khẩu thành công</h3>
            <p>Mật khẩu của bạn đã được đổi thành công. Ấn quay lại để đăng nhập ở màn hình chính</p>
            <button className="button-green" onClick={handleCloseAlert}>Quay lại</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;

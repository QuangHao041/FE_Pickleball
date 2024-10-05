import React, { useEffect, useState } from 'react';
import '../styles/screens/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

  const navigate = useNavigate();

  // const handleLogin = () => {
  //   setUsername('Minh Trí'); // Set username here or fetch from a form or API
  //   setIsLoggedIn(true);
  // };

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ LocalStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedName = localStorage.getItem('name'); // Lấy name từ LocalStorage

    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      setName(storedName || ''); // Hiển thị tên người dùng (name) đã lưu
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }

  const handlePost = () => {
    navigate('/post-form');
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setName('');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Trang chủ</a></li>
        <li><a href="https://shop-jijiball.netlify.app/">Cửa Hàng</a></li>
        <li><a href="/court">Giao lưu</a></li>
        <li><a href="/coach">Huấn luyện viên</a></li>
        {/* <li><a href="#">Hướng dẫn</a></li>
        <li><a href="#">Liên hệ</a></li> */}
        <li> <button className="post-button" onClick={handlePost}>Đăng Bài Tìm Giao Lưu</button></li>
      </ul>
      {isLoggedIn ? (
        <div className="user-section">
          <button className="post-button" onClick={handlePost}>Đăng Bài Tìm Giao Lưu</button>
          <div className="user-info">
            <img src={process.env.PUBLIC_URL + '/assets/images/user1.png'} alt="User Avatar" className="image" />
            <span>{name}</span>
          </div>
          <button className="login-button" onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button className="login-button" onClick={handleLogin}>Đăng Nhập</button>
          <button className="register-button" onClick={handleRegister}>Đăng Ký</button>
        </div>
      )}
    </header>
  );
};

export default Header;

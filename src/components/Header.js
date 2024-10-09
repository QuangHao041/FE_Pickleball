import React, { useEffect, useState } from 'react';
import '../styles/screens/Header.css';
import { useNavigate } from 'react-router-dom';
import { FaRegPenToSquare } from "react-icons/fa6";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Get login status and user info from localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedName = localStorage.getItem('name');
    const storedAvatar = localStorage.getItem('avatar');

    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      setName(storedName || ''); // Display the saved name
      setAvatar(storedAvatar || ''); // Set avatar or blank if not available
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    localStorage.removeItem('token'); // Remove token
    setIsLoggedIn(false);
    setName('');
    setAvatar('');
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <header className="header">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Logo" />
      </div>
      <ul className="nav-links d-flex justify-content-center">
        <li><a href="/">Trang chủ</a></li>
        <li><a href="https://shop-jijiball.netlify.app/">Cửa Hàng</a></li>
        <li><a href="/court">Giao lưu</a></li>
        <li><a href="/coach">Huấn luyện viên</a></li>
      </ul>
      <ul className='link' style={{textDecoration: "none"}}>
        <li><button className="post-button" >
          <a href="/post-form" style={{ color: "white", backgroundColor: "#064D7E" }}>
            <span id='text' >Đăng Bài Tìm Giao Lưu </span>
            <span id='icon'><FaRegPenToSquare /></span>
          </a>
        </button>
        </li>
      </ul>
      {isLoggedIn ? (
        <div className="user-section">
          <div className="user-info">
            <img
              src={avatar ? avatar : process.env.PUBLIC_URL + '/assets/images/user1.png'}
              alt="User Avatar"
              className="image"
            />
            <span>{name}</span>
          </div>
          <button className="login-button" onClick={handleLogout} style={{ backgroundColor: "#064D7E" }}>Đăng xuất</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button className="login-button" onClick={handleLogin} style={{ backgroundColor: "#064D7E" }}>Đăng Nhập</button>
          <button className="register-button" onClick={handleRegister}>Đăng Ký</button>
        </div>
      )}
    </header>
  );
};

export default Header;

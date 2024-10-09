import React, { useState } from 'react';
import { FaFacebook, FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/screens/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('https://bepickleball.vercel.app/api/auth/login', {
        phone: username,
        password: password,
      });
  
      if (response.status === 200) {
        const { token, user } = response.data;
  
        // Save token and user information to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('name', user.username); // You can also save email or any other details
        localStorage.setItem('avatar', user.avatar || ''); // Handle case where avatar might be missing
  
        // Redirect to home page after login
        navigate('/');
      } else {
        setError('Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Lỗi: ' + (err.response?.data?.message || 'Không thể kết nối đến máy chủ.'));
    }
  };

  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form">
          <button className="back-button" onClick={handleBackButton}>
            <FaArrowLeft />
          </button>
          <h2>Đăng nhập</h2>
          <button className="facebook-button">
            <FaFacebook /> Đăng nhập bằng Facebook
          </button>
          <p className="subtitle1">Hoặc</p>
          <div className="input-group" style={{borderRadius: "20px"}}>
            <div className="icon-wrapper">
              <FaUser />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Số điện thoại"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <div className="icon-wrapper">
              <FaLock />
            </div>
            <input
              type="password"
              className="input"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="remember-me-container">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe"> Ghi nhớ đăng nhập</label>
            </div>
            <a href="/forgot-password" className="link">Quên mật khẩu?</a>
          </div>
          <button className="button" onClick={handleLoginClick}>Đăng nhập</button>
          <p>Chưa có tài khoản? <a href="/register" className="link">Đăng ký</a></p>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Login" className="image" />
      </div>
    </div>
  );
};

export default Login;

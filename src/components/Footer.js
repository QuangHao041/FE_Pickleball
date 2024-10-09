// src/Footer.js

import React from "react";
import "../styles/screens/Footer.css";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div className="head-footer">
          <div className="logo-footer">
            <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Logo" />
            <p>Trang đặt sân Pickleball uy tín ở Việt Nam</p>
          </div>
        </div>
        <div className="text-link">
          <div className="links">
            <div className="link-info">
              <h4>Về chúng tôi</h4>
              <p>Điều khoản</p>
              <p>Chính sách bảo mật thông tin cá nhân</p>
            </div>
            <div className="link-info">
              <h4>Hỗ trợ khách hàng</h4>
              <p>Sử dụng tài khoản</p>
              <p>Cách thức hoạt động</p>
              <p>Phản hồi, góp ý</p>
            </div>
            <div className="link-info">
              <h4>Hợp tác và liên kết</h4>
              <p>
                Cùng JIJI Pickleball phát triển cộng đồng Pickleball tại Việt Nam
              </p>
            </div>
          </div>
          <div className="contact">
            <h4>Liên hệ với chúng tôi qua:</h4>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                Z
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

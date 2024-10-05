// src/Footer.js

import React from "react";
import "../styles/screens/Footer.css";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div className="head-footer">
          <div className="logo">
            <h1>LOGO</h1>
            <p>Trang đặt sân Pickleball uy tín ở Việt Nam</p>
          </div>
          <div className="contact">
            <p>Liên hệ với chúng tôi qua:</p>
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
        <div>
          <div className="links">
            <div>
              <h4>Về chúng tôi</h4>
              <p>Điều khoản</p>
              <p>Chính sách bảo mật thông tin cá nhân</p>
            </div>
            <div>
              <h4>Hỗ trợ khách hàng</h4>
              <p>Sử dụng tài khoản</p>
              <p>Cách thức hoạt động</p>
              <p>Phản hồi, góp ý</p>
            </div>
            <div>

              <h4>Hợp tác và liên kết</h4>
              <p>
                Cùng JIJI Pickleball phát triển cộng đồng Pickleball tại Việt Nam
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

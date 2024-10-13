import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUserFriends, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { FaArrowUpRightDots } from "react-icons/fa6";
import { useNotifications } from './NotificationContext'; // Cập nhật đường dẫn
import '../styles/screens/CourtDetailComponent.css';

const CourtDetailComponent = () => {
  const location = useLocation();
  const { state } = location;
  const { name, price, slots, location: courtLocation, type, level, image, players_needed, applied_players, time } = state;

  const { addNotification } = useNotifications(); // Lấy hàm addNotification từ context

  const handleRegister = () => {
    // Thêm thông báo khi đăng ký thành công
    addNotification(`Đặt sân ${name} thành công!`);
  };

  return (
    <div className="court-detail-container">
      <Card className="court-detail-card">
        <Row>
          <Col md={7} style={{ padding: 0 }}>
            <img style={{ width: "90%" }} src={image} alt={`Court ${name}`} />
          </Col>
          <Col md={5} className="court-details">
            <Card.Body>
              <div className="badge-container">
                <Button variant="outline-primary" className="court-badge">{type}</Button>
              </div>
              <Card.Title style={{ fontSize: "32px", fontWeight: "500" }}>{name}</Card.Title>
              <Card.Text className='text-location'>
                <FaMapMarkerAlt className="icon" style={{ color: "#828282" }} /> {courtLocation}
              </Card.Text>
              <Card.Text>
                <FaArrowUpRightDots className="icon" style={{ color: "#828282" }} />
                Trình độ: {level.toFixed(1)}
              </Card.Text>
              <Card.Text>
                <FaUserFriends className="icon" style={{ color: "#064D7E" }} /> {applied_players}/{players_needed} người đã đăng ký
              </Card.Text>
              <Card.Text>
                <FaRegClock className="icon" style={{ color: "#064D7E" }} /> {slots} slot còn lại
              </Card.Text>
              <Card.Text style={{ fontSize: "24px", fontWeight: "600", color: "#064D7E" }}>{price} VNĐ</Card.Text>
              <Button className="register-btn" variant="primary" onClick={handleRegister}>Đăng kí giao lưu</Button>
            </Card.Body>
          </Col>
        </Row>
        {/* Court Description */}
        <Row>
          <Col style={{ textAlign: "left" }}>
            <h5 style={{ color: "#059A8F" }}>Lưu ý</h5>
            <div style={{ width: '4%', height: '1px', color: "#059A8F", backgroundColor: '#ccc', margin: '10px 0' }} /> {/* Đường kẻ ngăn cách */}
            <br />
            <p>
              1.  "Xé vé" là hình thức thu tiền trọn gói cho cả buổi chơi (thường 2-3 giờ) bao gồm: sân + bóng + nước uống (Aqua/Dasani). <br />
              2. Hình thức này rất phù hợp với những người có công việc bận rộn không có nhóm chơi cố định hoặc có thời gian rảnh mà không kiếm được đồng đội chơi cùng. <br />
              3. Sau khi đăng ký giao lưu thành công, mọi người thể kiểm tra lại thông qua chức năng sân đã đăng ký. <br />
              4. Mọi người hoàn toàn có thể hủy sân sau khi đặt nếu có việc đột suất. <br />
              5. Chúng tôi hoàn toàn không thu bất kì phí nào của người chơi, vui lòng thanh toán trực tiếp với chủ sân.
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CourtDetailComponent;

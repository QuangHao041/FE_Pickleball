import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUserFriends, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import '../styles/screens/CourtDetailComponent.css';

const CourtDetailComponent = () => {
  const location = useLocation(); // Lấy location
  const { state } = location; // Lấy state từ location
  const { name, price, slots, location: courtLocation, type, level, image, players_needed, applied_players, time } = state; // Destructure các thuộc tính từ state


  console.log(state);
  
  return (
    <div className="court-detail-container">
      <Card className="court-detail-card">
        <Row>
          <Col md={7} style={{ padding: 0 }}>
            <img style={{ width: "90%" }} src={image} alt={`Court ${name}`} />
          </Col>
          <Col md={5} className="court-details" style={{ padding: 0 }}>
            <Card.Body>
              <div className="badge-container">
                <Button variant="outline-primary" className="court-badge" >{type}</Button>
              </div>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                <FaMapMarkerAlt className="icon" style={{ color: "#828282" }} /> {courtLocation}
              </Card.Text>
              <Card.Text className="price-text">
                {price} VND/người
              </Card.Text>
              <Card.Text>
                <FaUserFriends className="icon" style={{ color: "#828282" }} /> {slots}/8 người
              </Card.Text>
              <Card.Text>
                <FaCheckCircle className="icon" style={{ color: "#828282" }} /> Ghi chú: Không có
              </Card.Text>
              <Card.Text className="time-text">
                <FaRegClock className="icon" style={{ color: "#828282" }} /> {time}
              </Card.Text>

{/* Slot selection */}
{/* <div className="slot-selection">
  <Row style={{ margin: 0}}>
    {/* Tạo 4 button ở hàng trên (Slots 1-4) */}
    {/* {Array.from({ length: 4 }, (_, idx) => {
      const appliedPlayer = applied_players && applied_players[idx];

      return (
        <Col key={idx} md={3} style={{ padding: 0}}>
          <Button
            variant={appliedPlayer ? 'outline-secondary' : 'outline-primary'}
            style={{ width: '100%' }} // Đảm bảo button chiếm toàn bộ chiều rộng cột
          >
            {appliedPlayer ? appliedPlayer.username : `Slot ${idx + 1}`} {/* Hiển thị Slot 1 - 4 */}
          {/* </Button>
        </Col> 
      );
    })}
  </Row>

  <Row style={{ margin: 0}}> */}
    {/* Tạo 4 button ở hàng dưới (Slots 5-8) */}
    {/* {Array.from({ length: 4 }, (_, idx) => {
      const appliedPlayer = applied_players && applied_players[idx + 4]; // Chỉ số bắt đầu từ 4 cho hàng dưới

      return (
        <Col key={idx + 4} md={3}>
          <Button
            variant={appliedPlayer ? 'outline-secondary' : 'outline-primary'}
            style={{ width: '100%' }} // Đảm bảo button chiếm toàn bộ chiều rộng cột
          >
            {appliedPlayer ? appliedPlayer.username : `Slot ${idx + 5}`} {/* Hiển thị Slot 5 - 8 */}
          {/* </Button>
        </Col>
      );
    })}
  </Row> 
</div> */} 

              <Button className="register-btn" variant="primary">Đăng kí giao lưu</Button>
            </Card.Body>
          </Col>
        </Row>
        {/* Court Description */}
        <Row>
          <Col>
            <h4>Mô tả</h4>
            <p>{'No description available'}</p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CourtDetailComponent;

import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/screens/CourtComponent.css'; // Import custom CSS

const CourtComponent = ({ name, price, slots, location, type, level, image, applied_players, players_needed, time }) => { // Added time here
  const navigate = useNavigate();

  // Fallback level if it's undefined
  const displayedLevel = level ? level.toFixed(1) : "N/A";

  // Handle card click to navigate with court details
  const handleCardClick = () => {
    navigate('/court/court-detail', {
      state: {
        name,
        price,
        slots,
        location,
        type,
        level,
        image,
        applied_players,
        players_needed,
        time // time is now defined
      }
    });
  };

  return (
    <Card className="court-card" onClick={handleCardClick} style={{ textAlign: "center" }}>
      <div className="top-left-badge">
        {type === 'có mái che' ? 'Sân có mái che' : 'Sân không có mái che'}
      </div>

      <div className="top-right-badge">
        {displayedLevel}
      </div>

      <Card.Img
        variant="top"
        src={image}
        alt={`Court ${name}`}
        className="card-image"
      />

      <Card.Body style={{ padding: "0px", margin: "8px", marginBottom: "0px", marginRight: "0px" }}>
        <Card.Title className="court-name">{name}</Card.Title>

        <Card.Text className="price-text" style={{ marginTop: "10px" }}>
          {price} VND/người
        </Card.Text>

        <Row style={{ padding: "0px", margin: "0px", marginBottom: "10px" }}>
          <Col className="location" md={7} style={{ padding: "0px", textAlign: "left" }}>
            <FaMapMarkerAlt /> {location}
          </Col>
          <Col className="slots-text" md={5} style={{ padding: "0px ", textAlign: "right", fontWeight: "10px" }}>
            <FaUsers /> {slots}/8 người
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CourtComponent;

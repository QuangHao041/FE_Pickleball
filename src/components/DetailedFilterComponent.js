import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/screens/DetailedFilterComponent.css';

const DetailedFilterComponent = () => {
  const [filters, setFilters] = useState({
    location: '',
    startTime: '',
    level: '',
    courtType: '',
    groupType: '',
    numPeople: ''
  });
  const [results, setResults] = useState([]); // State để lưu trữ kết quả từ API

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gửi yêu cầu đến API với các bộ lọc
    try {
      const response = await fetch('https://bepickleball.vercel.app/api/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      // Áp dụng các bộ lọc lên dữ liệu nhận được từ API
      const filteredResults = data.filter(court => {
        return (
          (filters.location ? court.court_address.includes(filters.location) : true) &&
          (filters.startTime ? new Date(court.time).getHours() === new Date(filters.startTime).getHours() : true) &&
          (filters.level ? parseFloat(court.skill_level) === parseFloat(filters.level) : true) &&
          (filters.courtType ? court.court_type.includes(filters.courtType) : true) &&
          (filters.groupType ? court.group_type === filters.groupType : true) &&
          (filters.numPeople ? court.total_players >= parseInt(filters.numPeople) : true)
        );
      });

      setResults(filteredResults); // Cập nhật kết quả
    } catch (error) {
      console.error('Error fetching courts:', error);
    }
  };

  const handleReset = () => {
    setFilters({
      location: '',
      startTime: '',
      level: '',
      courtType: '',
      groupType: '',
      numPeople: ''
    });
    setResults([]); // Xóa kết quả khi reset
  };

  return (
    <div className="detailed-filter">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
          {/* Địa điểm */}
          <Col xs="auto" className="me-1">
            <Form.Group controlId="formLocation">
              <Form.Control
                as="select"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Địa điểm</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Giờ bắt đầu */}
          <Col xs="auto" className="me-1">
            <Form.Group controlId="formStartTime">
              <Form.Control
                type="time"
                name="startTime"
                value={filters.startTime}
                onChange={handleInputChange}
                className="form-control-sm"
              />
            </Form.Group>
          </Col>

          {/* Trình độ */}
          <Col xs="auto" className="me-1">
            <Form.Group controlId="formLevel">
              <Form.Control
                as="select"
                name="level"
                value={filters.level}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Trình độ</option>
                {Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1)).map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Loại nhóm */}
          <Col xs="auto" className="me-1">
            <Form.Group controlId="formGroupType">
              <Form.Control
                as="select"
                name="groupType"
                value={filters.groupType}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Loại nhóm</option>
                <option value="Nhóm xé vé">Nhóm xé vé</option>
                <option value="Nhóm cố định">Nhóm cố định</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Loại sân */}
          <Col xs="auto" className="me-1">
            <Form.Group controlId="formCourtType">
              <Form.Control
                as="select"
                name="courtType"
                value={filters.courtType}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Loại sân</option>
                <option value="covered">Có mái che</option>
                <option value="uncovered">Không có mái che</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Số người */}
          <Col xs="auto" className="me-1">
            <Form.Group controlId="formNumPeople">
              <Form.Control
                as="select"
                name="numPeople"
                value={filters.numPeople}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Số người trên sân</option>
                {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Tìm kiếm button */}
          <Col xs="auto" className="me-1">
            <Button variant="primary" type="submit" className="btn-sm">
              Tìm kiếm
            </Button>
          </Col>

          {/* Xóa lọc link */}
          <Col xs="auto" className="me-1">
            <Button variant="link" className="btn-sm" onClick={handleReset}>
              Xóa lọc
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Hiển thị kết quả */}
      <div className="search-results">
        {results.length > 0 ? (
          results.map(court => (
            <div key={court._id}>
              <h4>{court.court_address}</h4>
              <p>Giá: {court.cost} VND</p>
              <p>Trình độ: {court.skill_level}</p>
              <p>Loại sân: {court.court_type}</p>
              <p>Số người hiện tại: {court.total_players}</p>
              <img src={court.images[0]} alt={court.court_address} style={{ width: '100%' }} />
            </div>
          ))
        ) : (
          <p>Không tìm thấy sân nào phù hợp với bộ lọc của bạn.</p>
        )}
      </div>
    </div>
  );
}

export default DetailedFilterComponent;

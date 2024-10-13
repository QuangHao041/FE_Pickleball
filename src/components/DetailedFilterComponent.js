import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/screens/DetailedFilterComponent.css';

const DetailedFilterComponent = ({ setFilteredResults, allCourts }) => {
  const [filters, setFilters] = useState({
    location: '',
    startTime: '',
    level: '',
    courtType: '',
    numPeople: '',
    otherLocation: '', // Thêm trường cho tuỳ chọn "Other"
  });

  const [showOther, setShowOther] = useState(false); // Trạng thái cho việc hiển thị "Other"

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'location' && value === 'Other') {
      setShowOther(true); // Hiển thị trường Other nếu chọn "Other"
    } else if (name === 'location') {
      setShowOther(false); // Ẩn trường Other nếu chọn khác
      setFilters({ ...filters, otherLocation: '' }); // Xoá giá trị Other khi chọn khác
    }

    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredResults = allCourts.filter(court => {
      // Lọc theo địa điểm
      const locationFilter = filters.location === 'Other'
        ? court.court_address.includes(filters.otherLocation)
        : filters.location
        ? court.court_address.includes(filters.location)
        : true;

      // Lọc theo giờ chơi
      const startTimeFilter = filters.startTime
        ? court.play_time.split(' - ')[0] === filters.startTime // So sánh giờ bắt đầu
        : true;

      // Lọc theo trình độ
      const levelFilter = filters.level
        ? parseFloat(court.skill_level) === parseFloat(filters.level)
        : true;

      // Lọc theo loại sân
      const courtTypeFilter = filters.courtType
        ? court.court_type.includes(filters.courtType)
        : true;

      // Lọc theo số lượng người chơi
      
      return (
        locationFilter &&
        startTimeFilter &&
        levelFilter &&
        courtTypeFilter 
      );
    });

    setFilteredResults(filteredResults); // Cập nhật danh sách sau khi lọc
  };

  const handleReset = () => {
    setFilters({
      location: '',
      startTime: '',
      level: '',
      courtType: '',
      numPeople: '',
      otherLocation: '',
    });
    setShowOther(false); // Ẩn "Other" khi reset
    setFilteredResults(allCourts); // Hiển thị lại tất cả sân khi reset bộ lọc
  };

  return (
    <div className="detailed-filter">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
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
                <option value="Other">Other</option> {/* Tuỳ chọn Other */}
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Hiển thị trường nhập tuỳ chọn "Other" khi được chọn */}
          {showOther && (
            <Col xs="auto" className="me-1">
              <Form.Group controlId="formOtherLocation">
                <Form.Control
                  type="text"
                  placeholder="Nhập địa điểm khác"
                  name="otherLocation"
                  value={filters.otherLocation}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          )}

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
                <option value="<2.0">1.0 - 2.0 (Newbie)</option>
                <option value="2.5">2.5</option>
                <option value="3.0">3.0</option>
                <option value="3.5">3.5</option>
                <option value="4.0">4.0</option>
                <option value="4.5">4.5</option>
                <option value="5.0">5.0</option>
                <option value="5.5+">5.5+</option>
              </Form.Control>
            </Form.Group>
          </Col>

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
                <option value="Sân Có Mái Che">Có mái che</option>
                <option value="Sân không Có Mái Che">Không có mái che</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Button variant="primary" type="submit" className="btn-sm">
              Tìm kiếm
            </Button>
          </Col>

          <Col xs="auto" className="me-1">
            <Button variant="link" className="btn-sm" onClick={handleReset}>
              Xóa lọc
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DetailedFilterComponent;

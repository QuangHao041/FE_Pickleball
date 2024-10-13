import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import '../styles/screens/PostForm.css'; // Add your custom styles

const PostForm = () => {
  const [formData, setFormData] = useState({
    trainerName: '',
    experience: '',
    image: '',
    phoneNumber: '',
    price: '',
    zaloLink: '',
    facebookLink: '',
    rememberChoice: false,  // Add rememberChoice field
  });

  // Effect to load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, rememberChoice: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rememberChoice) {
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      localStorage.removeItem('formData');
    }
    console.log('Form Data Submitted:', formData);
  };

  return (
    <Form className="post-form" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/post-background.png)`}} onSubmit={handleSubmit}>
      <h4 style={{textAlign: 'left'}}>Bài đăng</h4>

      {/* Tên huấn luyện viên */}
      <Form.Group controlId="trainerName">
        <Form.Control
          type="text"
          placeholder="Nhập tên huấn luyện viên"
          name="trainerName"
          value={formData.trainerName}
          onChange={handleInputChange}
          style={{ width: '90%', marginBottom: "20px" }}
        />
      </Form.Group>

      {/* Trình độ và input ảnh */}
      <Row>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="experience">
            <Form.Select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            >
              <option value="">Chọn trình độ</option>
              <option value="1.0">1.0-2.0</option>
              <option value="2.5">2.5</option>
              <option value="3.0">3.0</option>
              <option value="3.5">3.5</option>
              <option value="4.0">4.0</option>
              <option value="4.5">4.5</option>
              <option value="5.0">5.0</option>
              <option value="5.5+">5.5+</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="image">
            <Form.Control
              type="file"
              name="image"
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Số điện thoại và Giá tiền */}
      <Row>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="phoneNumber">
            <Form.Control
              type="text"
              placeholder="Nhập số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="price">
            <Form.Control
              type="text"
              placeholder="Nhập giá tiền"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Link Zalo và Facebook */}
      <Row>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="zaloLink">
            <Form.Control
              type="text"
              placeholder="Nhập link Zalo"
              name="zaloLink"
              value={formData.zaloLink}
              onChange={handleInputChange}
              style={{ padding: "0px", width: '90%', justifyContent: 'center' }}
            />
          </Form.Group>
        </Col>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="facebookLink">
            <Form.Control
              type="text"
              placeholder="Nhập link Facebook"
              name="facebookLink"
              value={formData.facebookLink}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Checkbox: Remember my choices */}
      <Form.Group controlId="rememberChoice">
        <Form.Check
          type="checkbox"
          label="Lưu lựa chọn của bạn cho lần sau"
          checked={formData.rememberChoice}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="me-2" style={{backgroundColor: "#2D70A1", color: 'white', borderRadius: '25px'}}>
        Đăng bài
      </Button>
      <Button variant="secondary" type="button" style={{backgroundColor: "white", color: '#2D70A1', borderRadius: '25px'}}>
        Hủy bỏ
      </Button>
    </Form>
  );
};

export default PostForm;

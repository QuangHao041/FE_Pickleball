import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaDollarSign, FaPhoneAlt, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/screens/PostFormComponent.css';


const PostFormComponent = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    name: '',
    location: '',
    courtType: '',
    playTime: '',
    slots: 0,
    date: new Date(), // Initialize with a Date object
    price: '',
    phone: '',
    facebook: '',
    image: '',
    level: '<2.0', // Added default value for skill level
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const dateValue = new Date(value);
      setPost({ ...post, [name]: dateValue });
    } else {
      setPost({ ...post, [name]: value });
    }
    console.log("Updated Post State:", { ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    console.log('Token:', token);
  
    // Ensure date is formatted correctly and exists
    if (!post.date) {
      alert('Please enter a valid date.');
      return;
    }
  
    // Create a Date object from the post.date
    const dateObject = new Date(post.date);
  
    // Check if the date is valid
    if (isNaN(dateObject)) {
      alert('Please enter a valid date.');
      return;
    }
  
    // Format date to DD-MM-YYYY
    const formattedDate = formatDate(dateObject);
    console.log("Formatted Date:", formattedDate, "typeDate", typeof (formattedDate)); // Log formatted date
  
    // Validate required fields
    if (!post.location || post.slots <= 0 || !post.courtType || !post.price || !post.phone) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Create reqBody as a JSON object

    const reqBody = {
      court_name: post.name,
      location: post.location,
      total_players: post.slots,
      court_type: post.courtType,
      players_needed: post.slots,
      skill_level: post.level,
      play_date: formattedDate,
      cost: post.price,
      play_time: post.playTime,
      contact_info: `SĐT: ${post.phone}, Facebook: ${post.facebook}`
    };
  
    console.log( JSON.stringify(reqBody));
  
    try {
      const response = await fetch("https://bepickleball.vercel.app/api/post/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Set Content-Type header to JSON
          'Authorization': `Bearer ${token}`, // Use the token in the Authorization header
        },
        body: JSON.stringify(reqBody), // Send the reqBody as JSON
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response Error:', errorData); // Log error response
        alert(`${errorData.error}`);
        return;
      }
  
      const result = await response.json();
      setShowModal(true); // Show modal on success
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi đăng bài!');
    }
  };


  // Utility function to format Date object to DD-MM-YYYY
  const formatDate = (dateObject) => {
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`; // Return formatted date
  };


  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className='post-back'>
      <Row className="g-3">
        {/* Bên trái: Thông tin chung */}
        <Col md={6} style={{ padding: 0 }} className="g-3">
          <Card className="mb-4 card" id='card-1'>
            <Card.Body style={{ padding: 0 }}>
              <Card.Title id='post-card-title'>Thông tin chung</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupName">
                  <Form.Label><FaMapMarkerAlt /> Tên sân</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nhập tên sân"
                    value={post.name}
                    onChange={handleInputChange}
                    style={{ width: '90%' }}
                  />
                </Form.Group>

                <Form.Group controlId="formLocation">
                  <Form.Label><FaMapMarkerAlt /> Liên kết địa điểm</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Nhập liên kết địa điểm"
                    value={post.location}
                    onChange={handleInputChange}
                    style={{ width: '90%' }}
                  />
                </Form.Group>

                <Form.Group controlId="formSlots" style={{ width: '90%', textAlign: 'center' }}>
                  <Form.Label><FaUsers /> Số người trên sân (bắt buộc)</Form.Label>
                  <Form.Control
                    type="number"
                    name="slots"
                    value={post.slots}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCourtType">
                  <Form.Label>Loại sân:</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Sân Không Có Mái Che"
                      name="courtType"
                      value="Sân Không Có Mái Che"
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Sân Có Mái Che"
                      name="courtType"
                      value="Sân Có Mái Che"
                      onChange={handleInputChange}
                    />
                  </div>
                </Form.Group>

                {/* Tải lên hình ảnh và video */}
                <Form.Group controlId="formImage" style={{ width: '90%', textAlign: 'center' }}>
                  <Form.Label>Thêm ảnh/Video (bắt buộc)</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    style={{ height: '210px', borderRadius: '10px' }}
                    name="image"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
              <br />
            </Card.Body>
          </Card>
        </Col>

        {/* Bên phải: Thông tin khác trong 3 thẻ */}
        <Col md={6} style={{ padding: 0 }} className="g-3">
          <Row style={{ margin: 0 }}>
            <Col md={6} style={{ padding: 0 }} className="g-3">
              <Row style={{ margin: 0 }}>
                {/* Yêu cầu về thành viên */}
                <Col md={12} style={{ padding: 0 }}>
                  <Card className="mb-3 card" id='card-2'>
                    <Card.Body style={{ padding: 0 }}>
                      <Card.Title id='post-card-title'>Yêu cầu về thành viên</Card.Title>

                      <Form.Group controlId="formMemberSlots" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaUsers /> Số người cần tuyển (bắt buộc)</Form.Label>
                        <Form.Control
                          type="number"
                          name="memberSlots"
                          value={post.memberSlots}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="formLevel" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label>Trình độ (bắt buộc)</Form.Label>
                        <Form.Control as="select" name="level" onChange={handleInputChange}>
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
                      <br />
                    </Card.Body>
                  </Card>
                </Col>

                {/* Thời gian và chi phí */}
                <Col md={12} style={{ padding: 0 }}>
                  <Card className="mb-3 card" id='card-2'>
                    <Card.Body style={{ padding: 0 }}>
                      <Card.Title id='post-card-title'>Thời gian và chi phí</Card.Title>

                      <Form.Group controlId="formDate" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaCalendarAlt /> Ngày (bắt buộc)</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={post.date.toISOString().substring(0, 10)}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="playTime" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label>Thời gian chơi (bắt buộc)</Form.Label>
                        <Form.Control as="select" name="playTime" onChange={handleInputChange}>
                          <option value="5h-7h">5h-7h</option>
                          <option value="7h-10h">7h-10h</option>
                          <option value="10h-13h">10h-13h</option>
                          <option value="13h-16h">13h-16h</option>
                          <option value="16h-19h">16h-19h</option>
                          <option value="19h-21h">19h-21h</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formPrice" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaDollarSign /> Giá/người (bắt buộc)</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          placeholder="Nhập giá"
                          value={post.price}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <br />
                    </Card.Body>
                  </Card>
                </Col>

                {/* Thông tin liên hệ */}
                <Col md={12} style={{ padding: 0 }}>
                  <Card className="mb-3 card" id='card-2'>
                    <Card.Body style={{ padding: 0 }}>
                      <Card.Title style={{ textAlign: "center" }}>Thông tin liên hệ</Card.Title>

                      <Form.Group controlId="formPhone" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaPhoneAlt /> Số điện thoại (bắt buộc)</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Nhập số điện thoại"
                          value={post.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="formFacebook" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaFacebook /> Facebook</Form.Label>
                        <Form.Control
                          type="text"
                          name="facebook"
                          placeholder="Nhập Facebook"
                          value={post.facebook}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <br />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Hành động submit */}
          <div className="form-actions">
            <Form.Check type="checkbox" label={<span className="custom-label">&nbsp;&nbsp; Lưu lựa chọn của bạn cho lần sau</span>} className="d-flex justify-content-center" style={{ color: "fff" }} />
            <div className="d-flex justify-content-center">
              <Button variant="secondary" id='btn-post-1' className="post-form-button me-2">Hủy bỏ</Button>
              <Button variant="primary" type="submit" className='post-form-button' onClick={handleSubmit}>Đăng bài</Button>
            </div>
          </div>

          {/* Modal thành công */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bài đăng của bạn đã thành công!</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default PostFormComponent;

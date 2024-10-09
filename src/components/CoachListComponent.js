import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CoachComponent from './CoachComponent';

const CoachListComponent = ({ searchFilters = { trainerName: '', experienceLevel: '' } }) => {
  const [coaches] = useState([
    {
      name: "Minh Trí",
      price: "100.000",
      level: "5.5",
      contact: "Facebook",
      phone: "0123456789",
      image: "/assets/images/coach1.png"
    },
    {
      name: "Thái Sơn",
      price: "150.000",
      level: "5",
      contact: "Zalo",
      phone: "0756456789",
      image: "/assets/images/coach2.png"
    },
    {
      name: "Minh Quân",
      price: "150.000",
      level: "5.5",
      contact: "Facebook",
      phone: "034256789",
      image: "/assets/images/coach3.png"
    },
    {
      name: "Nguyễn Văn Anh",
      price: "120.000",
      level: "5.0",
      contact: "Facebook",
      phone: "0987654321",
      image: "/assets/images/coach4.png"
    },
    {
      name: "Phạm Thành Sơn",
      price: "180.000",
      level: "5.8",
      contact: "Facebook",
      phone: "0912345678",
      image: "/assets/images/coach2.png"
    }
  ]);

  const [visibleCount, setVisibleCount] = useState(8);

  // Lọc danh sách huấn luyện viên dựa trên tên và trình độ
  const filteredCoaches = coaches.filter((coach) => {
    const matchesName = coach.name.toLowerCase().includes(searchFilters.trainerName.toLowerCase());
    const matchesLevel = !searchFilters.experienceLevel || coach.level === searchFilters.experienceLevel;
    return matchesName && matchesLevel;
  });

  // Xác định số lượng huấn luyện viên sẽ được hiển thị
  const displayedCoaches = filteredCoaches.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 4, filteredCoaches.length));
  };

  return (
    <div className="coach-list ms-3" style={{ textAlign: 'center' }} >
      <h2 style={{ fontWeight: 'bold' }}>Huấn Luyện Viên</h2>

      {/* Responsive grid for coach list */}
      <Row className="coach-list-row" style={{ justifyContent: 'flex-start' }}>
        {displayedCoaches.length > 0 ? (
          displayedCoaches.map((coach, index) => (
            <Col key={index} style={{ padding: 0 }}>
              <CoachComponent
                name={coach.name}
                price={coach.price}
                level={coach.level}
                contact={coach.contact}
                phone={coach.phone}
                image={coach.image}
                style={{
                  width: "250px", /* Kích thước cố định cho mỗi thẻ coach */
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: "center"
                }}
              />
            </Col>
          ))
        ) : (
          <p>Không tìm thấy huấn luyện viên nào.</p>
        )}
      </Row>


      {visibleCount < filteredCoaches.length && (
        <button className="btn btn-primary" onClick={handleShowMore} style={{ marginBottom: '20px' }}>
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default CoachListComponent;

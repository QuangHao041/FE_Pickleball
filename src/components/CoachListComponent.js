import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CoachComponent from './CoachComponent';

const CoachListComponent = ({ searchFilters = { trainerName: '', experienceLevel: '' } }) => {
  const [coaches, setCoaches] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  // Fetch dữ liệu từ file JSON
  useEffect(() => {
    fetch('http://localhost:9999/coaches')
      .then((response) => response.json())
      .then((data) => {
        setCoaches(data);
      })
      .catch((error) => {
        console.error('Lỗi khi fetch dữ liệu:', error);
      });
  }, []);

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
    <div className="coach-list ms-3" style={{textAlign: 'center'}} >
      <h2 style={{ fontWeight: 'bold' }}>Huấn Luyện Viên</h2>

      <Row className="coach-list-row" style={{ justifyContent: 'center' }} >
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
              />
            </Col>
          ))
        ) : (
          <p>Không tìm thấy huấn luyện viên nào.</p>
        )}
      </Row>

      {visibleCount < filteredCoaches.length && (
        <button className="btn btn-primary" onClick={handleShowMore} style={{marginBottom: '20px'}}>
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default CoachListComponent;

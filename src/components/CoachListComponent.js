import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CoachComponent from './CoachComponent';

const CoachListComponent = ({ searchFilters = { trainerName: '', experienceLevel: '' } }) => {
  const [coaches, setCoaches] = useState([]);

   // Hàm để lấy dữ liệu từ API
   const fetchCoaches = async () => {
    try {
      const response = await fetch('https://bepickleball.vercel.app/api/coach/list');
      const data = await response.json();
      setCoaches(data); // Giả sử dữ liệu trả về là mảng huấn luyện viên
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  };

  useEffect(() => {
    fetchCoaches(); // Gọi hàm fetchCoaches khi component được mount
  }, []);

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
      <h2 style={{ fontWeight: '600', margin: "50px 0 30px 0"}}>Huấn Luyện Viên</h2>

      {/* Responsive grid for coach list */}
      <Row className="coach-list-row" >
        {displayedCoaches.length > 0 ? (
          displayedCoaches.map((coach, index) => (
            <Col key={index} style={{ padding: 0 }} >
              <CoachComponent
                name={coach.name}
                price={coach.price_per_session.toLocaleString('vi-VN')}
                level={coach.rating}
                contact={coach.contact_info}
                phone={coach?.contact_info.phone}
                image={coach.profile_image_url}
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

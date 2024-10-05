import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CourtComponent from './CourtComponent';
import '../styles/screens/CourtListComponent.css'; // Import custom CSS
import { SiZebpay } from 'react-icons/si';


const CourtListComponent = () => {
  const [courts, setCourts] = useState([]); // State để lưu trữ danh sách sân
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch('https://bepickleball.vercel.app/api/post'); // Địa chỉ API của bạn
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setCourts(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Error fetching courts:', error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi fetch hoàn tất
      }
    };

    fetchCourts(); // Gọi hàm fetch
  }, []);
  console.log(courts);
  
  
  return (
    <div className="court-list-container">
      <Row style={{padding: "20px"}}>
        {courts.map((court, index) => (
          <Col key={index} md={3} style={{ padding: 0}}>
            <CourtComponent
              key={court._id}
              name={court.court_address}
              price={court.cost}
              slots={court.total_players} // Bạn có thể cần điều chỉnh này tùy theo yêu cầu
              location={court.court_address}
              type={court.court_type}
              level={parseFloat(court.skill_level)} // Chuyển đổi skill level thành float
              image={court.images[0]}
              players_needed = {court.players_needed}
              applied_players = {court.applied_players}
              time={court.time}
              style={{width: "100%", alignItems: 'center', justifyContent: 'center', textAlign: "center"}}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourtListComponent;

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/screens/CourtRegistrationList.css'; // Import your custom styles

const CourtRegistrationList = () => {
  const [courts, setCourts] = useState([]);  // Store list of courts
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Function to fetch registered courts
  const fetchCourts = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('Bạn cần đăng nhập để tải danh sách sân.');
      return;
    }
  
    try {
      const response = await fetch('https://bepickleball.vercel.app/api/post/futureApp', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch registered courts');
      }
  
      const data = await response.json();
      setCourts(data);
    } catch (error) {
      setError('Có lỗi xảy ra khi tải danh sách sân.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleUnregister = async (courtId, courtName) => {
    const token = localStorage.getItem('token');
    console.log(token, "token");
    console.log(courtId, "courtId");
    const isConfirmed = window.confirm(`Bạn có muốn hủy đăng ký sân ${courtName}?`);

    // Nếu người dùng không xác nhận, dừng lại
    if (!isConfirmed) {
        return;
    }
    
    if (!token) {
      setError('Bạn cần đăng nhập để thực hiện hủy đăng ký.');
      return;
    }
  
    try {
      const response = await fetch(`https://bepickleball.vercel.app/api/post/cancel/${courtId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  console.log(response, "response");
  
      if (!response.ok) {
        const errorData = await response.json();  // Ghi lại lỗi chi tiết
    console.log(errorData);  // In ra chi tiết lỗi
        throw new Error('Có lỗi xảy ra khi hủy đăng ký.');
      }
  
      // Nếu thành công, xoá sân khỏi danh sách `courts`
      setCourts((prevCourts) => prevCourts.filter((court) => court._id !== courtId));
  
    } catch (error) {
      console.error(error.message);
      setError('Có lỗi xảy ra khi hủy đăng ký.');
    }
  };
  

  const isPastDate = (playDate) => {
    const today = new Date();
    const playDateObj = new Date(playDate);
    return playDateObj < today;
  };

  return (
    <div className="court-registration-list">
      <h4>Sân đã đăng ký</h4>

      <div className="court-items scrollable-list">
        {courts.map((court) => (
          <div key={court._id} className="court-item">
            <img
              src={court.images[0] || '/assets/images/default-court.png'}
              alt={court.court_name}
              className="court-image"
            />
            <div id="court-details">
              <p style={{ color: '#2D70A1' }}>{court.court_type}</p>
              <h5>{court.court_name}</h5>
              <h6>Liên hệ {court.contact_info}</h6>
              <p style={{ color: '#828282' }}>
                <a style={{ color: '#828282' }} href={court.location}>Vị trí: {court.court_name}</a>
                - Thời gian bắt đầu: {court.play_time}
              </p>
              <p style={{ color: '#828282' }}>Ngày bắt đầu: {court.play_date}</p>
            </div>
            <div className="court-actions">
              {/* Conditionally render buttons based on the date */}
              {isPastDate(court.play_date) ? (
                <Button className="completed-btn" disabled>Đã hoàn thành</Button>
              ) : (
                <Button className="cancel-btn" onClick={() => handleUnregister(court._id, court.court_name)}>Hủy đăng ký</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtRegistrationList;

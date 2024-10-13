import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Pagination } from 'react-bootstrap';
import '../styles/screens/CourtRegistrationList.css'; // Add custom styles as needed

const CourtRegistrationList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://bepickleball.vercel.app/api/post/future');
        // Filter posts for the logged-in user
        const userPosts = response.data.filter(post => post.user_id._id === userId);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, [userId]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="court-registration-list">
      <h2>Sân đã đăng ký</h2>
      {currentPosts.map(post => (
        <Card key={post._id} className="mb-3">
          <Card.Img variant="top" src={post.images[0]} alt="Court image" />
          <Card.Body>
            <Card.Title>{post.court_address}</Card.Title>
            <Card.Text>Liên hệ: {post.contact_info}</Card.Text>
            <Card.Text>Thời gian: {post.play_time}</Card.Text>
            <Card.Text>Ngày: {new Date(post.play_date).toLocaleDateString()}</Card.Text>
            <Button variant={post.status === 'approved' ? 'success' : 'danger'}>
              {post.status === 'approved' ? 'Đã hoàn thành' : 'Hủy đăng ký'}
            </Button>
          </Card.Body>
        </Card>
      ))}

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default CourtRegistrationList;

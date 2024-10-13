import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/screens/PostList.css'; // Add your custom styles

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      <h4 style={{paddingLeft: '10px'}}>Bài đăng</h4>
      
      {/* Đặt max-height để giới hạn số lượng thẻ hiển thị */}
      <div className="post-items scrollable-list">
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <img src={post.image} alt={post.name} className="post-image" />
            <div className="post-details">
              <p style={{color: '#2D70A1'}}>{post.description}</p>
              <h5>{post.location}</h5>
              <p style={{color: '#828282'}}>Yêu cầu: {post.playerNeeded}/8 người - Trình độ: {post.level}</p>
            </div>
            <div className="post-actions">
              <Button variant="danger">Xóa</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

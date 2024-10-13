import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/screens/PostList.css'; // Add your custom styles

const PostList = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);

  // Hàm xóa bài đăng
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?');
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`https://bepickleball.vercel.app/api/post/cancel/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));  // _id từ MongoDB
        alert('Bài đăng đã được xóa thành công');
      } else {
        alert('Xóa bài đăng thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng:', error);
      alert('Có lỗi xảy ra khi xóa bài đăng');
    }
  };
  

  return (
    <div className="post-list">
      <h4 style={{ paddingLeft: '10px' }}>Bài đăng</h4>
      
      <div className="post-items scrollable-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <img src={post.image} alt={post.name} className="post-image" />
            <div className="post-details">
              <p style={{ color: '#2D70A1' }}>{post.description}</p>
              <h5>{post.location}</h5>
              <p style={{ color: '#828282' }}>Yêu cầu: {post.playerNeeded}/8 người - Trình độ: {post.level}</p>
            </div>
            <div className="post-actions">
              <Button variant="danger" onClick={() => handleDelete(post.id)}>Xóa</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

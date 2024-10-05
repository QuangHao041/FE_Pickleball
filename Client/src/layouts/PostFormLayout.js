import React from 'react';
import Header from '../components/Header';
import PostFormComponent from '../components/PostFormComponent';
import Footer from '../components/Footer';

const PostFormLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Tạo bài giao lưu</h1>
        <PostFormComponent />
      </main>
      <Footer />
    </div>
  );
};

export default PostFormLayout;

import React from 'react';
import Header from '../components/Header'; // Import Header component
import HomeComponent from '../components/HomeComponent'; // Import HomeComponent
import ParticipationComponent from '../components/ParticipationComponent'; // Import ParticipationComponent
import CoachListComponent from '../components/CoachListComponent'; // Import CoachListComponent
import Footer from '../components/Footer'; // Import Footer component
import NewsComponent from '../components/NewsComponent';

const HomeLayout = () => {
  return (
    <div className="home-layout" style={{backgroundColor: "#F0F0F0"}}>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="content-container">
        <div className="main-content">
          {/* Home Component */}
          <HomeComponent />

          {/* Participation Section */}
          <ParticipationComponent />

          {/* Coach List Section */}
          <CoachListComponent />

          <NewsComponent />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default HomeLayout;

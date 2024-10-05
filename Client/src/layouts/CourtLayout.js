import React from 'react';
import Header from '../components/Header';
import HomeComponent from '../components/HomeComponent';
import DetailedFilterComponent from '../components/DetailedFilterComponent';
import CourtListComponent from '../components/CourtListComponent';
import Footer from '../components/Footer';
import '../styles/screens/CourtListComponent.css';

const CourtLayout = () => {
  return (
    <div className="court-layout" style={{backgroundColor: "#F0F0F0"}}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        {/* Home Component */}
        <HomeComponent />

        {/* Filter Component */}
        <DetailedFilterComponent />

        {/* Court List Component */}
        <CourtListComponent />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CourtLayout;

import React from 'react';
import { FaFacebook, FaPhoneAlt, FaUserTie } from 'react-icons/fa';
import '../styles/screens/CoachComponent.css'; // Custom CSS for card styling

const CoachComponent = ({ name, price, level, phone, image, contact }) => {
  return (
    <div className="card coach-card">
      {/* Image at the top */}
      <img
        src={image}
        alt={`Coach ${name}`}
        className="card-img-top card-image"
      />

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <p className="card-text price-text">
          {price} VND/buổi
        </p>

        <p className="card-text level-text" style={{ marginBottom: 0 }}>
          <FaUserTie /> Trình độ: {level}
        </p>



        <p className="card-text">
          <FaPhoneAlt /> SĐT: {phone}
        </p>

        {/* Contact buttons: Facebook and Zalo */}
        <div className="row contact-buttons">
          <div className="col">
            <button className="btn btn-outline-primary contact-btn" style={{ color: "#3b5998", backgroundColor: "white", borderColor: "#3b5998" }}>
              <FaFacebook /> {contact?.facebook && (
                <a style={{ color: "black", textDecoration: "none" }} href={contact.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
            </button>
          </div>
          <div className="col">
            <button className="btn btn-outline-primary contact-btn" style={{ color: "white", backgroundColor: "#3b5998", borderColor: "#3b5998" }}>
              <FaPhoneAlt />  {contact?.zalo && (
                <a href={`https://zalo.me/${phone}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px', color: "white", textDecoration: "none" }}>
                  Zalo
                </a>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachComponent;

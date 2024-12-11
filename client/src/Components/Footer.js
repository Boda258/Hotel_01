import React from 'react';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1: Logo and About */}
        <div className="footer-section">
          <h3 className="footer-logo">HotelBooking</h3>
          <p>Discover your perfect stay with our reliable hotel reservation . Comfort and convenience at your fingertips!</p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@HotelBooking.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 1234 Hotel Lane, Vacation City</p>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RoomReserve. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

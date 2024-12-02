import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import the CSS for styling
function Navbar({ onBookingHistoryClick, onAboutClick }) {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;  // Apply theme to the whole project
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left-aligned MuseUBot */}
      <div className="navbar-brand">
        <a href="/">MuseUBot</a>
      </div>

      {/* Right-aligned links */}
      <div className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
        <a href="#" onClick={onAboutClick}>About</a>
        <a href="#" onClick={onBookingHistoryClick}>Booking History</a>
        <div className="navbar-theme" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </div>
      </div>

      {/* Burger menu for mobile responsiveness */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketBooking from '../Components/TicketBooking';
import TicketAvailability from '../Components/TicketAvailability'
import ChatInterface from '../Components/ChatInterface';
import Navbar from '../Components/Navbar';
import BookingHistory from "../Components/BookingHistory";
import About from "../Components/About";
import "../Styles/DisplayCard.css"

function DisplayCard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showBookingHistory, setShowBookingHistory] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleCardSelection = (option) => {
    setSelectedOption(option);
  };

  const handleShowBookingHistory = () => {
    setShowBookingHistory(!showBookingHistory);
    setShowAbout(false);
    setSelectedOption(null);
  };

  const handleShowAbout = () => {
    setShowAbout(!showAbout);
    setShowBookingHistory(false);
    setSelectedOption(null);
  };

  return (
    <Router>
      <div>
        <Navbar
          onBookingHistoryClick={handleShowBookingHistory}
          onAboutClick={handleShowAbout}
        />
        
        {!selectedOption && !showBookingHistory && !showAbout && (
          <div className="app-container">
            <div className="card-container">
              <div className="card" onClick={() => handleCardSelection('ticket')}>
                <h3>Manual Ticket Booking</h3>
                <br />
                <p>Book your tickets for the museum manually.</p>
              </div>

              <div className="card" onClick={() => handleCardSelection('chat')}>
                <h3>Chat with Bot</h3>
                <br />
                <p>Ask the museum chatbot about upcoming events, shows, etc.</p>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'ticket' && <TicketAvailability />}
        {selectedOption === 'chat' && <ChatInterface />}
        {showBookingHistory && <BookingHistory />}
        {showAbout && <About />}
      </div>
    </Router>
  );
}

export default DisplayCard;
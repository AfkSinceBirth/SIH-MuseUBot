import React, { useState } from 'react';
import '../Styles/TicketBooking.css';

const data = {
  "California": {
    cities: ["Los Angeles", "San Francisco", "San Diego"],
    museums: {
      "Los Angeles": ["LACMA", "The Getty", "The Broad"],
      "San Francisco": ["SFMOMA", "Asian Art Museum", "De Young Museum"],
      "San Diego": ["San Diego Museum of Art", "USS Midway Museum", "Maritime Museum"]
    }
  },
  "New York": {
    cities: ["New York City", "Buffalo", "Rochester"],
    museums: {
      "New York City": ["Metropolitan Museum", "MoMA", "American Museum of Natural History"],
      "Buffalo": ["Albright-Knox Art Gallery", "Buffalo Museum of Science"],
      "Rochester": ["Memorial Art Gallery", "The Strong National Museum of Play"]
    }
  }
};

function TicketBooking() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMuseum, setSelectedMuseum] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setSelectedMuseum('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedMuseum('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingData = {
      state: selectedState,
      city: selectedCity,
      museum: selectedMuseum,
      date: visitDate,
      time: visitTime,
      people: numPeople
    };

    // Send booking data to Flask backend
    fetch('http://localhost:5000/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSuccess(data.message);
          setError('');
        } else {
          setError(data.error || 'Something went wrong');
          setSuccess('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to submit the booking');
        setSuccess('');
      });
  };

  return (
    <div className="ticket-booking-container">
      <h1>Museum Ticket Booking</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="booking-form">
        {/* Select State */}
        <div className="form-group">
          <label htmlFor="state">Select State:</label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            required
          >
            <option value="">Select a State</option>
            {Object.keys(data).map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Select City */}
        {selectedState && (
          <div className="form-group">
            <label htmlFor="city">Select City:</label>
            <select
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              required
            >
              <option value="">Select a City</option>
              {data[selectedState].cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Select Museum */}
        {selectedCity && (
          <div className="form-group">
            <label htmlFor="museum">Select Museum:</label>
            <select
              id="museum"
              value={selectedMuseum}
              onChange={(e) => setSelectedMuseum(e.target.value)}
              required
            >
              <option value="">Select a Museum</option>
              {data[selectedState].museums[selectedCity].map((museum, index) => (
                <option key={index} value={museum}>
                  {museum}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Visit Date */}
        <div className="form-group">
          <label htmlFor="date">Visit Date:</label>
          <input
            type="date"
            id="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
          />
        </div>

        {/* Visit Time */}
        <div className="form-group">
          <label htmlFor="time">Visit Time:</label>
          <input
            type="time"
            id="time"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            required
          />
        </div>

        {/* Number of People */}
        <div className="form-group">
          <label htmlFor="numPeople">Number of People:</label>
          <input
            type="number"
            id="numPeople"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Confirm Booking</button>
      </form>
    </div>
  );
}

export default TicketBooking;

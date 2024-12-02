// TicketAvailability.js
import React, { useState, useEffect } from 'react';
import '../Styles/TicketAvailability.css';
import Payment from '../Components/PaymentForm'; // Import the Payment component

const TicketAvailability = () => {
  // Sample data (replace this with real API data)
  const data = {
    'California': {
      'Los Angeles': ['LA Art Museum', 'History Museum of LA'],
      'San Francisco': ['SF Museum of Modern Art', 'California Academy of Sciences'],
    },
    'New York': {
      'New York City': ['Metropolitan Museum', 'Museum of Modern Art'],
      'Buffalo': ['Buffalo History Museum', 'Buffalo Science Museum'],
    },
  };

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [museum, setMuseum] = useState('');
  const [cities, setCities] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [visitingDate, setVisitingDate] = useState('');
  const [visitingTime, setVisitingTime] = useState('');
  const [numVisitors, setNumVisitors] = useState(1);
  const [selectedMuseum, setSelectedMuseum] = useState(null); // State for selected museum
  const [showPayment, setShowPayment] = useState(false); // State to control payment component visibility

  useEffect(() => {
    if (state) {
      setCities(Object.keys(data[state] || {}));
      setMuseums([]);
      setCity('');
      setMuseum('');
    }
  }, [state]);

  useEffect(() => {
    if (city) {
      setMuseums(data[state][city] || []);
      setMuseum('');
    }
  }, [city, state]);

  const checkAvailability = () => {
    let availableMuseums = [];
    
    if (state && city && !museum) {
      availableMuseums = data[state][city].map(m => ({ museum: m, ticketsAvailable: Math.floor(Math.random() * 50) + 1 }));
    } else if (state && !city) {
      availableMuseums = Object.values(data[state]).flat().map(m => ({ museum: m, ticketsAvailable: Math.floor(Math.random() * 50) + 1 }));
    } else if (state && city && museum) {
      const ticketsAvailable = Math.floor(Math.random() * 50) + 1;
      availableMuseums = [{ museum, ticketsAvailable }];
    }

    setAvailability(availableMuseums);
  };

  const handleBook = (museum) => {
    setSelectedMuseum(museum); // Store the selected museum
    setShowPayment(true);      // Show the Payment component
  };

  const handleBackToTickets = () => {
    setShowPayment(false);      // Hide Payment component
    setSelectedMuseum(null);    // Reset selected museum
  };

  return (
    <div className="ticket-booking-container">
      <h2>Check Museum Ticket Availability</h2>

      <div className="form-group">
        <label>
          State:
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">--Select State--</option>
            {Object.keys(data).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          City:
          <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
            <option value="">--Select City--</option>
            {cities.map((ct) => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Museum:
          <select value={museum} onChange={(e) => setMuseum(e.target.value)} disabled={!city}>
            <option value="">--Select Museum--</option>
            {museums.map((ms) => (
              <option key={ms} value={ms}>{ms}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Date:
          <input
            type="date"
            value={visitingDate}
            onChange={(e) => setVisitingDate(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Timing:
          <input
            type="time"
            value={visitingTime}
            onChange={(e) => setVisitingTime(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Visitors:
          <input
            type="number"
            value={numVisitors}
            onChange={(e) => setNumVisitors(e.target.value)}
            min="1"
            max="10"
          />
        </label>
      </div>

      <div className='btn-container'>
        <button onClick={checkAvailability} disabled={!state || !visitingDate || !visitingTime} className='submit-btn'>
          Check Ticket Availability
        </button>
      </div>

      {availability && (
        <div>
          <h3>Available Tickets</h3>
          {availability.length > 0 ? (
            <ul>
              {availability.map((m, idx) => (
                <li key={idx} className='ticket'>
                  {m.museum}: {m.ticketsAvailable} tickets
                  <button className='book-btn' onClick={() => handleBook(m.museum)}> Book Now!</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No museums or tickets available for the selected options.</p>
          )}
        </div>
      )}

      {showPayment && (
        <Payment museum={selectedMuseum} onBack={handleBackToTickets} />
      )}
    </div>
  );
};

export default TicketAvailability;

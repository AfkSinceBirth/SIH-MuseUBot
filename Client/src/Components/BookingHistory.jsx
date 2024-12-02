import React, { useState, useEffect } from 'react';
import '../Styles/BookingHistory.css';

const initialBookings = [
  {
    id: '12345',
    museumName: 'Art Museum',
    visitDate: '2024-11-15',
    visitTime: '10:00 AM',
    visitors: 3,
    status: 'upcoming',
    transaction: {
      id: 'TXN12345',
      date: '2024-10-01',
      time: '11:45 AM',
      payment: '$30.00',
    },
  },
  {
    id: '54321',
    museumName: 'History Museum',
    visitDate: '2024-09-20',
    visitTime: '02:00 PM',
    visitors: 2,
    status: 'past',
    transaction: {
      id: 'TXN54321',
      date: '2024-09-01',
      time: '09:15 AM',
      payment: '$20.00',
    },
  },
  // Add more booking data here
];

function BookingHistory() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter bookings by search term and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.museumName.toLowerCase().includes(searchTerm.toLowerCase()) || booking.id.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (bookingId) => {
    // Implement ticket download logic
    alert(`Downloading ticket for booking ID: ${bookingId}`);
  };

  const handleCancel = (bookingId) => {
    // Implement cancel logic (e.g., remove from list or change status)
    alert(`Cancelling ticket for booking ID: ${bookingId}`);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="booking-history-container">
      <h2>Booking History</h2>

      <div className="filter-search-container">
        <input
          type="text"
          placeholder="Search by museum name or booking ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Show All</option>
          <option value="upcoming">Show Only Upcoming</option>
          <option value="past">Show Past Events</option>
        </select>
      </div>

      <div className="booking-list">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.museumName}</h3>
              <p>Date of Visit: {booking.visitDate}</p>
              <p>Time: {booking.visitTime}</p>
              <p>Number of Visitors: {booking.visitors}</p>
              <p>Status: {booking.status === 'upcoming' ? 'Upcoming' : 'Past'}</p>

              <div className="booking-actions">
                <button onClick={() => handleDownload(booking.id)}>Download Ticket</button>
                <button onClick={() => handleCancel(booking.id)}>Cancel Ticket</button>
                <button onClick={() => handleViewDetails(booking)}>View Full Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>

      {selectedBooking && (
        <div className="booking-details">
          <h3>Full Details for Booking ID: {selectedBooking.id}</h3>
          <p>Museum Name: {selectedBooking.museumName}</p>
          <p>Transaction ID: {selectedBooking.transaction.id}</p>
          <p>Transaction Date: {selectedBooking.transaction.date}</p>
          <p>Transaction Time: {selectedBooking.transaction.time}</p>
          <p>Total Payment: {selectedBooking.transaction.payment}</p>
          <button onClick={() => setSelectedBooking(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
}

export default BookingHistory;

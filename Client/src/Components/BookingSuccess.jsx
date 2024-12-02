import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/BookingSuccess.css'; // for CSS animation
const BookingSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="success-container">
      <div className="success-message">
        Ticket booked successfully!

        <button onClick={()=>navigate("/BookingHistory")}>Go to My Bookings</button>
      </div>
    </div>
  );
};

export default BookingSuccess;

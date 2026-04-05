import React, { useState } from 'react';
import axios from 'axios';

function Booking() {

  const [booking, setBooking] = useState({
    userId:'',
    packageId:'',
    travelDate:''
  });

  const book = () => {
    axios.post('http://localhost:8080/bookings', booking)
      .then(() => alert("Booking Confirmed"));
  };

  return (
    <div className="box">
      <h2>Book Your Trip</h2>

      <input
        placeholder="User Id"
        onChange={(e)=>setBooking({...booking,userId:e.target.value})}
      />

      <input
        placeholder="Package Id"
        onChange={(e)=>setBooking({...booking,packageId:e.target.value})}
      />

      <input
        type="date"
        onChange={(e)=>setBooking({...booking,travelDate:e.target.value})}
      />

      <button onClick={book}>Book Now</button>
    </div>
  );
}

export default Booking;
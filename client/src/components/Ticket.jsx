import React, { useState } from 'react';
import './Ticket.css';

const Ticket = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Function to handle movie selection
  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to handle seat selection
  const handleSeatSelection = (seatNumber, isAvailable) => {
    // Check if seat is available for selection
    if (isAvailable) {
      // Check if seat is already selected
      if (selectedSeats.includes(seatNumber)) {
        // Deselect the seat
        setSelectedSeats([]);
        alert('Only one ticket can be booked at a time.');
      } else {
        // Deselect all other seats and select the chosen seat
        setSelectedSeats([seatNumber]);
      }
    }
  };

  // Function to handle form submission and booking confirmation
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform booking confirmation logic here (e.g., send API request, update database, etc.)
    // After successful booking confirmation, setBookingConfirmed(true);
  };

  // Example seat data with availability
  const seatData = [
    { seatNumber: 'A1', isAvailable: true },
    { seatNumber: 'A2', isAvailable: false },
    { seatNumber: 'A3', isAvailable: true },
    { seatNumber: 'A4', isAvailable: false },
    { seatNumber: 'A5', isAvailable: false },
    { seatNumber: 'A6', isAvailable: true },
    { seatNumber: 'A7', isAvailable: false },
    { seatNumber: 'A8', isAvailable: true },
    { seatNumber: 'A9', isAvailable: false },
    { seatNumber: 'A10', isAvailable: false },
    { seatNumber: 'B1', isAvailable: true },
    { seatNumber: 'B2', isAvailable: false },
    { seatNumber: 'B3', isAvailable: true },
    { seatNumber: 'B4', isAvailable: false },
    { seatNumber: 'B5', isAvailable: false },
    { seatNumber: 'B6', isAvailable: true },
    { seatNumber: 'B7', isAvailable: false },
    { seatNumber: 'B8', isAvailable: true },
    { seatNumber: 'B9', isAvailable: false },
    { seatNumber: 'B10', isAvailable: false }
    // Add more seat data here
  ];

  return (
    <div className="booking-app-container">
      <h1 className="booking-app-title">Movie Ticket Booking</h1>

      {/* Display movie information */}
      <div className="movie-info-container">
        <h2 className="section-title">Movie Information</h2>
        {/* Render movie options */}
        {/* Example: */}
        <div className="movie-option">
          <h3>Movie 1</h3>
          <p>Director: John Doe</p>
          <p>Genre: Action</p>
          <button
            onClick={() => handleMovieSelection('Movie 1')}
            className={`select-movie-button ${selectedMovie === 'Movie 1' ? 'selected' : ''
              }`}
          >
            Select Movie
          </button>
        </div>
        {/* Repeat for other movie options */}
      </div>

      {/* Display seat selection */}
      {selectedMovie && (
        <div className="seat-selection-container">
          <h2 className="section-title">Seat Selection</h2>
          {/* Render seat options */}
          {/* Example: */}
          <div className="seat-option">
            <h3>Screen A</h3>
            <p>Seats</p>
            <div className="seat-row">
              {seatData
                .filter((seat) => seat.seatNumber.charAt(0) === 'A')
                .map((seat) => (
                  <button
                    key={seat.seatNumber}
                    onClick={() => handleSeatSelection(seat.seatNumber, seat.isAvailable)}
                    className={`seat-button ${selectedSeats.includes(seat.seatNumber) ? 'selected' : ''
                      } ${!seat.isAvailable ? 'unavailable' : ''}`}
                    disabled={!seat.isAvailable}
                  >
                    {seat.seatNumber}
                  </button>
                ))}
            </div>
          </div>

          <div className="seat-option">
            <h3>Screen B</h3>
            <p>Seats</p>
            <div className="seat-row">
              {seatData
                .filter((seat) => seat.seatNumber.charAt(0) === 'B')
                .map((seat) => (
                  <button
                    key={seat.seatNumber}
                    onClick={() => handleSeatSelection(seat.seatNumber, seat.isAvailable)}
                    className={`seat-button ${selectedSeats.includes(seat.seatNumber) ? 'selected' : ''
                      } ${!seat.isAvailable ? 'unavailable' : ''}`}
                    disabled={!seat.isAvailable}
                  >
                    {seat.seatNumber}
                  </button>
                ))}
            </div>
          </div>

        </div>
      )}

      {/* Display booking confirmation */}
      {selectedSeats.length > 0 && (

        <div className="booking-confirmation-container">
          <h2 className="section-title">Booking Confirmation</h2>
          {/* Render selected movie and seats */}
          <div className="booking-details">
            <p>Movie: {selectedMovie}</p>
            <p>Seats: {selectedSeats.join(', ')}</p>
          </div>

          {/* Render booking form */}
          {!bookingConfirmed ? (
            <form className="booking-form" onSubmit={handleFormSubmit}>
              <label>
                Customer Name:
                <input
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                />
              </label>
              <button type="submit" className="confirm-booking-button">
                Confirm Booking
              </button>
            </form>
          ) : (
            <p className="booking-confirmation-message">
              Booking confirmed! Thank you, {customerName}!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Ticket;


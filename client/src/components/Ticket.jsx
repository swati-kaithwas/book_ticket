import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Ticket.css';
import axios from 'axios';
import swal from 'sweetalert';

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [movieDetails, setMovieDetails] = useState({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [seats, setSeats] = useState([]);

  const handleCancel = ()=>{
    navigate("/movie")
  }

  // Function to handle movie selection
  const fetchData = async () => {
    try {
      const response = await fetch(`https://book-ticket-hyxg.vercel.app/movie/getById/${id}`);
      console.log(response);
      const json = await response.json();
      console.log("data", json.data);
      setMovieDetails(json.data);
    } catch (error) {
      swal({
        closeOnClickOutside: false,
        title: 'Ooopss....',
        text: "Something went wrong!",
        icon: 'error',
      })
    }
  };
  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to handle seat selection
  const handleSeatSelection = (seatNumber, isAvailable) => {
    // Check if seat is available for selection
    // Deselect all other seats and select the chosen seat
    setSelectedSeats(seatNumber);
  };

  // Function to handle form submission and booking confirmation
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        movieid: movieDetails._id,
        seatId: selectedSeats._id
      }

      await axios.post("https://book-ticket-hyxg.vercel.app/ticket/createticket", payload, {
        headers: {
          Authorization: sessionStorage.getItem('token')
        }
      });
      fetchTickets();
      setSelectedSeats({});
      swal({
        closeOnClickOutside: false,
        title: 'Success',
        text: "Ticket booked successfully!",
        icon: 'success',
      }).then(() => navigate("/movie"))
    } catch (error) {
      swal({
        closeOnClickOutside: false,
        title: 'Ooopss....',
        text: "Something went wrong!",
        icon: 'error',
      })
    }
    // Perform booking confirmation logic here (e.g., send API request, update database, etc.)
    // After successful booking confirmation, setBookingConfirmed(true);
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch("https://book-ticket-hyxg.vercel.app/seats");
      const json = await response.json();
      setSeats(json.data);
    } catch (err) {
      swal({
        closeOnClickOutside: false,
        title: 'Ooopss....',
        text: "Something went wrong!",
        icon: 'error',
      })
    }
  }

  useEffect(() => {
    fetchData(id);
    fetchTickets();
  }, [])

  return (
    <div className="booking-app-container">
      {/* Display movie information */}
      <div className="movie-info-container">
        {/* Render movie options */}
        {/* Example: */}

        <div className="movie-option">
          <img src={movieDetails.movie_images} style={{ height: "200px", width: "150px" }} />
          <h3>{movieDetails.movie_name}</h3>
          <p>Director: {movieDetails.director_name}</p>
          <p>Genre: {movieDetails.type_of_movie}</p>
        </div>
        {/* Repeat for other movie options */}
      </div>

      {/* Display seat selection */}
      {/* Mapping seats arrays to show all available seats */}
      {seats && (
        <div className="seat-selection-container">
          {/* Render seat options */}
          {/* Example: */}
          <div className="seat-option">
            <h3>Screen A</h3>
            <p>Seats</p>
            <div className="seat-row">
              {seats.map((seat) => (
                <>
                  <button
                    key={seat.seat_name}
                    onClick={() => handleSeatSelection(seat)}
                    className={`${seat.seat_name === selectedSeats.seat_name ? "selected" : null} seat-button`}
                    disabled={seat.movieIds?.includes(movieDetails._id) == 0 ? false : true}
                  >
                    {seat.seat_name}
                  </button>
                </>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Display booking confirmation */}
      {Object.keys(selectedSeats).length !== 0 && (

        <div className="booking-confirmation-container">
          <h2 className="section-title">Booking Confirmation</h2>
          {/* Render selected movie and seats */}
          <div className="booking-details">
            <p>Seats: {selectedSeats.seat_name}</p>
          </div>

          {/* Render booking form */}
          <div className='btn-group'>
            <div>
              <form id='movie-form' className="booking-form" onSubmit={handleFormSubmit}>
                <button type="submit" class="confirm-btn" >Confirm Booking</button>

              </form>
            </div>
            <div>
              <button type="button" class="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
let express = require('express');
let router = express.Router();
const Seats = require('../controller/seat.controller');

router.post("/create", Seats.createSeat);
router.get("/", Seats.geatAllSeats);

module.exports = router;
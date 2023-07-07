var express = require('express');
var router = express.Router();
const ticketController = require("../controller/bookTicket.controller");
const { verifyToken } = require('../middleware/jwtAuth');
router.use((req, res, next) => {
  console.log(
    "TEST ROUTE: " + req.originalUrl + "::" + new Date().toISOString()
  );
  next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/createticket",verifyToken, ticketController.createTicket);
router.get("/booked/:userid", ticketController.getBookedTicketsByUserId);

module.exports = router;

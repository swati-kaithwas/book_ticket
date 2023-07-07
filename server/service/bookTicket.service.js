const Ticket = require("../model/bookTicket.model");
const createticket = async (obj) => {
    try {
      let data = new Ticket(obj);
      await data.save();
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getBookedTicketsByUserId = async(id)=>{
    try {
      console.log(id);
      let data = Ticket.find({userid: id}).populate(["seatId"]).lean().exec();
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  module.exports={
    createticket,
    getBookedTicketsByUserId
  }
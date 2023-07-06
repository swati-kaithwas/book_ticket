const Ticket = require("../model/bookTicket.model")
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
  module.exports={
    createticket,
  }
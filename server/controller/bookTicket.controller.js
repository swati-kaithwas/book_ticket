const sendResponse = require("../helper/responseSender");
const Ticketservice = require("../service/bookTicket.service");
const createTicket = async (req, res) => {
    /*
      1. create Movie
      2. movie_name , movie_type,director name and movie_images , is required
      */
    try {
      let { movieid,userid, seatId } = req.body;
    //   let movie_images = req.file;
      if (!movieid || !userid||! seatId)
        return sendResponse(res, 400, {
          status: false,
          message: "movieid , userid  and seatid is required!",
        });
      const obj = {
      movieid: movieid,
      userid:userid,
      seatId: seatId,
    
      };
      
    
      const createcar = await Ticketservice.createticket(obj);
      if (!createcar)
        return sendResponse(res, 400, {
          status: false,
          message: "error!",
        });
      return sendResponse(res, 200, {
        status: true,
        data: createcar,
        message: "created successfully",
      });
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        status: false,
        message: "Internal Error!",
      });
    }
  };

  module.exports={
    createTicket,
  }
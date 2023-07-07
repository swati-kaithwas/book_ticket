const sendResponse = require("../helper/responseSender");
const Seats = require('../model/seats.model');

const createSeat = async (req, res) => {
  /*
    1. create Movie
    2. movie_name , movie_type,director name and movie_images , is required
    */
  try {
    let { seat_name} = req.body;
    if (!seat_name)
      return sendResponse(res, 400, {
        status: false,
        message: "seat name is required!",
      });
    const obj = {
    seat_name: seat_name
    };

    const createcar = await Seats.create(obj);

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

const geatAllSeats = async(req, res)=>{
  try {
    const allseats = await Seats.find();
    if (!allseats)
      return sendResponse(res, 400, {
        status: false,
        message: "error!",
      });
    return sendResponse(res, 200, {
      status: true,
      data: allseats,
      message: "created successfully",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
}

module.exports = {
  createSeat,
  geatAllSeats
}
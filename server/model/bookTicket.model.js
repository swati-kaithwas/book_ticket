


const { Schema, model } = require("mongoose");
const Movie = require("./movie.model");
const User = require("./user.model");
const Seats = require("./seats.model");
const ticket = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: User },
    movieid: { type: Schema.Types.ObjectId, ref: Movie },
    seatId: { type: Schema.Types.ObjectId, ref: Seats },
    isbooked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Ticket = model("ticket ", ticket);
module.exports = Ticket;

const { Schema, model } = require("mongoose");
const User = require("./user.model");
const Movie = require("./movie.model");

const seats = new Schema(
  {
    userid: [{ type: Schema.Types.ObjectId, ref: User }],
    movieIds: [{ type: Schema.Types.ObjectId, ref: Movie }],
    seat_name: {
      type: String,
      trim: true,
      required: [true, " seat name is required!"],
    },
    isbooked: {
      type: Boolean,
      default: false,
    },
  },
  
  { timestamps: true }
);
const Seats = model("seats", seats);
module.exports = Seats;

const { Schema, model } = require("mongoose");

const movie = new Schema(
  {
    movie_name: {
      type: String,
      trim: true,
      required: [true, " movie name is not required!"],
    },
    director_name: {
      type: String,
      trim: true,
      required: [true, " Director name is not required!"],
    },
    type_of_movie: {
      type: String,
      trim: true,
      required: [true, " movie type is not required!"],
    },
    movie_images: {
      type: String,
    },
    seats: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Movie = model("movie", movie);
module.exports = Movie;

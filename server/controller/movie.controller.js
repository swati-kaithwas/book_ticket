const sendResponse = require("../helper/responseSender");
const Movieservice = require("../service/movie.service");
const createMovie = async (req, res) => {
  /*
    1. create Movie
    2. movie_name , movie_type,director name and movie_images , is required
    */
  try {
    let { movie_name, director_name, type_of_movie ,seats} = req.body;
    let movie_images = req.file;
    if (!type_of_movie || !director_name||! movie_name||!seats)
      return sendResponse(res, 400, {
        status: false,
        message: "movie name, movie type  and director name is required!",
      });
    const obj = {
    movie_name: movie_name,
    type_of_movie:type_of_movie,
    director_name: director_name,
    seats:seats
    };
    
    if(req.file!=undefined){
      console.log("req",req.file)
      var image= req.file.filename;
         obj.movie_images = "http://localhost:3001/"+"moviesimages/"+ image
      
    }
    const createcar = await Movieservice.createmovie(obj);
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
const getAllMovie = async (req, res) => {
    /*
      1. get all movie
      */
  
    try {
      
      const data = await Movieservice.findAll(req.query);
      // console.log(data,"data")

      if (!data)
        return sendResponse(res, 400, {
          status: false,
          message: "not found movie",
        });
      return sendResponse(res, 200, {
        status: true,
        data: data,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        status: false,
        message: "Internal Error!",
      });
    }
  };
  const getById = async (req, res) => {
    /*
      1.id is required
      2. using id find car
      */
    try {
      const { id } = req.body;
      if (!id)
        return sendResponse(res, 400, {
          status: false,
          message: "id is required !",
        });
  
      const data = await Movieservice.GetById(id);
      if (!data)
        return sendResponse(res, 400, {
          status: false,
          message: "data not found",
        });
      return sendResponse(res, 200, {
        status: true,
        data: data,
        message: "successfully",
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
     createMovie,
     getAllMovie,
     getById,
}
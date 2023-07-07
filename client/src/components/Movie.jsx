import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Movie = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/movie/getall");
      const json = await response.json();
      console.log("data", json.data?.content);

      setData(json.data?.content);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleBookNow = (movieId) => {
    navigate(`/ticket/${movieId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredMovies = data?.filter((movie) => {
    const lowerCaseSearch = search.toLowerCase();
    return (
      movie.movie_name.toLowerCase().includes(lowerCaseSearch) ||
      movie.type_of_movie.toLowerCase().includes(lowerCaseSearch) ||
      movie.director_name.toLowerCase().includes(lowerCaseSearch)
    );
  });

  console.log("data", data)
  console.log(search)

  // const cars = data?.filter((el)=>{
  //   if(search == ""){
  //       return el;
  //   }else if(el.movie_name.toLowerCase().includes(search.toLowerCase())){
  //       return el;
  //   }
  //   else if(el.type_of_movie.toLowerCase().includes(search.toLowerCase())){
  //       return el;
  //   }
  //   else if(el.director_name.toLowerCase().includes(search.toLowerCase())){
  //       return el;
  //   }
  // })
  return (
    // <div class="bg-secondry ">
    //   <p class="fs-1 fw-bold my-2 text-center">Movies</p>
    //   {/* <button className="btn btn-primary" onClick={()=>navigate('/add-car')}>Add New Car</button> */}

    //   <input class='form-control' placeholder="Serch color, number ..." onChange={(e)=>setSearch(e.target.value)}/>
    //   <div class="col-11 m-auto row gap-5 mt-5 justify-content-center ">
    //     {cars?.length > 0 ? (
    //         cars?.map((e, i) => { 
    //         return (
    //           <>
    //             <div class="border rounded-3 bg-light p-2 col-md-3 col-11 ">
    //               <img src={e.movie_images} alt="car_images" class="w-100 p-3"/>

    //               <p class="ddd">
    //                 <span class="fw-bold">Movie Name:</span> {e.movie_name}
    //               </p>
    //               <p class="ddd">
    //                 <span class="fw-bold">Type:</span> {e.type_of_movie}
    //               </p>
    //               {/* <p class="ddd">
    //                 <span class="fw-bold">Model Number:</span> {e.model_no}
    //               </p> */}
    //               <p class="ddd">
    //                 <span class="fw-bold">Director:</span> {e.director_name}
    //               </p>
    //               <div>
    //                 {/* <button className="btn bg-primary" onClick={()=>navigate('/ticket')}>Book Now</button> */}
    //                 <button className="btn bg-primary" onClick={() => handleBookNow(movie.id)}>Book Now</button>

    //               </div>

    //             </div>
    //           </>
    //         );
    //       })
    //     ) : (
    //       <p>No data to display</p>
    //     )}
    //   </div>
    // </div>
    <div className="bg-secondry">
      <p className="fs-1 fw-bold my-2 text-center">Book Movies</p>
      <input className="form-control search" placeholder="Search your movie here..." onChange={(e) => setSearch(e.target.value)} />
      <div className="movieacc col-11 m-auto row gap-5 mt-5 justify-content-center">
        {filteredMovies?.length > 0 ? (
          filteredMovies?.map((movie) => (
            <div key={movie.id} className="movieacc border rounded-3 bg-light p-2 col-md-3 col-11 ">
              <img src={movie.movie_images} alt="car_images" className="moviecard w-100 p-3" />
              <p className="ddd">
                <span className="fw-bold">Movie Name:</span> {movie.movie_name}
              </p>
              <p className="ddd">
                <span className="fw-bold">Type:</span> {movie.type_of_movie}
              </p>
              <p className="ddd">
                <span className="fw-bold">Director:</span> {movie.director_name}
              </p>
              <div>
                <button onClick={() => handleBookNow(movie._id)} className="cmn-btn"> <span>Button</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No data to display</p>
        )}
      </div>
    </div>
  );
};

export default Movie;

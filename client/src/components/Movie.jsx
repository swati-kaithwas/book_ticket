import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import axios from "axios";
const Movie = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  // const handleDeletefunc = async (id) => {
  //   try {
  //     const payload = { id };
  //     // console.log("payload", payload);
  //     const del = await axios.delete(
  //       `http://localhost:3005/car/deletecar/${id}`
  //     );
  //     // console.log("del", del);
  //   } catch (error) {
  //     console.log("Error ", error);
  //   }
  // };
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

  useEffect(() => {
    fetchData();
  }, []);
 
console.log("data",data)
  console.log(search)

  const cars = data?.filter((el)=>{
    if(search == ""){
        return el;
    }else if(el.movie_name.toLowerCase().includes(search.toLowerCase())){
        return el;
    }
    else if(el.type_of_movie.toLowerCase().includes(search.toLowerCase())){
        return el;
    }
    else if(el.director_name.toLowerCase().includes(search.toLowerCase())){
        return el;
    }
  })
  return (
    <div class="bg-secondry ">
      <p class="fs-1 fw-bold my-2 text-center">Movies</p>
      {/* <button className="btn btn-primary" onClick={()=>navigate('/add-car')}>Add New Car</button> */}

      <input class='form-control' placeholder="Serch color, number ..." onChange={(e)=>setSearch(e.target.value)}/>
      <div class="col-11 m-auto row gap-5 mt-5 justify-content-center ">
        {cars?.length > 0 ? (
            cars?.map((e, i) => { 
            return (
              <>
                <div class="border rounded-3 bg-light p-2 col-md-3 col-11 ">
                  <img src={e.movie_images} alt="car_images" class="w-100 p-3"/>
                
                  <p class="ddd">
                    <span class="fw-bold">Movie Name:</span> {e.movie_name}
                  </p>
                  <p class="ddd">
                    <span class="fw-bold">Type:</span> {e.type_of_movie}
                  </p>
                  {/* <p class="ddd">
                    <span class="fw-bold">Model Number:</span> {e.model_no}
                  </p> */}
                  <p class="ddd">
                    <span class="fw-bold">Director:</span> {e.director_name}
                  </p>
                  <div>
                    <button className="btn bg-primary" onClick={()=>navigate('/ticket')}>Book Now</button>
                  </div>
                  
                </div>
              </>
            );
          })
        ) : (
          <p>No data to display</p>
        )}
      </div>
    </div>
  );
};

export default Movie;

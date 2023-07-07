import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import swal from "sweetalert";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
 
  const handleFormSubmit = () => {
    axios
      .post("http://localhost:3001/users/login", data)
      .then((res) => {
        if (res.status == 200) {
          swal(`${res.data.message}`);
          sessionStorage.setItem('token',res.data.token);
          navigate("/movie");
        } else {
          swal(`${res.data.message}`);
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div class="bg-secondry ">
      <p class="display-2 fw-bold text-center">Log-In</p>
      <div class="m-auto bg-light rounded-4 mt-5" style={{ maxWidth: "650px" }}>
        <div class="col-11 m-auto">
          <br />
          <input
            class="form-control mt-3"
            type="text"
            name="email"
            placeholder="Email"
            value={data?.email}
            onChange={(e) => handleChangeInput(e)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <input
            class="form-control mt-3"
            type="password"
            name="password"
            placeholder="Password"
            value={data?.password}
            onChange={(e) => handleChangeInput(e)}

          />

          <div class="d-flex gap-3">
            <button class="btn btn-primary my-5" onClick={handleFormSubmit}>
              Log-in
            </button>
            <button
              class="btn btn-primary my-5"
              onClick={() => navigate("/sign-up")}
            >
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import swal from "sweetalert";
const Sign = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:3001/users/signup", data)
      .then((res) => {
        console.log({ res });
        if (res.data.status) {
          swal(`${res.data.message}`);
          navigate("/");
        } else {
          swal(`${res.message}`);
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
      <p class="display-2 fw-bold text-center">Sign-Up</p>

      <div class="m-auto bg-light rounded-4 mt-5" style={{ maxWidth: "650px" }}>
        <div class="col-11 m-auto">
          <br />
          <input
            class="form-control mt-3"
            type="text"
            name="name"
            placeholder="Name"
            value={data?.name}
            onChange={(e) => handleChangeInput(e)}
          />
          <input
            class="form-control mt-3"
            type="text"
            name="email"
            placeholder="Email"
            value={data?.email}
            onChange={(e) => handleChangeInput(e)}
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
              Sign-up
            </button>
            <button class="btn btn-primary my-5" onClick={() => navigate("/")}>
              Log-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;

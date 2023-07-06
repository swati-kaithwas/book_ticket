import React from "react";
import './Style.css'
import { useNavigate } from "react-router";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate()

  let token = sessionStorage.getItem("token");
  const logout=()=>{
    sessionStorage.clear("token");
    swal("User Logout!!");
    navigate('/')
  }
  return (
     
    <div  class='mainNav'>
      <div>
      <img
            src={require("../Logo/icon.jpg")}
            style={{ height: "45px", cursor: "pointer", marginLeft: "30px"}}
            alt="logo"
            onClick={()=>navigate('/car')}
          />
      </div>
      <div>
        <div class='navPc'>
            <div class="d-flex gap-5 mx-5">
                <p class='fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/movie')}>Movie</p>
                {/* <p class='fw-bold' style={{cursor:'pointer'}}  onClick={()=>navigate('/add-car')}>Add Cars</p> */}
                <p class='fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/sign-up')}>SignUp</p>
                <p class='fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/')}>Login</p>
                {token?<p class='fw-bold' style={{cursor:'pointer'}} onClick={logout} >Logout</p>:""}
            </div>
        </div>
        <div class='navMobile'>
            <button class='btn' data-bs-toggle="offcanvas" href="#offcanvasNav" role="button" aria-controls="offcanvasNav"><i class="bi bi-list"></i></button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNav" aria-labelledby="offcanvasNav" style={{background:'#e3f2fd'}}>
            <div class="offcanvas-header" >
              <div>
              <img
            src={require("../Logo/icon.jpg")}
            style={{ height: "45px", cursor: "pointer", marginLeft: "30px"}}
            alt="logo"
            onClick={()=>navigate('/car')}
            data-bs-dismiss="offcanvas" aria-label="Close"
          />
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body" style={{background:'#e3f2fd'}}>
              <div class='col-10 m-auto'>
              <p class='fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/movie')} data-bs-dismiss="offcanvas" aria-label="Close">Movie</p>
                {/* <p class='fw-bold' style={{cursor:'pointer'}}  onClick={()=>navigate('/add-car')} data-bs-dismiss="offcanvas" aria-label="Close" >Add Cars</p> */}
                <p class='fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/sign-up')} data-bs-dismiss="offcanvas" aria-label="Close">SignUp</p>
                <p class='fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/')} data-bs-dismiss="offcanvas" aria-label="Close">Login</p>
                 {token?<p class='fw-bold' style={{cursor:'pointer'}} onClick={logout} data-bs-dismiss="offcanvas" aria-label="Close">Logout</p>:""}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;

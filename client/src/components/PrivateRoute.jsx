import { Navigate } from "react-router-dom";
import swal from "sweetalert";
export const PrivateRoute = ({ children }) => {
  
    let token = sessionStorage.getItem("token");
  
    if (!token) {
        swal("Please Login First");
      return <Navigate to="/" />;
    }
  
    return <>{children}</>;
  };
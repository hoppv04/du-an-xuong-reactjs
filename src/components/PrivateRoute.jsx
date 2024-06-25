import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const role = JSON.parse(localStorage.getItem("user"))?.user?.role;
  return role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
  return accessToken ? (
    <>
      <h2>Hello Admin</h2>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default LayoutAdmin;

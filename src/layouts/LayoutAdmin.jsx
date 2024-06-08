import { Navigate, Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? (
    <>
      <h2>Hello Admin</h2>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default LayoutAdmin;

import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <>
      <h2>Hello Admin</h2>
      <Outlet />
    </>
  );
};

export default LayoutAdmin;

import { Link, Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <>
      <div className="d-flex justify-center aligns-center p-3">
        <h2>Hello</h2>
        <Link to="/" className="btn btn-primary ms-2">
          Back
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default LayoutAdmin;

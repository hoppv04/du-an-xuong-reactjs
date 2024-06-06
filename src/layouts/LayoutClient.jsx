import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <div className="mt-header">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutClient;

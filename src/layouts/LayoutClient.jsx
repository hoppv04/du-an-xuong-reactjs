import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutClient;

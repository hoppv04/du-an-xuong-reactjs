/* eslint-disable react/prop-types */
import Header from "../components/Header";

const LayoutClient = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  );
};

export default LayoutClient;

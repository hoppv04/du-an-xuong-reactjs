import { useContext } from "react";
import ProductItem from "../components/productItem/ProductItem";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { products } = useContext(AppContext);

  return (
    <>
      <div className="container mt-header">
        <div className="row">
          {products.map((product, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

import { useContext } from "react";
import ProductItem from "../components/ProductItem/ProductItem";
import { ProductContext } from "../contexts/ProductContext";

const Home = () => {
  const {
    state: { products },
  } = useContext(ProductContext);

  return (
    <>
      <div className="container">
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

import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Home = ({ data }) => {
  return (
    <>
      <div className="container mt-header">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {data.map(({ id, title, brand, price, thumbnail }) => (
            <div className="col" key={id}>
              <div className="card h-100">
                <Link to={`/product-detail/${id}`}>
                  <img src={thumbnail} className="card-img-top" alt={title} />
                </Link>
                <div className="card-body">
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/product-detail/${id}`}
                  >
                    <h5 className="card-title">{title}</h5>
                  </Link>
                  <p className="card-text m-0">{brand}</p>
                  <p className="card-text">{price}$</p>
                  <button className="btn btn-primary">Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

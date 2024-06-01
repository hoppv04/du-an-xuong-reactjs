import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const { title, brand, price, description, thumbnail } = product;
  return (
    <>
      <div className="container d-flex">
        <img src={thumbnail} alt={title} />
        <div className="content">
          <h2>{title}</h2>
          <p className="m-0">
            <strong>Brand: </strong>
            {brand}
          </p>
          <p>
            <strong>Price: </strong>
            {price}$
          </p>
          <p>{description}</p>
          <button className="btn btn-secondary">Buy now</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

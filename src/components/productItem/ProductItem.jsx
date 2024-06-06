import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import Button from "./../Button/Button";

const ProductItem = ({ product: { id, title, thumbnail, brand, price } }) => {
  return (
    <>
      <div className={styles.productItem}>
        <Link to={`/product-detail/${id}`}>
          <img src={thumbnail} className="card-img-top" alt={title} />
        </Link>
        <div className={styles.content}>
          <Link className={styles.title} to={`/product-detail/${id}`}>
            <p>{title}</p>
          </Link>
          <p className={styles.text}>{brand}</p>
          <p className={styles.text}>{price}$</p>
          <Button>Add to cart</Button>
        </div>
      </div>
    </>
  );
};

export default ProductItem;

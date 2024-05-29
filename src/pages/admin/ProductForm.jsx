import { useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="container mt-header d-flex flex-column justify-content-center align-items-center">
        <h2>{id ? "Edit product" : "Add a new product"}</h2>
        <form className="w-50 border border-secondary-subtle p-3 rounded-1 shadow mt-2">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input type="text" className="form-control" id="title" />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input type="text" className="form-control" id="price" />
          </div>

          {id ? (
            <button className="btn btn-warning w-100">Update</button>
          ) : (
            <button className="btn btn-info w-100">Add</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

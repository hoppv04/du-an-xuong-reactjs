import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./../../context/AppContext";

const Dashboard = () => {
  const { products, handleDeleteProduct } = useContext(AppContext);

  return (
    <>
      <div className="row">
        <div className="col-2 border-end">
          <ul className="nav flex-column h-100">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/admin">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/admin/categories"
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/admin/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-10 p-4">
          <Link to="/admin/product-form" className="btn btn-info mb-2">
            Add +
          </Link>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Thumbnail</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ id, title, price, thumbnail }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{title}</td>
                  <td>{price}$</td>
                  <td>
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={title}
                        style={{ width: "150px" }}
                      />
                    ) : (
                      "No thumbnail"
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/admin/product-form/${id}`}
                      className="btn btn-warning me-2 btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

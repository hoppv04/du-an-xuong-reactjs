/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Dashboard = ({ data }) => {
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
          <button className="btn btn-info mb-2">Add +</button>
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
              {data.map(({ id, title, price, thumbnail }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{title}</td>
                  <td>{price}$</td>
                  <td>
                    <img
                      src={thumbnail}
                      alt={title}
                      style={{ width: "150px" }}
                    />
                  </td>
                  <td>
                    <button className="btn btn-warning me-2 btn-sm">
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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

import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    if (confirm("Logout?")) {
      localStorage.clear();
      nav("/");
    }
  };
  return (
    <>
      <nav className={styles.headerNav}>
        {user ? (
          <div className={styles.logged}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="about">About</Link>
              </li>
            </ul>
            <div className={styles.userBox}>
              <p className={styles.userName}>
                Hello: {user?.user?.email.split("@")[0]}
              </p>
              {user?.user?.role === "admin" && (
                <Link to="/admin" className="btn btn-secondary ms-2">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-danger ms-2">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="login">Login</Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </>
  );
};

export default Header;

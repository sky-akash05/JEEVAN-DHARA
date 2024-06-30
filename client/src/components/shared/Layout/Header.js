import React from "react"; // Importing React library
import { BiDonateBlood, BiUserCircle } from "react-icons/bi"; // Importing icons from react-icons
import { useNavigate, useLocation, Link } from "react-router-dom"; // Importing navigation and location hooks from react-router-dom
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux

const Header = () => {
  const { user } = useSelector((state) => state.auth); // Getting user data from Redux store
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get current location

  // Logout handler
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    alert("Logout Successfully"); // Show logout alert
    navigate("/login"); // Navigate to login page
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ">
          <div className="navbar-brand h1 ">
            <BiDonateBlood color="red" /> Blood Bank App {/* App logo and name */}
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome{" "}
                {user?.name || user?.hospitalName || user?.organisationName} {/* Display user name */}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span> {/* Display user role */}
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? ( // Conditional rendering based on current path
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics {/* Link to Analytics page */}
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">
                  Home {/* Link to Home page */}
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout {/* Logout button */}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  function logout() {
    // Clear user data
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  // Handle search form submission
  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a search results page, passing the query as a URL parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Optional: Clear the search field after submission
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to={user ? "/home" : "/login"}>
        Hotel Booking
      </Link>
      <div className="collapse navbar-collapse justify-content-between">
        <div className="navbar-nav">
          {user && (
            <Link className="nav-item nav-link" to="/home">
              Home
            </Link>
          )}
        </div>
        <div className="navbar-nav">
          {user && (
            <Link className="nav-item nav-link" to="/admin">
              AdminDashboard
            </Link>
          )}
        </div>
        {/* Adjusted search form alignment */}
        <div className="mx-auto">
          <form className="form-inline" onSubmit={handleSearch}>
            <label htmlFor="searchInput" className="mr-2">
              Search:
            </label>
            <input
              id="searchInput"
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search hotels"
              aria-label="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* Navbar links for login/logout */}
        <div className="navbar-nav">
          {user ? (
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="nav-item nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-item nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

const Navbar = ({ auth, logout }) => {
  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  const { isAuthenticated } = auth;

  const authLinks = (
    <ul className="flex">
      <button
        className="text-lg ml-2 cursor-pointer"
        onClick={(e) => handleClick(e)}
      >
        Logout
      </button>
      <li className="text-lg ml-2">
        <Link to={"/users/me"}>My Profile</Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="flex">
      <li className="text-lg ml-2">
        <Link to={"/register"}>Register</Link>
      </li>
      <li className="text-lg ml-2">
        <Link to={"/login"}>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <span className="text-3xl">
          <Link to={"/"} exact>
            Home
          </Link>
        </span>
      </div>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

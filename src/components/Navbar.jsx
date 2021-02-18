import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

const Navbar = ({ logout }) => {
  const handleClick = (e) => {
    console.log("logout!");
    e.preventDefault();
    logout();
  };

  return (
    <nav className="flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <span className="text-3xl">
          <Link to={"/"} exact>
            Home
          </Link>
        </span>
      </div>
      <ul className="flex">
        <li className="text-lg ml-2">
          <Link to={"/register"}>Register</Link>
        </li>
        <li className="text-lg ml-2">
          <Link to={"/login"}>Login</Link>
        </li>
        <a
          className="text-lg ml-2 cursor-pointer"
          onClick={(e) => handleClick(e)}
          href="#"
        >
          <span>Logout</span>
        </a>
        <li className="text-lg ml-2">
          <Link to={"/profile"}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default connect(null, { logout })(Navbar);

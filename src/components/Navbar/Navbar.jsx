import { Link } from "react-router-dom";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const navLinks = (
    <>
      <li>
        <Link to="/request-donation">Request Donation</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {user && (
        <li>
          <Link to="/fundings">Fundings</Link>
        </li>
      )}
    </>
  );
  const handleLogOut = () => {
    logoutUser()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  console.log(dropdown);
  return (
    <div className="my-6 mx-6 lg:mx-18">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-bold">
            BloodHelp
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end relative">
          {user ? (
            <div onClick={() => setDropdown(!dropdown)}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user?.photoURL}
                alt=""
              />
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
          {dropdown && (
            <div
              onClick={() => setDropdown(false)}
              className="bg-base-200 w-36 h-48 absolute top-11 z-10 rounded-lg"
            >
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogOut} className="btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

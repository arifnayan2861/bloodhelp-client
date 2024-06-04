import { useState } from "react";
import {
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUtensils,
  FaAlignJustify,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  const [sidebar, setSidebar] = useState(false);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex">
      <div
        className="absolute block md:hidden"
        onClick={() => setSidebar(!sidebar)}
      >
        <FaAlignJustify size={30} className="mt-7 ml-7" />
      </div>
      {/* dashboard side bar */}
      {sidebar && (
        <div className="w-64 min-h-screen bg-orange-400 md:block">
          {/* <div onClick={() => setSidebar(false)}>
            <FaAlignJustify size={30} className="mt-10 ml-7" />
          </div> */}
          <ul className="menu px-4 pt-20">
            {userInfo.role === "admin" ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-users">
                    <FaUtensils></FaUtensils>
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-blood-donation-requests">
                    <FaList></FaList>
                    Blood Donation Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/content-management">
                    <FaBook></FaBook>
                    Manage contents
                  </NavLink>
                </li>
              </>
            ) : userInfo.role === "donor" ? (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaHome></FaHome>
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/create-donation-request">
                    <FaCalendar></FaCalendar>
                    Create Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-donation-requests">
                    <FaShoppingCart></FaShoppingCart>
                    My Donation Requests
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/donorHome">
                    <FaHome></FaHome>
                    Volunteer Home
                  </NavLink>
                </li>
              </>
            )}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/salad">
                <FaSearch></FaSearch>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/contact">
                <FaEnvelope></FaEnvelope>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

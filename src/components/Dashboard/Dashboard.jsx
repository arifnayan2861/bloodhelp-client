import { useState } from "react";
import {
  FaUser,
  FaBook,
  FaHome,
  FaList,
  FaSearch,
  FaMoneyCheck,
  FaAlignJustify,
  FaUserPlus,
} from "react-icons/fa";
import { FaDroplet, FaHandHoldingDroplet } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import logo from "../../../public/logo.jpeg";
import DashBoardMenu from "./DashBoardMenu";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["singleUserInfo", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  const [open, setOpen] = useState(true);
  const adminMenu = [
    { title: "Admin Home", logo: <FaHome />, path: "/dashboard/adminHome" },
    { title: "All Users", logo: <FaUser />, path: "/dashboard/all-users" },
    {
      title: "Blood Donation Requests",
      logo: <FaDroplet />,
      path: "/dashboard/all-blood-donation-requests",
    },
    {
      title: "Manage contents",
      logo: <FaList />,
      path: "/dashboard/content-management",
    },
  ];
  const donorMenu = [
    { title: "Donor Home", logo: <FaHome />, path: "/dashboard/userHome" },
    {
      title: "Create Donation Request",
      logo: <FaUserPlus />,
      path: "/dashboard/create-donation-request",
    },
    {
      title: "My Donation Requests",
      logo: <FaHandHoldingDroplet />,
      path: "/dashboard/my-donation-requests",
    },
  ];
  const volunteerMenu = [
    {
      title: "Volunteer Home",
      logo: <FaHome />,
      path: "/dashboard/volunteerHome",
    },
    {
      title: "Blood Donation Requests",
      logo: <FaDroplet />,
      path: "/dashboard/volunteer/all-blood-donation-requests",
    },
    {
      title: "Manage contents",
      logo: <FaList />,
      path: "/dashboard/volunteer/content-management",
    },
  ];
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
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <FaAlignJustify
          size={20}
          onClick={() => setOpen(!open)}
          className={`absolute cursor-pointer -right-3 top-9 w-7 ${
            !open && "rotate-180"
          }`}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer w-10 h-10 -mt-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-6">
          {userInfo.role === "admin"
            ? adminMenu.map((menu, index) => (
                <DashBoardMenu
                  key={index}
                  path={menu.path}
                  logo={menu.logo}
                  title={menu.title}
                  open={open}
                />
              ))
            : userInfo.role === "donor"
            ? donorMenu.map((menu, index) => (
                <DashBoardMenu
                  key={index}
                  path={menu.path}
                  logo={menu.logo}
                  title={menu.title}
                  open={open}
                />
              ))
            : volunteerMenu.map((menu, index) => (
                <DashBoardMenu
                  key={index}
                  path={menu.path}
                  logo={menu.logo}
                  title={menu.title}
                  open={open}
                />
              ))}
          <div className="divider"></div>
          <DashBoardMenu path="/" logo=<FaHome /> title="Home" open={open} />
          <DashBoardMenu
            path="/donation-requests"
            logo=<FaHandHoldingDroplet />
            title="Donation Requests"
            open={open}
          />
          <DashBoardMenu
            path="/blogs"
            logo=<FaBook />
            title="Blogs"
            open={open}
          />
          <DashBoardMenu
            path="/funding"
            logo=<FaMoneyCheck />
            title="Funding"
            open={open}
          />
          <DashBoardMenu
            path="/search"
            logo=<FaSearch />
            title="Search"
            open={open}
          />
        </ul>
      </div>
      <div className="flex-1 mx-1 md:mx-10 mt-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

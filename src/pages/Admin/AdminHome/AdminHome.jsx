import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);

  useEffect(() => {
    axiosPublic.get("/users").then((res) => setUsers(res.data));
  }, [axiosPublic]);

  useEffect(() => {
    axiosPublic
      .get("/donation-requests")
      .then((res) => setDonationRequests(res.data));
  }, [axiosPublic]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome, {user?.displayName}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <FaUser size={50} className="text-blue-500" />
          <div className="ml-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Total Users
            </h1>
            <p className="text-xl font-semibold text-gray-700">
              {users.length}
            </p>
          </div>
        </div>
        <div className="flex items-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <MdBloodtype size={50} className="text-red-500" />
          <div className="ml-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Donation Requests
            </h1>
            <p className="text-xl font-semibold text-gray-700">
              {donationRequests.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

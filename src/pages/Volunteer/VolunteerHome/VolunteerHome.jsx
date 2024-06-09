import { useEffect, useState } from "react";
import { FaMoneyCheck, FaUser } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const VolunteerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get("/donation-requests")
      .then((res) => setDonationRequests(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get("/get-funds").then((res) => setFunds(res.data));
  }, [axiosSecure]);

  const totalFunds = funds.reduce((total, item) => total + item.amount, 0);

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
        <div className="flex items-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <FaMoneyCheck size={50} className="text-green-500" />
          <div className="ml-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Total Funding
            </h1>
            <p className="text-xl font-semibold text-gray-700">
              {totalFunds} USD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHome;

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

import useAxiosPublic from "../../../hooks/useAxiosPublic";

const DonorHome = () => {
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
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FaUser size={50} />
            <div>
              <h1 className="text-2xl font-semibold">Total Users</h1>
              <p className="text-xl font-semibold">{users.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MdBloodtype size={50} />
            <div>
              <h1 className="text-2xl font-semibold">Donation Requests</h1>
              <p className="text-xl font-semibold">{donationRequests.length}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DonorHome;

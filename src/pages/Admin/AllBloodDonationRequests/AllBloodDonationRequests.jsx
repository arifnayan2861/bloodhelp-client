import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeCircle } from "react-icons/pi";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDonationRequest = () => {
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [actionsDropdownVisible, setActionsDropdownVisible] = useState({});
  const [filter, setFilter] = useState("all");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["userDonationRequests", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/?status=${filter}`);
      return res.data;
    },
  });

  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleActionsDropdown = (id) => {
    setActionsDropdownVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-donation-request/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view-details/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-request/${id}`);

        if (res.status === 200) {
          toast.success("Request deleted successfully!");
          refetch();
        }
      }
    });
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation/status/${id}`, { status });
      refetch();
      toast.success("Donation status updated successfully");
    } catch (error) {
      toast.error("Failed to update donation status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <select
          className="select"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In-progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {data.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Donation Requests</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((request, index) => (
                  <tr key={request._id} className="border-t">
                    <td>{index + 1}</td>
                    <td className="py-2">{request.recipientName}</td>
                    <td className="py-2">
                      {request.recipientDistrict}, {request.recipientUpazila}
                    </td>
                    <td className="py-2">
                      {new Date(request.donationDate).toLocaleDateString()}
                    </td>
                    <td className="py-2">{request.donationTime}</td>
                    <td className="py-2 flex items-center gap-3">
                      {request.status}{" "}
                      {request.status === "inprogress" && (
                        <PiDotsThreeCircle
                          size={30}
                          className="cursor-pointer"
                          onClick={() => toggleDropdown(request._id)}
                        />
                      )}
                    </td>
                    <td className="py-2 space-x-2">
                      {request.status === "inprogress" && (
                        <div className="relative inline-block text-left">
                          {dropdownVisible[request._id] && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() =>
                                  handleStatusUpdate(request._id, "done")
                                }
                              >
                                Done
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() =>
                                  handleStatusUpdate(request._id, "canceled")
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="relative inline-block text-left">
                        <PiDotsThreeCircle
                          size={30}
                          className="cursor-pointer"
                          onClick={() => toggleActionsDropdown(request._id)}
                        />
                        {actionsDropdownVisible[request._id] && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleEdit(request._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleDelete(request._id)}
                            >
                              Delete
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleView(request._id)}
                            >
                              View
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequest;

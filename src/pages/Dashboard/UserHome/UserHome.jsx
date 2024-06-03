import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const UserHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [donationRequests, setDonationRequests] = useState([]);
  const queryClient = useQueryClient();

  //   const {
  //     data: requests = [],
  //     refetch,
  //     isLoading,
  //   } = useQuery({
  //     queryKey: ["donationRequests", user?.email],
  //     queryFn: async () => {
  //       const res = await axiosPublic.get(`/donation-requests/${user?.email}`);
  //       return res.data;
  //     },
  //     onSuccess: (data) => {
  //       setDonationRequests(data.slice(0, 3));
  //     },
  //   });

  useEffect(() => {
    axiosPublic
      .get(`/donation-requests/${user?.email}`)
      .then((res) => setDonationRequests(res.data))
      .catch((err) => console.log(err));
  }, [axiosPublic, user]);

  //   const updateStatusMutation = useMutation(
  //     ({ id, status }) =>
  //       axiosPublic.patch(`/donation-request/${id}`, { status }),
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(["donationRequests", user?.email]);
  //         toast.success("Status updated successfully");
  //       },
  //       onError: () => {
  //         toast.error("Failed to update status");
  //       },
  //     }
  //   );

  //   const deleteMutation = useMutation(
  //     (id) => axiosPublic.delete(`/donation-request/${id}`),
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(["donationRequests", user?.email]);
  //         toast.success("Request deleted successfully");
  //       },
  //       onError: () => {
  //         toast.error("Failed to delete request");
  //       },
  //     }
  //   );

  //   const handleUpdateStatus = (id, status) => {
  //     updateStatusMutation.mutate({ id, status });
  //   };

  //   const handleDelete = (id) => {
  //     if (window.confirm("Are you sure you want to delete this request?")) {
  //       deleteMutation.mutate(id);
  //     }
  //   };

  //   const handleEdit = (id) => {
  //     navigate(`/edit-donation-request/${id}`);
  //   };

  //   const handleView = (id) => {
  //     navigate(`/donation-request/${id}`);
  //   };

  //   if (isLoading) {
  //     return (
  //       <div className="flex justify-center items-center">
  //         <span className="loading loading-spinner loading-lg"></span>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.displayName}!</h1>

      {donationRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Recent Donation Requests
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Recipient Name</th>
                <th className="py-2">Location</th>
                <th className="py-2">Donation Date</th>
                <th className="py-2">Donation Time</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests.map((request) => (
                <tr key={request._id} className="border-t">
                  <td className="py-2">{request.recipientName}</td>
                  <td className="py-2">
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td className="py-2">
                    {new Date(request.donationDate).toLocaleDateString()}
                  </td>
                  <td className="py-2">{request.donationTime}</td>
                  <td className="py-2">{request.status}</td>
                  <td className="py-2 space-x-2">
                    {request.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-success"
                          //   onClick={() =>
                          //     handleUpdateStatus(request._id, "done")
                          //   }
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-danger"
                          //   onClick={() =>
                          //     handleUpdateStatus(request._id, "canceled")
                          //   }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-warning"
                      //   onClick={() => handleEdit(request._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error"
                      //   onClick={() => handleDelete(request._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info"
                      //   onClick={() => handleView(request._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/my-donation-requests")}
            >
              View My All Requests
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;

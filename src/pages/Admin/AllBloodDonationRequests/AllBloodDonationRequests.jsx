import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AllBloodDonationRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  //   const navigate = useNavigate();
  const [donationRequests, setDonationRequests] = useState([]);
  //   const queryClient = useQueryClient();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["donationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation-requests");
      return res.data;
    },
    onSuccess: (data) => {
      setDonationRequests(data.slice(0, 3));
    },
  });

  useEffect(() => {
    axiosPublic
      .get(`/donation-requests/${user?.email}`)
      .then((res) => setDonationRequests(res.data))
      .catch((err) => console.log(err));
  }, [axiosPublic, user]);

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
        const res = await axiosPublic.delete(`/donation-request/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your request has been deleted.",
            icon: "success",
          });
          //   toast.success("Request deleted successfully!");
        }
        console.log(res);
      }
    });
  };

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
                      onClick={() => handleDelete(request._id)}
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
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequests;

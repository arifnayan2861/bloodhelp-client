import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DonationRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["pendingRequests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation-requests");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const pendingRequests = data.filter((item) => item.status === "pending");

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Donation Requests</h2>
      <div>
        {data.length > 0 && (
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Recipient Name</th>
                    <th>Location</th>
                    <th>Donation Date</th>
                    <th>Donation Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request, index) => (
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
                        <button
                          onClick={() =>
                            navigate(`/view-details/${request._id}`)
                          }
                          className="btn btn-outline btn-info"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;

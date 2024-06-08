import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Fundings = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: funds, isLoading } = useQuery({
    queryKey: ["allFunds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get-funds");
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
  return (
    <div className="my-6 mx-6 lg:mx-18">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund, index) => (
            <tr key={fund._id} className="border-t">
              <td>{index + 1}</td>
              <td className="py-2">{fund.name}</td>
              <td className="py-2">{fund.amount}</td>
              <td className="py-2">
                {new Date(fund.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate("/make-fund")}
          className="btn btn-success"
        >
          Give Fund
        </button>
      </div>
    </div>
  );
};

export default Fundings;

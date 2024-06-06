import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DonationDetails = () => {
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["singleRequest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/edit-donation-request/${id}`);
      return res.data;
    },
  });

  const onSubmit = async () => {
    try {
      await axiosPublic.patch(`/donation/status/${id}`, {
        status: "inprogress",
      });
      setModal(false);
      toast.success("User status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  //   console.log(user);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Donation Request Details</h2>
      <div className="space-y-2">
        <p className="font-semibold">Recipient Name: {data.recipientName}</p>
        <p className="font-semibold">
          Recipient District: {data.recipientDistrict}
        </p>
        <p className="font-semibold">
          Recipient Upazila: {data.recipientUpazila}
        </p>
        <p className="font-semibold">Address Line: {data.addressLine}</p>
        <p className="font-semibold">Hospital Name: {data.hospitalName}</p>
        <p className="font-semibold">Donation Date: {data.donationDate}</p>
        <p className="font-semibold">Donation Time: {data.donationTime}</p>
        <p className="font-semibold">Request Message: {data.requestMessage}</p>
        <p className="font-semibold">Requester Name: {data.requesterName}</p>
        <p className="font-semibold">Requester Email: {data.requesterEmail}</p>
        <p className="font-semibold">Status: {data.status}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setModal(true)}
          className="btn btn-outline btn-info"
        >
          Donate
        </button>
      </div>
      {modal && (
        <div className="flex justify-center items-center">
          <div className="bg-base-300 z-10 w-[70vh] h-[70vh] absolute top-20 rounded-xl">
            <div className="flex justify-end p-4">
              <MdCancel onClick={() => setModal(false)} size={30} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Name</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Recipient Name"
                  className="input input-bordered"
                  defaultValue={user?.displayName}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Name</span>
                </label>
                <input
                  type="text"
                  {...register("email")}
                  placeholder="Recipient Name"
                  className="input input-bordered"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
              <div className="flex justify-center mt-16">
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const onSubmit = async (data) => {
    const donationRequest = {
      requesterName: userInfo.name,
      requesterEmail: userInfo.email,
      recipientName: data.recipientName,
      bloodGroup: data.bloodGroup,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      addressLine: data.addressLine,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post(
        "/create-donation-request",
        donationRequest
      );
      if (res.status === 200) {
        reset();
        toast.success("Donation request created successfully!");
      } else {
        toast.error("Failed to create donation request.");
      }
    } catch (error) {
      console.error("Error creating donation request:", error);
      toast.error("An error occurred while creating the donation request.");
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
      <h2 className="text-xl font-semibold mb-4">Create Donation Request</h2>
      {userInfo.status === "blocked" ? (
        <></>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              type="text"
              defaultValue={userInfo.name}
              className="input input-bordered"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              type="email"
              defaultValue={userInfo.email}
              className="input input-bordered"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              {...register("recipientName", { required: true })}
              placeholder="Recipient Name"
              className="input input-bordered"
            />
            {errors.recipientName && (
              <span className="text-red-600">Recipient Name is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              {...register("bloodGroup")}
              className="select w-full input-bordered"
            >
              <option value="">Select your District</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && (
              <span className="text-red-600">
                Recipient District is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient District</span>
            </label>
            <select
              {...register("recipientDistrict", { required: true })}
              className="select w-full input-bordered"
            >
              <option value="">Select your District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.recipientDistrict && (
              <span className="text-red-600">
                Recipient District is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Upazila</span>
            </label>
            <select
              {...register("recipientUpazila", { required: true })}
              className="select w-full input-bordered"
            >
              <option value="">Select your Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
            {errors.recipientUpazila && (
              <span className="text-red-600">
                Recipient Upazila is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              type="text"
              {...register("hospitalName", { required: true })}
              placeholder="Hospital Name"
              className="input input-bordered"
            />
            {errors.hospitalName && (
              <span className="text-red-600">Hospital Name is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Address Line</span>
            </label>
            <input
              type="text"
              {...register("addressLine", { required: true })}
              placeholder="Full Address Line"
              className="input input-bordered"
            />
            {errors.addressLine && (
              <span className="text-red-600">
                Full Address Line is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Date</span>
            </label>
            <input
              type="date"
              {...register("donationDate", { required: true })}
              className="input input-bordered"
            />
            {errors.donationDate && (
              <span className="text-red-600">Donation Date is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Time</span>
            </label>
            <input
              type="time"
              {...register("donationTime", { required: true })}
              className="input input-bordered"
            />
            {errors.donationTime && (
              <span className="text-red-600">Donation Time is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Request Message</span>
            </label>
            <textarea
              {...register("requestMessage", { required: true })}
              placeholder="Write your request message here"
              className="textarea textarea-bordered"
            />
            {errors.requestMessage && (
              <span className="text-red-600">Request Message is required</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateDonationRequest;

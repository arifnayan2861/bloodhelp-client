import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditDonationRequest = () => {
  const [donationRequest, setDonationRequest] = useState({});
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get(`/edit-donation-request/${id}`)
      .then((res) => setDonationRequest(res.data));
  }, [axiosPublic, id]);

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

  const {
    recipientName,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    addressLine,
    donationDate,
    donationTime,
    requestMessage,
  } = donationRequest;

  //   console.log(donationRequest);

  const handleUpdate = async (data) => {
    const updatedRequest = {
      recipientName: data.recipientName,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      addressLine: data.addressLine,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
    };
    const res = await axiosPublic.patch(
      `/edit-donation-request/${id}`,
      updatedRequest
    );
    if (res.data.modifiedCount > 0) {
      toast.success("Information updated successfully!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdate)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipient Name</span>
          </label>
          <input
            type="text"
            {...register("recipientName")}
            defaultValue={recipientName}
            placeholder="Recipient Name"
            className="input input-bordered"
          />
          {/* {errors.recipientName && (
            <span className="text-red-600">Recipient Name is required</span>
          )} */}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipient District</span>
          </label>
          <select
            {...register("recipientDistrict")}
            className="select w-full input-bordered"
            defaultValue={recipientDistrict}
          >
            <option value="null">Select your District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          {/* {errors.recipientDistrict && (
            <span className="text-red-600">Recipient District is required</span>
          )} */}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipient Upazila</span>
          </label>
          <select
            {...register("recipientUpazila")}
            className="select w-full input-bordered"
            defaultValue={recipientUpazila}
          >
            <option value="">Select your Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
          {/* {errors.recipientUpazila && (
            <span className="text-red-600">Recipient Upazila is required</span>
          )} */}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Hospital Name</span>
          </label>
          <input
            type="text"
            {...register("hospitalName")}
            placeholder="Hospital Name"
            className="input input-bordered"
            defaultValue={hospitalName}
          />
          {/* {errors.hospitalName && (
            <span className="text-red-600">Hospital Name is required</span>
          )} */}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Address Line</span>
          </label>
          <input
            type="text"
            {...register("addressLine")}
            placeholder="Full Address Line"
            className="input input-bordered"
            defaultValue={addressLine}
          />
          {/* {errors.addressLine && (
            <span className="text-red-600">Full Address Line is required</span>
          )} */}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Donation Date</span>
          </label>
          <input
            type="date"
            {...register("donationDate")}
            className="input input-bordered"
            defaultValue={donationDate}
          />
          {/* {errors.donationDate && (
            <span className="text-red-600">Donation Date is required</span>
          )} */}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Donation Time</span>
          </label>
          <input
            type="time"
            {...register("donationTime")}
            className="input input-bordered"
            defaultValue={donationTime}
          />
          {/* {errors.donationTime && (
            <span className="text-red-600">Donation Time is required</span>
          )} */}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Request Message</span>
          </label>
          <textarea
            {...register("requestMessage")}
            placeholder="Write your request message here"
            className="textarea textarea-bordered"
            defaultValue={requestMessage}
          />
          {/* {errors.requestMessage && (
            <span className="text-red-600">Request Message is required</span>
          )} */}
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;

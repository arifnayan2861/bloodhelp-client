import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
  const [disabledField, setDisabledField] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  // console.log(userInfo);

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

  useEffect(() => {
    // Set form values when donationRequest is updated
    if (userInfo) {
      setValue("name", userInfo.name);
      setValue("photoURL", userInfo.photoURL);
      setValue("email", userInfo.email);
      setValue("bloodGroup", userInfo.bloodGroup);
      setValue("district", userInfo.district);
      setValue("upazila", userInfo.upazila);
    }
  }, [userInfo, setValue]);

  const handleUpdate = async (data) => {
    const updatedUserInfo = {
      name: data.name,
      photoURL: data.photoURL,
      bloodGroup: data.bloodGroup,
      address: {
        district: data.district,
        upazila: data.upazila,
      },
    };
    const updatedUser = await axiosSecure.patch(
      `/user/${user?.email}`,
      updatedUserInfo
    );
    console.log(updatedUser.data);
    if (updatedUser.data.modifiedCount > 0) {
      // show success popup
      // reset();
      toast.success("User info updated successfully!");
      setDisabledField(true);
      refetch();
    } else {
      console.log("error");
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
    <div>
      <form onSubmit={handleSubmit(handleUpdate)} className="card-body">
        <div className="mt-8">
          <FaEdit
            onClick={() => setDisabledField(!disabledField)}
            className="mx-auto cursor-pointer"
            size={30}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Name"
            className="input input-bordered"
            defaultValue={userInfo.name}
            disabled={disabledField}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            {...register("photoURL", { required: true })}
            placeholder="Photo URL"
            className="input input-bordered"
            defaultValue={userInfo.photoURL}
            disabled={disabledField}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            name="email"
            placeholder="email"
            className="input input-bordered"
            defaultValue={userInfo.email}
            readOnly
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            {...register("bloodGroup")}
            defaultValue={userInfo.bloodGroup}
            className="select w-full input-bordered"
            disabled={disabledField}
          >
            <option disabled value="null">
              Select your Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <select
            {...register("district")}
            defaultValue={userInfo.address?.district}
            className="select w-full input-bordered"
            disabled={disabledField}
          >
            <option disabled value="null">
              Select your District
            </option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <select
            {...register("upazila")}
            defaultValue={userInfo.address?.upazila}
            className="select w-full input-bordered"
            disabled={disabledField}
          >
            <option disabled value="null">
              Select your Upazila
            </option>
            {upazilas.map((upazila) => (
              <option key={upazila.id}>{upazila.name}</option>
            ))}
          </select>
        </div>

        <div className="form-control mt-6">
          <button
            disabled={disabledField}
            className="btn btn-primary"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;

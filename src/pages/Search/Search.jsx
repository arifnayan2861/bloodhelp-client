import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// const fetchDistricts = async () => {
//   const res = await fetch("/districts.json");
//   return res.json();
// };

// const fetchUpazilas = async () => {
//   const res = await fetch("/upazilas.json");
//   return res.json();
// };

const fetchDonors = async ({ queryKey }) => {
  const [, params] = queryKey;
  console.log(params);
  const res = await axios.get("/search-donors", { params });
  return res.data;
};

const SearchDonors = () => {
  const axiosPublic = useAxiosPublic();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { register, handleSubmit } = useForm();
  const [searchParams, setSearchParams] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const {
    data: searchResultsData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donors", searchParams],
    queryFn: fetchDonors,
    enabled: !!searchParams,
    // onSuccess: (data) => {
    //   if (data.length === 0) {
    //     toast.error("No donors found for the given criteria.");
    //   }
    // },
    // onError: (error) => {
    //   console.error(error);
    //   toast.error("An error occurred while searching for donors.");
    // },
  });

  useEffect(() => {
    setSearchResults(searchResultsData || []);
  }, [searchResultsData]);

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

  const handleSearch = (data) => {
    setSearchParams(data);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Search for Donors
      </h1>
      <form onSubmit={handleSubmit(handleSearch)} className="mb-6 space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            {...register("bloodGroup")}
            className="select w-full input-bordered"
          >
            <option value="">Select Blood Group</option>
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
            className="select w-full input-bordered"
          >
            <option value="">Select District</option>
            {districts?.map((district) => (
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
            className="select w-full input-bordered"
          >
            <option value="">Select Upazila</option>
            {upazilas?.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Search
          </button>
        </div>
      </form>
      <div>
        {searchResults?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Blood Group</th>
                  <th>District</th>
                  <th>Upazila</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {searchResults?.map((donor) => (
                  <tr key={donor.id}>
                    <td>{donor.name}</td>
                    <td>{donor.bloodGroup}</td>
                    <td>{donor.district}</td>
                    <td>{donor.upazila}</td>
                    <td>{donor.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;

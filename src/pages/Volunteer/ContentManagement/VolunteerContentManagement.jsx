import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const VolunteerContentManagement = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?status=${filter}`);
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="btn"
          onClick={() =>
            navigate("/dashboard/volunteer-content-management/add-blog")
          }
        >
          Add Blog
        </button>
        <select
          className="select"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerContentManagement;

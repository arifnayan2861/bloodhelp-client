import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ContentManagement = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");

  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?status=${filter}`);
      return res.data;
    },
  });

  const updateBlogStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/blogs/status/${id}`, { status });
      toast.success(
        `Blog ${
          status === "published" ? "published" : "unpublished"
        } successfully`
      );
      refetch();
    } catch (error) {
      toast.error("Failed to update blog status");
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      toast.success("Blog deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete blog");
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
      <div className="flex justify-between items-center mb-4">
        <button
          className="btn"
          onClick={() => navigate("/dashboard/content-management/add-blog")}
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
              <div className="card-actions justify-end">
                {blog.status === "draft" ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => updateBlogStatus(blog._id, "published")}
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => updateBlogStatus(blog._id, "draft")}
                  >
                    Unpublish
                  </button>
                )}
                <button
                  className="btn btn-error"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;

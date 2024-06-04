import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // const newBlog = { ...data, thumbnail, content, status: "draft" };
    const blog = {
      title: data.title,
      img: data.img,
      content,
      status: "draft",
    };

    try {
      await axiosPublic.post("/blogs", blog);
      toast.success("Blog created successfully");
      navigate("/dashboard/content-management");
    } catch (error) {
      toast.error("Failed to create blog");
    }
    console.log(blog);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Add Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Thumbnail</label>
          <input
            {...register("img", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
          {errors.img && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Content</label>
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBlog;

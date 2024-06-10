import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BlogList = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const filteredBlogs = data.filter((item) => item.status !== "draft");
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Published Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4">{blog.excerpt}</p>
            <Link
              to={`/blogs/${blog._id}`}
              className="text-blue-500 hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

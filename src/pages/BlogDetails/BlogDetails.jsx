import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["singleBlog"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs/${id}`);
      return res.data;
    },
  });
  console.log(data);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <div className="p-6">
        <div className="max-w-screen-md mx-auto">
          <img src={data.img} alt="" />
        </div>
        <h1 className="text-3xl font-bold mb-4 mt-4">{data.title}</h1>
        <div className="text-gray-700 mb-4">{data.content}</div>
      </div>
    </div>
  );
};

export default BlogDetails;

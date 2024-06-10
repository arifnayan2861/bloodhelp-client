import { useQuery } from "@tanstack/react-query";
import { PiDotsThreeCircle } from "react-icons/pi";
import { useState } from "react";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filter, setFilter] = useState("all");
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const updateUserStatus = async (_id, status) => {
    try {
      await axiosSecure.patch(`/user/status/${_id}`, { status });
      toast.success("User status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const updateUserRole = async (_id, role) => {
    try {
      await axiosSecure.patch(`/user/role/${_id}`, { role });
      toast.success("User role updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const filterUsers = (status) => {
    setFilter(status);
  };

  const filteredUsers = users.filter((user) =>
    filter === "all" ? true : user.status === filter
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-8">
        <button onClick={() => filterUsers("active")} className="btn">
          Active
        </button>
        <button onClick={() => filterUsers("blocked")} className="btn">
          Blocked
        </button>
      </div>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="table relative">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>E-mail</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === user._id ? null : user._id
                      )
                    }
                    className="cursor-pointer relative"
                  >
                    <PiDotsThreeCircle size={30} />
                    {activeDropdown === user._id && (
                      <div
                        onClick={() => setActiveDropdown(null)}
                        className="bg-base-200 w-36 h-48 absolute top-8 z-10 rounded-lg"
                      >
                        {user.status === "active" ? (
                          <button
                            onClick={() =>
                              updateUserStatus(user._id, "blocked")
                            }
                            className="btn"
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            onClick={() => updateUserStatus(user._id, "active")}
                            className="btn"
                          >
                            Unblock
                          </button>
                        )}

                        <button
                          onClick={() => updateUserRole(user._id, "admin")}
                          className="btn"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => updateUserRole(user._id, "volunteer")}
                          className="btn"
                        >
                          Make Volunteer
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

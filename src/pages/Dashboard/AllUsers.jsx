import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading";

const AllUsers = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const axiosSecure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get page & limit from URL, fallback to defaults
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;

    // Fetch paginated users
    const { data = {}, refetch, isLoading } = useQuery({
        queryKey: ["users", page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
            return res.data; // should return { users: [], total: number }
        },
    });

    const users = data.users || [];
    const total = data.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Make user admin
    const handleMakeAdmin = async (user) => {

        const confirm = await Swal.fire({
            title: `Make ${user.name} an Admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Make Admin",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/users/admin/${user._id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", `${user.name} is now an admin.`, "success");
                    refetch();
                } else {
                    Swal.fire("Error!", "Could not update user role.", "error");
                }
            } catch (err) {
                console.error(err);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    // Limit select handler
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        setSearchParams({ page: 1, limit: newLimit });
    };

    return (
        <>
        <Helmet>
            <title>
                All Users || Admin || NewsHub
            </title>
        </Helmet>
            <div className="overflow-x-auto bg-base-200 md:pl-70 p-8 px-10">
                <h2 className="text-2xl font-bold mb-6">👥 All Users</h2>

                {/* Limit Selector */}
                <div className="mb-4">
                    <label className="mr-2 font-medium">Users per page:</label>
                    <select value={limit} onChange={handleLimitChange} className="select select-bordered">
                        {[5, 10, 20, 50].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                {isLoading ? (
                    <Loading/>
                ) : (
                    <>
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>#</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={user._id}>
                                        <td>{(page - 1) * limit + idx + 1}</td>
                                        <td>
                                            <img
                                                src={user.photo || "https://via.placeholder.com/40"}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === "admin" ? (
                                                <span className="text-green-600 font-semibold">Admin</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn btn-xs btn-primary text-black"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2 mt-6">
                            <button
                                disabled={page <= 1}
                                onClick={() => setSearchParams({ page: page - 1, limit })}
                                className="btn btn-sm"
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setSearchParams({ page: i + 1, limit })}
                                    className={`btn btn-sm ${page === i + 1 ? "btn-active" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={page >= totalPages}
                                onClick={() => setSearchParams({ page: page + 1, limit })}
                                className="btn btn-sm"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AllUsers;

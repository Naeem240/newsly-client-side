import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading";

const DashboardAllArticles = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const axiosSecure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;

    const { data = {}, refetch, isLoading } = useQuery({
        queryKey: ["allArticles", page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-articles?page=${page}&limit=${limit}`);
            return res.data; // { articles: [], total: number }
        },
    });

    const articles = data.articles || [];
    const total = data.total || 0;
    const totalPages = Math.ceil(total / limit);

    // ✅ Approve handler
    const handleApprove = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Approve this article?",
            icon: "question",
            showCancelButton: true,
        });
        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/articles/approve/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'The Article is ready!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        }
    };

    // ✅ Decline handler with reason
    const handleDecline = async (id) => {
        const { value: reason } = await Swal.fire({
            title: "Decline Article",
            input: "textarea",
            inputLabel: "Reason for Decline",
            inputPlaceholder: "Write your reason here...",
            showCancelButton: true,
        });
        if (reason) {
            await axiosSecure.patch(`/articles/decline/${id}`, { reason });
            Swal.fire({
                icon: 'info',
                title: 'Success!',
                text: 'The Article is Declined!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        }
    };

    // ✅ Make Premium
    const handleMakePremium = async (id) => {
        await axiosSecure.patch(`/articles/premium/${id}`);
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'The Article is Premium Now!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
        refetch();
    };

    // ✅ Delete
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the article.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });
        if (confirm.isConfirmed) {
            await axiosSecure.delete(`/articles/${id}`);
            Swal.fire({
                icon: 'info',
                title: 'Deleted!',
                text: '"The article has been deleted."',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        }
    };

    // ✅ Limit Change
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        setSearchParams({ page: 1, limit: newLimit });
    };

    return (
        <>
        <Helmet>
            <title>All Articles || Admin || NewsHub</title>
        </Helmet>
            <div className="overflow-x-auto bg-base-200 md:pl-70 p-10">
                <h2 className="text-2xl font-bold mb-6">📰 All Articles</h2>

                <div className="mb-4">
                    <label className="mr-2 font-medium">Articles per page:</label>
                    <select value={limit} onChange={handleLimitChange} className="select select-bordered">
                        {[5, 10, 20, 50].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                {isLoading ? (
                    <Loading/>
                ) : (
                    <>
                        <table className="table w-full text-sm">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Email</th>
                                    <th>Photo</th>
                                    <th>Posted Date</th>
                                    <th>Status</th>
                                    <th>Publisher</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article, idx) => (
                                    <tr key={article._id}>
                                        <td>{(page - 1) * limit + idx + 1}</td>
                                        <td>{article.title}</td>
                                        <td>{article.authorName}</td>
                                        <td>{article.authorEmail}</td>
                                        <td>
                                            <img
                                                src={article.authorPhoto || "https://via.placeholder.com/40"}
                                                alt={article.authorName}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td>{new Date(article.postedDate).toLocaleDateString()}</td>
                                        <td>
                                            {article.status === "approved" && (
                                                <span className="text-green-600 font-semibold">Approved</span>
                                            )}
                                            {article.status === "declined" && (
                                                <span className="text-red-600 font-semibold">Declined</span>
                                            )}
                                            {article.status !== "approved" && article.status !== "declined" && (
                                                <span className="text-yellow-600 font-semibold">Pending</span>
                                            )}
                                        </td>
                                        <td>{article.publisher}</td>
                                        <td className="space-y-1 flex flex-col">
                                            <button
                                                onClick={() => handleApprove(article._id)}
                                                className="btn btn-xs btn-success"
                                                disabled={article.status === "approved"}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleDecline(article._id)}
                                                className="btn btn-xs btn-warning"
                                                disabled={article.status === "declined"}
                                            >
                                                Decline
                                            </button>
                                            <button
                                                onClick={() => handleMakePremium(article._id)}
                                                className="btn btn-xs btn-info"
                                                disabled={article.isPremium}
                                            >
                                                Make Premium
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article._id)}
                                                className="btn btn-xs btn-error"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* ✅ Pagination */}
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

export default DashboardAllArticles;

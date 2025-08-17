import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyArticles = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [declineReason, setDeclineReason] = useState("");

    const { data: articles = [], refetch } = useQuery({
        queryKey: ["myArticles", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-articles?email=${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            await axiosSecure.delete(`/articles/${id}`);
            Swal.fire({
                icon: 'Info',
                title: 'Deleted!',
                text: 'Your article has been deleted',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        }
    };

    return (
        <>
            <Helmet>
                <title>My Articles || NewsHub</title>
            </Helmet>
            <div className="overflow-x-auto py-4">
                <h2 className="text-2xl font-bold mb-4">📑 My Articles</h2>
                <table className="table px-4 md:px-6 lg:px-8 mx-auto">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Premium</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, idx) => (
                            <tr key={article._id}>
                                <td>{idx + 1}</td>
                                <td>{article.title}</td>
                                <td>
                                    <span className={`badge ${article.status === "declined" ? 'badge-error' :
                                        article.status === "pending" ?
                                            'badge-info' : 'badge-success'} capitalize`}>{article.status}</span>
                                    {article.status === "declined" && (
                                        <button
                                            onClick={() => setDeclineReason(article.declinedReason)}
                                            className="ml-2 btn btn-xs btn-warning"
                                        >
                                            Why?
                                        </button>
                                    )}
                                </td>
                                <td>{article.isPremium ? <span className="badge badge-success">Yes</span> : <span className="badge badge-error">No</span>}</td>
                                <td className="flex gap-2 flex-wrap">
                                    <Link to={`/article/${article._id}`} className="btn btn-xs btn-info">
                                        Details
                                    </Link>
                                    <Link to={`/update-article/${article._id}`} className="btn btn-xs btn-warning">
                                        Update
                                    </Link>
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

                {/* Decline Reason Modal */}
                <input type="checkbox" id="declineReasonModal" className="modal-toggle" checked={!!declineReason} readOnly />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Decline Reason</h3>
                        <p className="py-4">{declineReason}</p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setDeclineReason("")}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyArticles;

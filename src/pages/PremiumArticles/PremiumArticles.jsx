import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import usePremium from "../../hooks/usePremium";
import { Navigate, Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const PremiumArticles = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const axiosSecure = useAxiosSecure();
    // const isPremium = usePremium();
    const { user, loading } = useAuth();

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["premiumArticles"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/premium");
            return res.data;
        },
    });

    // Get DB user info when user logs in
    const { data: users = {}, isLoading: usersLoading } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email, // Only run when we have user
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });    

    const isPremium = !!users?.premiumTaken;

    if (isLoading || usersLoading || loading) {
        return <Loader />;
    }

    if (!isPremium) {
        Swal.fire("To Visit Premium Articles. Please subscribe!");
        return <Navigate to="/subscription" replace />;
    }

    return (
        <>
        <Helmet>
            <title>Premium Articles || NewsHub</title>
        </Helmet>
            <div className="px-4 md:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold mb-6">✨ Premium Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div key={article._id} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{article.title}</h2>
                                <p className="text-sm text-gray-500 mb-2">{article.publisher}</p>
                                <p>{article.description.slice(0, 100)}...</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/article/${article._id}`} className="btn btn-primary text-black btn-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PremiumArticles;

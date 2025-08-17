import { useParams, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const ArticleDetails = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    // const { isPremium, loading } = useAuth();

    // Get DB user info when user logs in
    const { data: users = {}, isLoading: usersLoading } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email, // Only run when we have user
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });




    // Get article
    const { data: article, error, isLoading } = useQuery({
        queryKey: ["article", id],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/${id}`);
            return res.data;
        },
    });

    // Increment views
    useEffect(() => {
        window.scrollTo(0, 0);
        if (article?._id) {
            axiosSecure.patch(`/articles/${id}`);
        }
    }, [article?._id, id, axiosSecure]);

    const isPremium = !!users?.premiumTaken;

    // //console.log(isPremium);




    if (isLoading || loading || usersLoading) return <>
        <Helmet>
            <title>Article Details || NewsHub</title>
        </Helmet>
        <Loading />
    </>;
    if (error) return <div>Error loading article.</div>;

    if (article?.isPremium && !isPremium) {
        Swal.fire("This is a premium article. Please subscribe!");
        return <Navigate to="/subscription" replace />;
    }

    // Check premium access

    return (
        <>
            <Helmet>
                <title>Article Details || NewsHub</title>
            </Helmet>
            <div className="px-4 md:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold mb-4">{article?.title}</h2>
                <img
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-auto  mb-6 object-cover"
                />
                <div className="mb-2 text-gray-300">
                    Publisher: <span className="font-medium">{article?.publisher}</span>
                </div>
                <div className="mb-2 text-gray-200">Views: {article?.views}</div>
                <div className="mb-6">
                    {article?.tags?.map((tag, idx) => (
                        <span
                            key={idx}
                            className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <p className="leading-relaxed text-lg text-justify">{article?.description}</p>
            </div>
        </>
    );
};

export default ArticleDetails;

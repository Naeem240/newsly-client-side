import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const AllArticles = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // fetch publishers for dropdown
    const { data: publishers = [], isLoading } = useQuery({
        queryKey: ["publishers"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/publishers");
            return res.data;
        },
    });



    // fetch articles (with filters)
    const { data: articles = [], refetch } = useQuery({
        queryKey: ["articles", searchText, selectedPublisher, selectedTags],
        enabled: !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/articles", {
                    params: {
                        search: searchText,
                        publisher: selectedPublisher,
                        tags: selectedTags.map(tag => tag.value).join(","),
                    },
                });
                return res.data;
            }
            catch (err) {
                Swal.fire("Error", "Failed to fetch articles", err.message);
                return [];
            }
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

    const tagOptions = [
        { value: "politics", label: "Politics" },
        { value: "technology", label: "Technology" },
        { value: "sports", label: "Sports" },
        { value: "health", label: "Health" },
        { value: "finance", label: "Finance" },
    ];

    const handleSearch = e => {
        e.preventDefault();
        refetch(); // manually refetch with new filters
    };

    const handleSearchInputChange = async (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.length > 1) {
            try {
                const res = await axiosSecure.get("/article-suggestions", {
                    params: { search: value },
                });
                setSuggestions(res.data);
            } catch (err) {
                console.error(err);
            }
        } else {
            setSuggestions([]);
        }
    };

    if (isLoading || usersLoading || loading) return <>
        <Helmet>
            <title>All Articles || NewsHub</title>
        </Helmet>
        <Loader />
    </>;

    return (
        <>
            <Helmet>
                <title>All Articles</title>
            </Helmet>

            <div className="px-4 md:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-3xl font-bold mb-6 text-primary">📰 All Articles</h2>

                {/* Filters */}
                <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchText}
                        onChange={handleSearchInputChange}
                        className="input input-bordered w-full md:w-1/3"
                    />
                    {suggestions.length > 0 && (
                        <ul className="bg-base-200 rounded shadow absolute top-10 left-0 z-10 w-full md:w-1/3">
                            {suggestions.map(s => (
                                <li
                                    key={s._id}
                                    className="p-2 hover:bg-base-100 cursor-pointer text-left border-b flex items-center gap-4"
                                    onClick={() => window.location.href = `/article/${s._id}`}
                                >
                                    <img className="w-15" src={s.image} alt='h' />
                                    {s.title}
                                </li>
                            ))}
                        </ul>
                    )}

                    <select
                        value={selectedPublisher}
                        onChange={e => {
                            setSelectedPublisher(e.target.value);
                            refetch();
                        }}
                        className="select select-bordered w-full md:w-1/4"
                    >
                        <option value="">All Publishers</option>
                        {publishers.map(pub => (
                            <option key={pub._id} value={pub.name}>{pub.name}</option>
                        ))}
                    </select>

                    <div className="w-full md:w-1/3">
                        <Select
                            isMulti
                            options={tagOptions}
                            value={selectedTags}
                            onChange={(newTags) => {
                                setSelectedTags(newTags);
                                refetch();
                            }}
                            placeholder="Filter by tags"
                            className="text-black"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary text-black w-full md:w-auto">Filter</button>
                </form>

                {/* Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map(article => (
                        <div key={article._id} className={`card ${article.isPremium ? 'border-2 border-yellow-400' : 'shadow-md border-2 border-primary'}`}>
                            <figure>
                                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title">{article.title}</h3>
                                <p className="text-gray-400">{article.description.slice(0, 80)}...</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm text-gray-200">Publisher: {article.publisher}</span>
                                    {article.isPremium && (
                                        <span className="badge badge-warning">Premium</span>
                                    )}
                                </div>
                                <button
                                    disabled={article.isPremium && !users?.premiumTaken}
                                    onClick={() => navigate(`/article/${article._id}`)}
                                    className={`btn mt-3 rounded-none ${article.isPremium && !users?.premiumTaken ? 'btn-disabled' : 'btn-primary text-black'}`}
                                >
                                    View Details
                                </button>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllArticles;

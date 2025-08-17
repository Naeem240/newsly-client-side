import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import NewsHubLogo from "./NewsHubLogo";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";

const Navbar = () => {
    const { user, logOut, isPremium, setIsPremium, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isAdmin, setIsAdmin] = useState(false); // Replace with actual logic from DB or API
    const [menuOpen, setMenuOpen] = useState(false);

    // Get DB user info when user logs in
    const { data: users = {}, isLoading } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email, // Only run when we have user
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    // Dummy values — Replace with actual role/subscription fetch logic
    useEffect(() => {
        if (users?.role === "admin") setIsAdmin(true);
        if (users?.premiumTaken) setIsPremium(true); // Replace with actual subscription check
    }, [users, setIsPremium, setIsAdmin]);

    const handleLogout = async () => {
        try {
            await logOut();
            Swal.fire({
                icon: 'info',
                title: 'Log Out!',
                text: 'Log Out Successful!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            {
                user && user?.email && <li><NavLink to="/add-article">Add Articles</NavLink></li>
            }
            <li><NavLink to="/articles">All Articles</NavLink></li>

            {
                user && user?.email && <li><NavLink to="/subscription">Subscription</NavLink></li>
            }

            {
                isLoading || loading ? <Loading /> :
                    isAdmin && <li><NavLink to="/admin">Dashboard</NavLink></li>
            }
            {
                user && user?.email && <li><NavLink to="/my-articles">My Articles</NavLink></li>
            }
            
            {
                isLoading || loading ? <Loading /> :
                    isPremium && <li><NavLink to="/premium-articles">Premium Articles</NavLink></li>
            }
        </>
    );

    if (isLoading || loading) {
        return <div className="text-center"><Loading /></div>
    }

    return (
        <div className="bg-transparent backdrop-blur-3xl backdrop-brightness-50 shadow-md fixed w-full z-50">
            <div className="px-4 md:px-6 lg:px-8 flex justify-between items-center py-3 transition-all animate-slide-in">
                {/* Logo */}
                <NewsHubLogo />

                {/* Desktop Menu */}
                <ul className="hidden lg:flex gap-6 items-center text-gray-100 font-semibold [&_li]:hover:text-primary [&_li]:font-bold [&_li]:transition-all [&_li]:duration-700">
                    {navLinks}
                </ul>
                {
                    isLoading || loading ? <Loading /> :
                        user ? (
                            <div className="hidden lg:flex gap-6 items-center font-semibold">
                                <Link to="/profile" className="relative inline-block">
                                    <img
                                        src={user.photoURL}
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-primary"
                                    />

                                    {isPremium && (
                                        <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-[10px] px-1 py-[1px] rounded-full border border-white">
                                            ⭐
                                        </span>
                                    )}
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm btn-outline btn-primary text-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="hidden lg:flex gap-6 items-center font-semibold text-gray-100">
                                <NavLink to="/auth/login">Login</NavLink>
                                <NavLink to="/auth/register">Register</NavLink>
                            </div>
                        )
                }

                {/* Mobile Hamburger Icon */}
                <div className="lg:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer text-primary">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <ul onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col lg:hidden px-6 pb-4 bg-base-200 animate-slide-down shadow-md z-50 space-y-6 [&_li]:hover:text-primary [&_li]:font-bold [&_li]:transition-all [&_li]:duration-700">
                    {navLinks}
                    {user ? (
                        <>
                            <li className="mt-2">
                                <Link to="/profile" className="flex items-center gap-2">
                                    <img src={user.photoURL || "https://i.ibb.co/Rh6Wv3M/user.png"} className="w-8 h-8 rounded-full" alt="User" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm btn-outline btn-error w-full mt-2"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/auth/login">Login</NavLink></li>
                            <li><NavLink to="/auth/register">Register</NavLink></li>
                        </>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Navbar;

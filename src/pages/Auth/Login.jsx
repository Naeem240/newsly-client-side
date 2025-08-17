import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {  FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import NewsHubLogo from "../../components/NewsHubLogo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Login = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const axiosSecure = useAxiosSecure();
    const { user, signIn, signInWithGoogle, setLoading } = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();


    // Handle Email Login
    const onSubmit = async ({ email, password }) => {
        try {
            await signIn(email, password);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Login Successful!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            setLoading(false)
            navigate(`${location.state ? location.state : '/'}`);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message || "Something went wrong",
            });
        }
    };

    // Handle Google Login
    const handleGoogleLogin = async () => {

        try {
            const result = await signInWithGoogle();
            const user = result.user;

            // ✅ Save the Google user to DB
            await axiosSecure.post("/users", {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Google Login Successful!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            setLoading(false)
            navigate(`${location.state ? location.state : '/'}`);
        } catch (error) {
            console.error('Google Login Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: error.message || 'Something went wrong!',
            });
        }
    };

    if (user && user?.email) {
        navigate('/')
    }



    return (
        <>
        <Helmet>
            <title>Login || NewsHub</title>
        </Helmet>
            <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8 relative">
                {/* Top Right Logo */}
                <div className="absolute top-4 left-4">
                    <NewsHubLogo />
                </div>

                {/* Login Card */}
                <div className="w-full max-w-md bg-base-100 rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="label font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className="input input-bordered w-full"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", { required: "Password is required" })}
                                    className="input input-bordered w-full pr-10"
                                />
                                <span
                                    className="absolute z-10 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary text-black w-full">Login</button>
                        {/* Divider */}
                        <div className="divider">OR</div>

                        {/* Google Login Button */}
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className="btn btn-outline w-full flex items-center gap-2"
                        >
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                alt="Google logo"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>

                    </form>

                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <Link to="/auth/register" className="text-primary underline font-medium">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;

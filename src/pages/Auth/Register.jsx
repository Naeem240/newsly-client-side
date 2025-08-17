import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"; // You said you're using 'react-router'
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { motion } from "motion/react";
import NewsHubLogo from "../../components/NewsHubLogo";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from "react-helmet";

const Register = () => {
  // Jump to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUserProfile, signInWithGoogle, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength) return "Password must be at least 6 characters.";
    if (!hasUppercase) return "Password must include an uppercase letter.";
    if (!hasSpecial) return "Password must include a special character.";
    if (!hasNumber) return "Password must include a number.";

    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const validationMessage = validatePassword(value);

    if (validationMessage) {
      setError(validationMessage);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Password is strong ✔️");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLocalLoading(true);
    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });

      // ✅ Save user in MongoDB
      await axiosSecure.post("/users", {
        name,
        email,
        photo,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Registration Successful!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      form.reset();
      setError("");
      setLoading(false)
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // ✅ Save the Google user to your DB
      await axiosSecure.post("/users", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Google Signed Up Successful!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      setLoading(false)
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-Up Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>
        Register || NewsHub
      </title>
    </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-base-200 p-6 rounded shadow"
        >
          <div className="text-center mb-4">
            <NewsHubLogo />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

          <form onSubmit={handleRegister}>
            <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full mb-3" required />
            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full mb-3" required />
            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />

            <div className="relative mb-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                className="input input-bordered w-full pr-10"
                required
              />
              <span
                className="absolute top-3 right-3 text-xl text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-1">{success}</p>}

            {/* Terms & Conditions */}
            <label className="label cursor-pointer mt-4">
              <input
                type="checkbox"
                className="checkbox checkbox-sm mr-2"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span className="label-text text-sm">
                I agree to the <Link to="/terms" className="text-blue-600 underline">Terms & Conditions</Link>
              </span>
            </label>

            <button
              className="btn btn-primary text-black w-full mt-4"
              type="submit"
              disabled={!agreeTerms || localLoading}
            >
              {localLoading ? <span className="loading loading-spinner"></span> : "Register"}
            </button>
          </form>

          <div className="divider my-4">OR</div>

          <button
            onClick={handleGoogleSignUp}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
            disabled={localLoading}
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Register;

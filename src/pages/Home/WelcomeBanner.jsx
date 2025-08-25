import { motion } from "framer-motion";
import welcomeImg from "../../assets/welcome.svg"; // replace with your own image
import { useNavigate } from "react-router";
//import "./WelcomeBanner.css"; // custom css for gradient shift

const WelcomeBanner = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            className="relative overflow-hidden rounded shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Background Gradient Blobs */}
            <motion.div
                className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 bg-mint-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                animate={{ x: [0, -40, 40, 0], y: [0, 30, -50, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* Foreground Content */}
            <motion.div
                className="relative animated-gradient py-20 px-4 md:px-6 lg:px-8 text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    {/* Left Content */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Welcome to <span className="text-mint-100">Newsly</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-6 max-w-lg">
                            Stay informed with the latest articles, trending news, and premium
                            content tailored just for you.
                        </p>
                        <motion.button
                            onClick={() => navigate(`/articles`)}
                            className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Explore Now
                        </motion.button>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        className="flex justify-center md:justify-end"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <img
                            src={welcomeImg}
                            alt="Welcome"
                            className="w-72 md:w-96 drop-shadow-lg"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeBanner;

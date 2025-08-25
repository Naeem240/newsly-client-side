import { Link } from "react-router";

const AboutPreviewSection = () => {
    return (
        <div className="bg-base-100 py-20">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center border-b pb-4 border-primary text-primary">🗞️ About NewsHub</h2>
            <div className="px-4 md:px-6 lg:px-8 px-2 lg:px-6 text-center">
                <p className="text-gray-400 mb-6">
                    At NewsHub, we believe that reliable news empowers communities.
                    We aggregate trending articles, exclusive insights, and premium stories from trusted publishers — all in one place.
                </p>
                <Link
                    to="/"
                    className="btn btn-outline btn-primary hover:text-black transition-all duration-700"
                >
                    Learn More About Us
                </Link>
            </div>
        </div>
    );
};

export default AboutPreviewSection;

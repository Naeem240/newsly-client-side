import { Link } from "react-router";

const AboutPreviewSection = () => {
    return (
        <div className="bg-base-100 py-16 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">🗞️ About NewsHub</h2>
                <p className="text-gray-400 mb-6">
                    At NewsPro, we believe that reliable news empowers communities.
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

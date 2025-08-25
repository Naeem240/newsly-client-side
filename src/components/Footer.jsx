import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import NewsHubLogo from "./NewsHubLogo";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-100 py-10">
            <div className="px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:justify-items-center">
                {/* Logo & About */}
                <div>
                    <NewsHubLogo/>
                    <p className="mt-4 text-gray-400">
                        Your trusted sources for the latest articles, premium insights, and trending news.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-primary transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/articles" className="hover:text-primary transition">All Articles</Link>
                        </li>
                        <li>
                            <Link to="/subscription" className="hover:text-primary transition">Subscription</Link>
                        </li>
                        <li>
                            <Link to="/admin" className="hover:text-primary transition">Dashboard</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact / Social */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
                    <div className="flex space-x-4 text-2xl">
                        <a href="#" className="hover:text-primary transition">
                            <FaFacebook />
                        </a>
                        <a href="#" className="hover:text-primary transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-primary transition">
                            <FaInstagram />
                        </a>
                    </div>
                    <p className="mt-4 text-gray-400">contact@newspro.com</p>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-10">
                &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

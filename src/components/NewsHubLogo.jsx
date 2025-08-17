import React from 'react';
import { FaNewspaper } from 'react-icons/fa';
import { Link } from 'react-router';

const NewsHubLogo = () => {
    return (
        <Link to="/" className="flex items-center gap-2 text-primary text-xl font-bold">
            <FaNewspaper className="text-2xl" /> NewsHub
        </Link>
    );
};

export default NewsHubLogo;
import React from 'react';
import TrendingSlider from './TrendingSlider';
import PublishersSection from './PublishersSection';
import StatisticsSection from './StatisticsSection';
import PlansSection from './PlansSection';
import AboutPreviewSection from './AboutPreviewSection';
import NewsletterSection from './NewsletterSection';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";



const Home = () => {
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const navigate = useNavigate();

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSubscriptionModal(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    useEffect(() => {
        if (showSubscriptionModal) {
            Swal.fire({
                title: "Unlock Premium Features!",
                text: "Subscribe now to enjoy unlimited premium articles and exclusive benefits.",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Subscribe Now",
                cancelButtonText: "Maybe Later",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/subscription");
                }
            });
        }
    }, [showSubscriptionModal, navigate]);



    return (
        <>
            <TrendingSlider />
            <PublishersSection />
            <StatisticsSection />
            <PlansSection />
            <AboutPreviewSection />
            <NewsletterSection />

        </>
    );
};

export default Home;
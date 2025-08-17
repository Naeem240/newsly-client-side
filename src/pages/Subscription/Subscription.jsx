import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const Subscription = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const navigate = useNavigate();
    // const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();

    const [period, setPeriod] = useState('1');
    const [price, setPrice] = useState(5);

    const handleChange = (e) => {
        const value = e.target.value;
        setPeriod(value);

        if (value === "1") setPrice(1);
        if (value === "5") setPrice(10);
        if (value === "10") setPrice(20);
    };

    const handleSubscribe = async () => {
        sessionStorage.setItem("subscriptionPeriod", period);
        sessionStorage.setItem("subscriptionPrice", price);
        navigate("/payment");
    };

    return (
        <>
            <Helmet>
                <title>
                    Subscription || NewsHub
                </title>
            </Helmet>
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="hero bg-base-200 rounded-xl p-10 mb-8">
                    <div className="hero-content flex-col lg:flex-row">
                        {/* <img src="https://i.ibb.co/D4tK364/Capture.png" alt="Premium" className="max-w-sm rounded-lg shadow-2xl" /> */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">Upgrade to Premium!</h1>
                            <p className="py-4 text-center">Access exclusive premium articles & unlimited posting.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-4/5 bg-success p-4 rounded-lg shadow-lg mx-auto">
                    <label className="block text-center text-black font-bold">Select Subscription Period:</label>
                    <select className="select select-bordered w-full cursor-pointer" onChange={handleChange}>
                        <option value="1">1 Minute</option>
                        <option value="5">5 Days</option>
                        <option value="10">10 Days</option>
                    </select>

                    <div>
                        <p className="text-xl font-bold text-yellow-900">Total Price: ${price}</p>
                    </div>

                    <button className="btn btn-warning text-black w-full rounded-full" onClick={handleSubscribe}>
                        Subscribe Now
                    </button>
                </div>
            </div>
        </>
    );
};
export default Subscription;

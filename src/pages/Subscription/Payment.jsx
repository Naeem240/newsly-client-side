import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
// import { useNavigate } from "react-router";

const Payment = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { user, setIsPremium } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [period, setPeriod] = useState("1");
    const [price, setPrice] = useState(1);

    useEffect(() => {
        const storedPeriod = sessionStorage.getItem("subscriptionPeriod") || "1";
        const storedPrice = sessionStorage.getItem("subscriptionPrice") || 1;
        setPeriod(storedPeriod);
        setPrice(storedPrice);
    }, []);

    const handlePay = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Confirm Payment",
            html: `
        <p><strong>Card Number:</strong> ${cardNumber}</p>
        <p><strong>Period:</strong> ${period === "1" ? "1 Minute" : period === "5" ? "5 Days" : "10 Days"}</p>
        <p><strong>Amount:</strong> $${price}</p>
      `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm Payment",
            cancelButtonText: "Cancel",
        });

        if (isConfirmed) {
            // Calculate expiry date
            const now = new Date();
            let expiryDate;

            if (period === "1") {
                expiryDate = new Date(now.getTime() + 1 * 60 * 1000);
            } else if (period === "5") {
                expiryDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
            } else if (period === "10") {
                expiryDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
            }

            try {
                const res = await axiosSecure.patch(`/users/${user.email}/premium`, {
                    premiumTaken: expiryDate.toISOString(),
                });

                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful!",
                        showConfirmButton: false,
                        timer: 3000,
                        toast: true,
                    });
                    setIsPremium(true);
                    queryClient.invalidateQueries(["users", user.email]);
                    // navigate('/premium-articles')
                }
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Something went wrong. Try again.", "error");
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Payment || NewsHub</title>
            </Helmet>
            <div className="relative max-w-md mx-auto px-4 py-20">
                <img className="h-90 w-120 m-auto rounded-2xl shadow-2xl" src="https://images.pexels.com/photos/7233099/pexels-photo-7233099.jpeg?_gl=1*gu4rx9*_ga*MjczMzE4NDkzLjE3NTI1MTcwMjQ.*_ga_8JE65Q40S6*czE3NTI1MTcwMjMkbzEkZzEkdDE3NTI1MTcwNzMkajEwJGwwJGgw" alt="" />

                <div className="absolute top-28 left-7 md:left-10  ">
                    <h1 className="text-3xl font-bold mb-6 text-yellow-300">Complete Your Payment</h1>

                    <div className="">
                        <label className="block font-black">Card Number:</label>
                        <input
                            required
                            type="text"
                            placeholder="Enter your card number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="input input-bordered mb-6 w-3/4 md:w-full"
                        />

                        <label className="block font-black">Confirm Subscription Period:</label>
                        <select
                            className="select select-bordered w-3/4 md:w-full mb-6"
                            value={period}
                            onChange={(e) => {
                                setPeriod(e.target.value);
                                // Also update price if period changes
                                if (e.target.value === "1") setPrice(1);
                                if (e.target.value === "5") setPrice(10);
                                if (e.target.value === "10") setPrice(20);
                            }}
                        >
                            <option value="1">1 Minute</option>
                            <option value="5">5 Days</option>
                            <option value="10">10 Days</option>
                        </select>

                        <button
                            className="block btn text-black w-3/4 md:w-full btn-warning rounded-full"
                            onClick={handlePay}
                        >
                            Pay ${price}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;

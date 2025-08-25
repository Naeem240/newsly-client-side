import { Slide } from "react-awesome-reveal";
import { Link } from "react-router";

const PlansSection = () => {
    const freeFeatures = [
        "Read free articles",
        "Basic access",
        "Limited posting (1 article)",
        "Access public publishers",
        "No premium articles",
    ];

    const premiumFeatures = [
        "Unlimited article posting",
        "Access premium articles",
        "Priority support",
        "Exclusive publishers",
        "Ad-free reading experience",
    ];

    return (
        <div className="bg-base-200 py-20">            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center border-b pb-4 border-primary text-primary">🏷️ Choose Your Plan</h2>

            <Slide cascade direction="right" duration={3000} triggerOnce={true}>
                <div className="px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <div className="border border-primary rounded-lg shadow p-8 flex flex-col justify-between hover:shadow-lg transition">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
                            <ul className="space-y-2 mb-10">
                                {freeFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        ✅ <span className="ml-2">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            to="/subscription"
                            className="btn btn-outline btn-primary w-full"
                        >
                            Upgrade Now
                        </Link>
                    </div>

                    {/* Premium Plan */}
                    <div className="border-2 border-yellow-500 rounded-lg shadow p-8 flex flex-col justify-between hover:shadow-lg transition bg-base-200">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
                            <ul className="space-y-2 mb-6">
                                {premiumFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        ⭐ <span className="ml-2">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            to="/subscription"
                            className="btn bg-yellow-500 text-black w-full"
                        >
                            Get Premium
                        </Link>
                    </div>
                </div>
            </Slide>
        </div>
    );
};

export default PlansSection;

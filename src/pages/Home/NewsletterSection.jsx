import React from 'react';

const NewsletterSection = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        // TODO: Connect to your newsletter backend or Mailchimp
        alert("Subscribed!");
    };

    return (
        <div className="bg-base-200 py-20">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center border-b pb-4 border-primary text-primary">📬 Stay Updated</h2>
            <div className="px-4 md:px-6 lg:px-8 text-center">
                <p className="text-gray-400 mb-6">
                    Subscribe to our newsletter and never miss the latest trending articles and premium insights.
                </p>
                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        className="input input-bordered w-full sm:w-auto"
                    />
                    <button type="submit" className="btn btn-primary text-black">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsletterSection;
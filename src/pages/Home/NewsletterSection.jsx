import React from 'react';

const NewsletterSection = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        // TODO: Connect to your newsletter backend or Mailchimp
        alert("Subscribed!");
    };

    return (
        <div className="bg-base-200 py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">📬 Stay Updated</h2>
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
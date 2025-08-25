import React from "react";

const WhyChoose = () => {
  const features = [
    {
      title: "📰 Reliable News",
      desc: "We provide verified and trustworthy news, so you always stay informed with facts.",
    },
    {
      title: "⚡ Real-Time Updates",
      desc: "Get the latest breaking news updates instantly without refreshing your page.",
    },
    {
      title: "🌍 Global Coverage",
      desc: "From politics to sports, tech to health — we cover stories worldwide.",
    },
  ];

  return (
    <>
    <div className="py-20">     
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center border-b pb-4 border-primary text-primary">🌟 Why Choose Newsly?</h2>
      <div className="grid md:grid-cols-3 gap-8 bg-mint-100 px-4 md:px-6 lg:px-8">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-base-200 shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              {item.title}
            </h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default WhyChoose;

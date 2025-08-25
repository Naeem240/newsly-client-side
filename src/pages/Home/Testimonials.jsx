import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Aisha Khan",
            text: "Newsly is my go-to news hub. I love how accurate and clean the interface is!",
        },
        {
            name: "Rahul Sharma",
            text: "I can follow politics, sports, and tech in one place. Super convenient.",
        },
        {
            name: "Emily Chen",
            text: "The premium subscription is totally worth it. Unlimited articles and zero ads!",
        },
    ];

    return (
        <div className="bg-base-200 py-20">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center border-b pb-4 border-primary text-primary">💬 What Our Readers Say</h2>
            <div className="px-4 md:px-6 lg:px-8">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={Infinity}
                    speed={1000}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-base-100 rounded-2xl shadow p-6 h-full flex flex-col justify-between border border-primary">
                                <p className="text-gray-400 italic mb-4">“{t.text}”</p>
                                <h4 className="font-semibold text-green-700">- {t.name}</h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;

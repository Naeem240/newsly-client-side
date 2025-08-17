import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

// Swiper core
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { motion } from 'motion/react';
import { Slide } from "react-awesome-reveal";
import Loading from "../../components/Loading";

const TrendingSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trending");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20"><Loading/></div>;
  }

  return (
    <div className="container mx-auto px-2 py-20">
      {/* <h2 className="text-3xl font-bold mb-6 text-center">🔥 Trending Articles</h2> */}

      <Swiper
        effect={"cube"}
        grabCursor={false}
        speed={5000}
        loop={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        modules={[EffectCube, Pagination, Autoplay]}
        className="mySwiper"
      >
        {articles.map((article) => (
          <SwiperSlide key={article._id}>
            <div className="flex flex-col items-center bg-base-200 rounded-lg shadow-md overflow-hidden p-6 relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[70vh] border-2 border-primary object-cover object-center rounded-lg mb-4 brightness-20"
              />
              <Slide className="absolute top-30" duration={2000} direction="left" triggerOnce={false} cascade>
                <h3 className="text-lg md:text-3xl text-center font-bold mb-2 w-4/5 mx-auto text-white">{article.title.slice(0,40)}...</h3>
              <p className="mt-15 md:mt-20 text-gray-400 text-center w-3/4 mx-auto">
                {article.description.slice(0, 80)}...
              </p>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className='mt-40'
              >
                <Link
                  to={`/article/${article._id}`}
                  className="btn btn-primary text-black btn-xl rounded-full"
                >
                  View Details
                </Link>
              </motion.div>
              </Slide>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingSlider;

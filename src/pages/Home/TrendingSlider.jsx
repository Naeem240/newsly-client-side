import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";

// Swiper core
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from 'motion/react';
import { Slide } from "react-awesome-reveal";
import Loading from "../../components/Loading";
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaTag, FaHashtag } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiExpress } from "react-icons/si";
import { CgDetailsMore } from "react-icons/cg";

const projects = [
  {
    title: "Newsly",
    description:
      "A news aggregator web app with category filters and search. Focused on responsive layout and fast UX.",
    image: "https://i.ibb.co.com/bMzcNr41/image.png",
    live: "https://newsly-552bf.web.app",
    repo: "https://github.com/Naeem240/newsly-main",
    tech: [
      { name: "React", Icon: FaReact },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    title: "Libri Sphere",
    description:
      "A small library/catalog app with book details, search and a clean UI for reading discovery.",
    image: "https://i.ibb.co.com/xKFn6Y06/image.pngv",
    live: "https://libri-sphere.web.app",
    repo: "https://github.com/Naeem240/libri-sphere",
    tech: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "MongoDB", Icon: SiMongodb },
    ],
  },
  {
    title: "Room Sync",
    description:
      "A room-sharing prototype demonstrating CRUD flows and a simple real-time feel (simulated).",
    image: "https://i.ibb.co.com/vvgfzKxB/image.png",
    live: "https://room-sync-5dd52.web.app",
    repo: "https://github.com/Naeem240/roomsync-main",
    tech: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express", Icon: SiExpress },
    ],
  },
];

const TrendingSlider = () => {

  const navigate = useNavigate()

  // const reduce = useReducedMotion();
  const [isActive, setIsActive] = useState(false); // mobile tap animation
  const carouselRef = useRef(null);
  const swiperRef = useRef(null); // keep a ref to the Swiper instance

  // const project = ["Project-1", "Project-2", "Project-3", "Project-4"];

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(0, 0); // Go to first slide on mount
    }
  }, []);

  // Observe visibility and control swiper autoplay manually
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const swiper = swiperRef.current;
          if (!swiper) return;

          if (entry.isIntersecting) {
            // Ensure autoplay params exist before starting
            swiper.params.autoplay = {
              delay: 7500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            };

            // Reset to the first slide when the carousel becomes visible.
            // Use slideToLoop so it works correctly with loop mode.
            try {
              swiper.slideToLoop(0, 0); // jump to first slide without animation
            } catch (e) {
              // ignore if slideToLoop isn't available for some versions
              try {
                swiper.slideTo(0, 0);
              } catch (err) {
                console.log(err, e)
              }
            }

            // Start autoplay (will only start if Autoplay module is present)
            if (swiper.autoplay && typeof swiper.autoplay.start === "function") {
              swiper.autoplay.start();
            }
          } else {
            // Stop autoplay when it leaves viewport
            if (swiper.autoplay && typeof swiper.autoplay.stop === "function") {
              swiper.autoplay.stop();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // --- Variants (unchanged) ---
  const titleVariant = {
    hidden: { opacity: 0, x: -80, rotate: -8 },
    visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
  };

  const descVariant = {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.7 } },
  };

  const badgesContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const badgeItem = {
    hidden: { opacity: 0, y: 20, scale: 0.8, rotate: -8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15, mass: 0.6, bounce: 0.7, delay: 1.2, duration: 0.8 },
    },
  };

  const buttonLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { delay: 1.8, duration: 0.6, ease: "easeOut" } },
  };

  const buttonMiddle = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.8, duration: 0.6, ease: "easeOut" } },
  };


  const buttonRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 1.5, ease: "easeOut" } },
  };

  const imageReveal = {
    hidden: { opacity: 0, x: -80, rotateY: 18 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
    },
  };

  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trending");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20"><Loading /></div>;
  }

  return (
    // <div className="">
    //   {/* <h2 className="text-3xl font-bold mb-6 text-center">🔥 Trending Articles</h2> */}

    //   <Swiper
    //     effect={"cube"}
    //     grabCursor={false}
    //     speed={4000}
    //     spaceBetween={500}
    //     loop={true}
    //     cubeEffect={{
    //       shadow: true,
    //       slideShadows: true,
    //       shadowOffset: 20,
    //       shadowScale: 0.94,
    //     }}
    //     pagination={true}
    //     autoplay={{
    //       delay: 6000,
    //       disableOnInteraction: false,
    //     }}
    //     modules={[EffectCube, Pagination, Autoplay]}
    //     className="mySwiper"
    //   >
    //     {articles.map((article) => (
    //       <SwiperSlide key={article._id}>
    //         <div className="flex flex-col items-center bg-base-200 rounded-lg shadow-md overflow-hidden relative">
    //           <img
    //             src={article.image}
    //             alt={article.title}
    //             className="w-full h-[70vh] border-2 border-primary object-cover object-center rounded-lg brightness-20"
    //           />
    //           <Slide className="absolute top-30" duration={2000} direction="left" triggerOnce={true}>
    //             <h3 className="text-lg md:text-3xl text-center font-bold mb-2 w-4/5 mx-auto text-white">{article.title.slice(0, 40)}...</h3>
    //             <p className="mt-15 md:mt-20 text-gray-400 text-center w-3/4 mx-auto">
    //               {article.description.slice(0, 80)}...
    //             </p>
    //             <motion.div
    //               animate={{ scale: [1, 1.05, 1] }}
    //               transition={{ duration: 5, repeat: Infinity }}
    //               className='mt-40'
    //             >
    //               <Link
    //                 to={`/article/${article._id}`}
    //                 className="btn btn-primary text-black btn-xl rounded-full"
    //               >
    //                 View Details
    //               </Link>
    //             </motion.div>
    //           </Slide>
    //         </div>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>
    <section id="projects" className="py-20 relative z-0" ref={carouselRef}>

      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center border-b pb-4 border-primary text-primary">Trending Articles</h2>
      <div className="px-4 md:px-6 lg:px-8">

        <Swiper
          className="-z-10 mySwiper"
          modules={[Autoplay, Navigation, Pagination]}
          speed={2000}
          spaceBetween={500}
          slidesPerView={1}
          loop
          // IMPORTANT: keep autoplay disabled here; we will start/stop it via the Swiper instance
          autoplay={false}
          onSwiper={(swiper) => {
            // keep the instance available in the ref for our observer
            swiperRef.current = swiper;
            // ensure it is not playing on mount
            if (swiper.autoplay && typeof swiper.autoplay.stop === "function") swiper.autoplay.stop();
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            },
          }}

        >
          {articles.map((p, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* LEFT */}
                <div className="md:w-1/2 w-full">
                  <motion.h3

                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={titleVariant}
                    className="text-2xl md:text-3xl font-bold mb-3"
                  >
                    {p.title.slice(0,20)}...
                  </motion.h3>

                  <motion.p
                    className="text-base font-light mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={descVariant}
                  >
                    {p.description.slice(0,80)}...
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-3 mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.45 }}
                    variants={badgesContainer}
                  >
                    {p.tags.map((t) => {
                      //const Icon = t.Icon;
                      return (
                        <motion.span
                          key={t.name}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-sm "
                          variants={badgeItem}
                        >
                          <motion.span className="flex items-center gap-1" initial={{ rotate: -20 }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 8 }}>
                            <FaHashtag  className="w-4 h-4" />{t}
                          </motion.span>
                          <span>
                            {/* {t.name} */}
                          </span>
                        </motion.span>
                      );
                    })}
                  </motion.div>

                  <div className="flex gap-1 md:gap-3 mt-2">

                    <motion.button
                      onClick={() => navigate(`/article/${p._id}`)}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary transition-colors duration-1000 hover:bg-primary hover:text-black text-sm font-medium cursor-pointer"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      variants={buttonLeft}
                    >
                      <CgDetailsMore className="w-4 h-4" />
                      Details
                    </motion.button>

                    {/* <motion.a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#f306f3] text-[#f306f3] transition-colors duration-1000 hover:bg-[#f306f3] hover:text-black text-sm font-medium"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      variants={buttonMiddle}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      Live
                    </motion.a> */}

                    {/* <motion.a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#f306f3] text-[#f306f3] transition-colors duration-1000 hover:bg-[#f306f3] hover:text-black text-sm font-medium "
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      variants={buttonRight}
                    >
                      <FaGithub className="w-4 h-4" />
                      Repo
                    </motion.a> */}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="md:w-1/2 w-full flex justify-center md:justify-end">
                  <motion.div
                    style={{ perspective: 1200 }}
                    className="relative -z-100 rounded-xl w-full max-w-lg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.35 }}
                    variants={imageReveal}
                    whileHover="hover"
                    onClick={() => setIsActive(!isActive)}
                    animate={isActive ? "hover" : "initial"}
                  >


                    {/* image */}
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="relative -z-100 block rounded-lg overflow-hidden m-1 group">
                      <motion.img
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        className="w-full h-56 md:h-64 object-cover rounded-lg block transition-all duration-500 group-hover:scale-102 border-3 border-primary"
                        initial="initial"
                      />
                    </a>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-6 flex gap-2"></div>
      </div>
    </section >
  );
};

export default TrendingSlider;

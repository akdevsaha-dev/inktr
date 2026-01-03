"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { motion } from "motion/react";
export const Hero = () => {
  const CloudSvg = () => {
    return (
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        width="161"
        height="64"
        viewBox="0 0 161 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-68 z-2 left-55"
      >
        <g
          style={{
            mixBlendMode: "soft-light",
          }}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
            }}
            d="M3 61C3.00766 59.2705 3.34496 54.3627 5.48818 50.2271C7.40981 46.5192 11.1516 43.2931 14.3518 40.2939C19.6401 35.3379 24.195 34.6216 27.4815 34.1341C33.3027 33.2705 35.5845 34.6078 37.7267 35.9467C40.1006 37.4304 41.0167 40.9754 41.8852 45.0612C42.7916 49.3253 42.2528 52.5199 42.0163 52.9488C40.895 54.9822 41.169 45.9676 43.1176 40.5803C45.5346 33.898 49.9701 29.0311 52.2644 26.1625C56.8117 20.477 62.6748 17.2339 67.8265 14.9139C73.2962 12.4506 79.7732 13.8534 82.6862 15.3037C85.6468 16.7778 85.3427 23.7433 84.8241 29.0345C84.4788 32.5577 82.4252 35.2261 81.7005 36.3082C81.5044 36.6009 81.2985 36.0302 81.2625 35.4921C81.0983 33.0371 83.3925 29.5346 87.0354 24.6426C89.2462 21.6738 92.7441 18.147 95.6721 15.3081C100.804 10.3325 104.584 7.81045 106.796 6.44386C110.659 4.05808 114.363 3.43245 119.24 3.01925C120.932 2.87592 122.042 3.55171 122.887 4.42186C123.79 5.35152 124.442 8.92055 125.438 14.3275C126.373 19.4011 126.123 23.1283 125.935 25.3656C125.46 31.012 121.816 35.6966 121.695 36.3645C121.494 37.4794 126.929 33.6205 132.383 30.1264C137.593 26.7884 142.083 26.0023 147.742 25.5231C149.824 25.3468 151.401 25.9551 152.759 26.7302C155.564 28.3312 156.603 32.1849 157.578 35.5781C158.696 39.4693 157.449 44.3452 155.54 48.5812C152.375 52.9436 150.742 54.482 149.114 55.723C148.283 56.3123 147.439 56.8194 145.907 57.0113"
            stroke="#4E4949"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </motion.svg>
    );
  };

  const text = "Where ideas take form, and stories find their audience.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-[url('/hero.jpg')] bg-cover flex flex-col">
      <Navbar />
      <motion.div className="md:text-5xl text-4xl absolute font-sans font-bold top-80 left-7 md:left-24">
        <motion.div
          initial={{ opacity: 0, y: -200, scale: 0.6, filter: "blur(30px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-7xl text-white/40"
        >
          Thoughts
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeInOut", delay: 0.4 }}
          className="pl-2 text-white/25 mt-2 "
        >
          That shape{" "}
          <motion.span
            className="h-[16]  text-white/40"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: 0.3,
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              repeatDelay: 3,
            }}
          >
            perspective.
          </motion.span>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute left-9 md:left-28 bottom-60 text-lg text-white/60 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {displayedText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="ml-1"
        >

        </motion.span>
      </motion.div>
      <div className=" absolute font-semibold text-white/60 left-30 bottom-40 px-2 py-2 rounded-full bg-white/10 hover:bg-white/5  w-[170px]  text-center">
        Start reading
      </div>
      <CloudSvg />
      <div className="w-64 h-64 bg-gradient-lines"></div>
    </div>
  );
};

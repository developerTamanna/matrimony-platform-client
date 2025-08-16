import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import banner1 from '../../../assets/metro2.jpg';
import banner2 from '../../../assets/metro5.jpg';
import banner3 from '../../../assets/metro6.jpg';

const images = [banner1, banner2, banner3]; // <-- এখানে

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-white dark:bg-[#1a1a1a] ">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt="Banner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/40"></div>

      {/* Optional text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-2xl md:text-4xl font-bold drop-shadow-md">
        </h1>
      </div>
    </div>
  );
};

export default Banner;

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const carouselItems = [
  {
    image: "/market-woman.jpg",
    title: <span className="block w-xl"> Secure Your Account with <span className="text-emerald-400">KYC Verification</span>.</span>,
    description: <p>Verification helps us keep your account safe and unlock premium features tailored for your business growth.</p>
  },
  {
    image: "/monie.jpg",
    title: <span className="block w-xl ">Building <span className="text-emerald-400">Trust </span>in Every Transaction.</span>,
    description: <p>Market Monie ensures all users are verified to maintain a secure and reliable ecosystem for traders and SMEs.</p>
  }
];

const OnboardingLayout = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="flex min-h-screen bg-white"
    >
      {/* Left Side: Carousel (Sticky — stays fixed while page scrolls) */}
      <div className="hidden lg:flex lg:w-1/2 lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={item.image}
              alt={item.title}
            />
            {/* Overlay Layers */}
            <div className="absolute inset-0 bg-emerald-950/60 mix-blend-multiply" aria-hidden="true" />
            <div className="absolute inset-0 bg-linear-to-t from-emerald-950 to-transparent opacity-80" aria-hidden="true" />
          </div>
        ))}

        {/* Logo (Stays on top) */}
        <div className="absolute top-10 left-12 z-20">
          <img src="/market-monie.png" alt="Market Monie Logo" className="h-10 w-auto brightness-0 invert" />
        </div>
        
        {/* Content (Changes with carousel) */}
        <div className="relative flex flex-col justify-end p-12 text-white font-sans z-20 w-full h-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-poppins transition-all duration-700">
              {carouselItems[activeIndex].title}
            </h1>
            <p className="mt-6 text-sm text-emerald-50 max-w-md font-poppins transition-all duration-700 delay-100">
              {carouselItems[activeIndex].description}
            </p>
          </div>

          {/* Carousel Switcher / Indicators */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-8 bg-emerald-400" : "w-4 bg-emerald-800"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium text-emerald-200 ml-auto">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?eyes=happy,default,&seed=${i}`}
                   alt="avatar" key={i} className="h-8 w-8 rounded-full border-2 border-emerald-900 bg-emerald-800" />
                ))}
              </div>
              <span>Join over 10,000+ verified traders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Content (Scrolls with the page) */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-20 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-lg lg:max-w-xl">
          <div className="mb-10 lg:hidden text-left">
             <img src="/market-monie.png" alt="Market Monie" className="h-8 w-auto" />
          </div>
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingLayout;

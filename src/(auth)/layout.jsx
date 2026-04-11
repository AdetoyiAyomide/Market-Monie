import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const carouselItems = [
  {
    image: "/market-woman.jpg",
    title: "Empowering Market Traders Everywhere.",
    description: "Market Monie provides access to credit and digital tools designed specifically for local traders to grow their business and secure their future."
  },
  {
    image: "/monie.jpg",
    title: "Fuel Your Business Growth with SME Loans.",
    description: "Access flexible credit facilities and loans tailored to help your SME thrive. Get the financial support you need to expand your operations today."
  }

];

const AuthLayout = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 4600000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Carousel */}
      <div className="hidden lg:relative lg:flex lg:w-2/3 overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover overflow-hidden"
              src={item.image}
              alt={item.title}
            />
            {/* Overlay Layers */}
            <div className="absolute inset-0 bg-emerald-950/60 mix-blend-multiply" aria-hidden="true" />
            <div className="absolute inset-0 bg-linear-to-t from-emerald-950 to-transparent opacity-80" aria-hidden="true" />
          </div>
        ))}

        {/* Decorative Pattern Layer (Stays on top) */}
        {/* <div className="absolute -top-[50%] -right-[40%] pointer-events-none opacity-10 z-20"
          style={{ width: "200%", height: "170%" }}>
          <img src="/Pattern.png" alt="" className="w-full h-full object-contain object-bottom-right" style={{ filter: "brightness(0.9)" }} />
        </div> */}

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
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-emerald-900 bg-emerald-800" />
                ))}
              </div>
              <span>Joined by over 10,000+ traders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Content */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-20 bg-white overflow-y-auto">
        <div className="mx-auto w-full max-w-lg lg:w-[28rem]">
          <div className="mb-10 lg:hidden text-left">
             <img src="/market-monie.png" alt="Market Monie" className="h-8 w-auto" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

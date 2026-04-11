import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Image with Overlay */}
      <div className="hidden lg:relative lg:flex lg:w-2/3 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover overflow-hidden"
          src="/market-woman.jpg"
          alt="Market woman trading"
        />
        {/* Deep Green Overlay - Matching Market Monie Brand */}
        <div className="absolute inset-0 bg-emerald-950/60 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-linear-to-t from-emerald-950 to-transparent opacity-80" aria-hidden="true" />

        {/* Decorative Pattern in Bottom Right */}
        <div  className="absolute -top-[50%] -right-[40%] pointer-events-none opacity-10"
          style={{ width: "200%", height: "170%" }}>
          <img src="/Pattern.png" alt="" className="w-full h-full object-contain object-bottom-right"  style={{ filter: "brightness(0.9) " }} />
        </div>


        
        {/* Logo on Image Overlay */}
        <div className="absolute top-10 left-12">
          <img src="/market-monie.png" alt="Market Monie Logo" className="h-10 w-auto brightness-0 invert" />
        </div>
        
        <div className="relative flex flex-col justify-end p-12 text-white font-sans">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Empowering Market <br />
              <span className="text-emerald-400">Traders</span> Everywhere.
            </h1>

            <p className="mt-6 text-sm text-emerald-50 max-w-md font-poppins">
              Market Monie provides access to credit and digital tools designed specifically for local traders to grow their business and secure their future.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-emerald-200">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-emerald-900 bg-emerald-800" />
              ))}
            </div>
            <span>Joined by over 10,000+ traders this month</span>
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

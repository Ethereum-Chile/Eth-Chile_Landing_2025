"use client";

import ParallaxCards from "./ParallaxCards.tsx";

const WhyEthereumComponent = () => {
  return (
    <section
        data-section="why-ethereum"
        className="relative min-h-screen flex items-center justify-center py-16 px-4 z-40 overflow-hidden"
      >
        {/* Background overlay for better visibility */}
        <div className="absolute inset-0 bg-custom-black/20"></div>
        
        {/* Background gradient effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 50%)",
            filter: "blur(60px)",
          }}
        >
        </div>

        {/* Animated grid pattern with transparency */}
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5"
        >
        </div>

        {/* Main content card */}
        <div 
          className="relative max-w-7xl w-full mx-auto p-4 md:p-8 rounded-3xl backdrop-blur-2xl border border-white/30 shadow-2xl overflow-hidden text-white"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.05) 100%)'
          }}
        >
          {/* Inner glow effect */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none"
          >
          </div>

          <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Side: ETH ASCII Video */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* Glow effect behind video */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
                >
                </div>
                <div className="relative">
                  {/* Video container */}
                  <div
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-lg"
                    >
                      <source src="/eth_ascii_compressed.webm" type="video/webm" />
                      <p className="text-gray-400 text-center p-4">
                        Your browser does not support the video tag.
                      </p>
                    </video>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Title and Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="mb-6 md:mb-8" style={{ minHeight: "3rem" }}>
                <h2 
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-raleway font-bold text-white leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)' }}
                >
                  Why Ethereum, Why <span 
                    className="text-custom-blue font-extralight" 
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' }}
                  >Now</span>
                </h2>
              </div>

              <p 
                className="text-xl md:text-2xl mb-6 md:mb-8 text-gray-200 font-light"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.4)' }}
              >
                Ethereum is now critical infrastructure
              </p>

              {/* Enhanced subtitle with gradient */}
              <p 
                className="text-base md:text-lg mb-8 md:mb-12 text-gray-300 leading-relaxed"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.3)' }}
              >
                The world's programmable blockchain has evolved into the foundation
                for the next generation of financial applications, decentralized
                systems, and digital innovation.
              </p>

              <div className="relative">
                <ParallaxCards />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default WhyEthereumComponent;
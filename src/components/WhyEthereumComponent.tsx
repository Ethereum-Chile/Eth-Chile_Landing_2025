"use client";

import { motion } from "framer-motion";
import { HyperText } from "./HyperText.tsx";
import ParallaxCards from "./ParallaxCards.tsx";
import MagneticCard from "./MagneticCard.tsx";

const WhyEthereumComponent = () => {
  return (
    <section
      data-section="why-ethereum"
      className="relative min-h-screen flex items-center justify-center py-16 px-4 z-40 overflow-hidden"
    >
      {/* Minimal background overlay to allow gallery to show through */}
      <div className="absolute inset-0 bg-custom-black/10"></div>
      
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
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"
      >
      </div>

      <MagneticCard strength={0.12}>
        <motion.div
          className="relative max-w-7xl w-full mx-auto p-8 rounded-3xl backdrop-blur-2xl bg-black/60 border border-white/10 shadow-2xl overflow-hidden text-white"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Inner glow effect */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none"
          >
          </div>

          <div
            className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Left Side: ETH ASCII Video */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Glow effect behind video */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
                >
                </div>
                <div className="relative">
                  {/* Video container */}
                  <div
                    className="w-full h-[500px] bg-black rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-lg"
                      style={{ maxHeight: "500px" }}
                    >
                      <source src="/eth_ascii_compressed.webm" type="video/webm" />
                      <p className="text-gray-400 text-center p-4">
                        Your browser does not support the video tag.
                      </p>
                    </video>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Title and Content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="mb-8" 
                style={{ minHeight: "3rem" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <HyperText
                  text="Why Ethereum, Why Now"
                  duration={1000}
                  className="text-4xl font-raleway font-semibold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                  animateOnLoad={true}
                />
              </motion.div>
              
              <motion.p 
                className="text-2xl mb-8 text-gray-200 font-light"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Ethereum is now critical infrastructure
              </motion.p>

              {/* Enhanced subtitle with gradient */}
              <motion.p 
                className="text-lg mb-12 text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                The world's programmable blockchain has evolved into the foundation
                for the next generation of financial applications, decentralized
                systems, and digital innovation.
              </motion.p>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <ParallaxCards />
              </motion.div>
            </motion.div>
          </div>

          {/* Floating particles effect */}
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"
          >
          </div>
          <div
            className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"
          >
          </div>
          <div
            className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-50"
          >
          </div>
        </motion.div>
      </MagneticCard>
    </section>
  );
};

export default WhyEthereumComponent;

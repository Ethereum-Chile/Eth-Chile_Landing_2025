"use client";

import { LogoCarousel } from "./LogoCarousel.tsx";
import { HyperText } from "./HyperText.tsx";
import { motion } from "framer-motion";

const TrustedBy = () => {
  return (
    <section className="min-h-screen bg-custom-black relative py-20" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Solid background to completely cover gallery */}
      <div className="absolute inset-0 bg-custom-black"></div>
      
      <div className="flex flex-col items-center justify-center px-8 relative z-10">
        <div className="text-center w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ minHeight: "3rem" }}
          >
            <HyperText
              text="Trusted by&nbsp;Industry&nbsp;Leaders"
              duration={1000}
              className="text-2xl md:text-3xl font-raleway font-semibold mb-6 text-white leading-tight"
              animateOnLoad={true}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Trusted by the world's leading Web3 protocols and companies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <LogoCarousel columnCount={3} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

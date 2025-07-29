"use client";

import { LogoCarousel } from "./LogoCarousel.tsx";
import { HyperText } from "./HyperText.tsx";
import { motion } from "framer-motion";

const TrustedBy = () => {
  return (
    <section className="min-h-[60vh] bg-custom-black relative pb-16 border border-white rounded-3xl mx-4 mt-8">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ minHeight: "3rem" }}
          >
            <HyperText
              text="Trusted by Industry Leaders"
              duration={1000}
              className="text-2xl md:text-3xl font-raleway font-semibold mb-6 text-white"
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

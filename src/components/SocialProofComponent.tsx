"use client";

import { motion } from "framer-motion";
import SocialMediaIcons from "./SocialMediaIcons.tsx";

const SocialProofComponent = () => {
  return (
    <section
      className="relative py-20"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-raleway font-bold mb-6 text-white"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join The <span 
              className="text-custom-blue font-extralight" 
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' }}
            >Community</span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-xs md:max-w-2xl mx-auto mb-8"
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.4)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the growing ecosystem of builders, innovators, and leaders in Chile
          </motion.p>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SocialMediaIcons />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofComponent;

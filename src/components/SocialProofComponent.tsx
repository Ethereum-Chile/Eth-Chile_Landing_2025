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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join the <span className="text-custom-blue font-extralight">Eth</span> Community in Chile
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the growing ecosystem of builders, innovators, and leaders
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

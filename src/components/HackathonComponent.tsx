"use client";

import { motion } from "framer-motion";
import { HyperText } from "./HyperText.tsx";
import { HackathonCards } from "./Hackathon.tsx";

const HackathonComponent = () => {
  return (
    <section
      className="min-h-screen px-8 pt-2 pb-8 flex flex-col justify-center relative"
    >
      <motion.div 
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <HyperText
          text="DeFi"
          duration={1000}
          className="text-4xl font-raleway font-semibold text-white"
          animateOnLoad={true}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Interactive Hackathon Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <HackathonCards />
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonComponent;

"use client";

import { motion } from "framer-motion";
import { HyperText } from "./HyperText.tsx";
import { PixelCard } from "./PixelCard.tsx";
import { HackathonCards } from "./Hackathon.tsx";

const HackathonComponent = () => {
  return (
    <section
      className="min-h-screen px-8 pt-2 pb-8 flex flex-col justify-center relative"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Solid background to completely cover gallery */}
      <div className="absolute inset-0 bg-custom-black"></div>
      
      <motion.div 
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <HyperText
          text="Hackathons"
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

        {/* Crecimiento Hackathon */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <HyperText
              text="Crecimiento Hackathon"
              duration={1000}
              className="text-3xl font-raleway font-semibold text-white"
              animateOnLoad={true}
            />
          </div>

          {/* Centered Image with Pixel Animation */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl w-full">
              <div className="relative group">
                <PixelCard
                  variant="default"
                  gap={12}
                  speed={40}
                  className="w-full h-[600px]"
                >
                  <img
                    src="/imgs/GuY62_cWoAA4shu.jpeg"
                    alt="Crecimiento Hackathon"
                    className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  />
                  {/* CTA Button - Inside PixelCard */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-100 transition-opacity duration-300 z-50"
                  >
                    <a
                      href="https://x.com/crecimientoar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      Register Now
                    </a>
                  </div>
                </PixelCard>
              </div>
            </div>
          </motion.div>

          {/* Description below image */}
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-6">
              The Crecimiento Hackathon is ETH Chile's flagship event,
              designed to foster sustainable growth in the Latin American
              Web3 ecosystem.
            </p>

            {/* Key stats */}
            <motion.div 
              className="flex justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white">72h</p>
                <p className="text-sm text-gray-400">Duration</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">$25K</p>
                <p className="text-sm text-gray-400">Prize Pool</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonComponent;

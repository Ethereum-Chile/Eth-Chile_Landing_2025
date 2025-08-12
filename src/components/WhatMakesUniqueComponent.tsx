"use client";

import { motion } from "framer-motion";
import ScrollExpandMedia from "./ScrollExpandMedia.tsx";
import { HyperText } from "./HyperText.tsx";

const WhatMakesUniqueComponent = () => {
  return (
    <section className="min-h-screen relative" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Solid background to completely cover gallery */}
      <div className="absolute inset-0 bg-custom-black"></div>
      
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://www.youtube.com/embed/JavAmLx8EG0?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=JavAmLx8EG0&start=30"
        posterSrc="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
        title="What Makes ETHChile Unique"
        date="Latin America's Premier Ethereum Event"
        scrollToExpand="Scroll to Discover More"
      >
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <HyperText
              text="What Makes Chile the Perfect Hub for Ethereum Innovation"
              duration={1000}
              className="text-3xl font-bold text-white"
              animateOnLoad={true}
            />
          </motion.div>
          <motion.p 
            className="text-lg text-gray-300 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover why Chile's unique combination of regulatory clarity, fintech
            infrastructure, and technological talent makes it the ideal location for
            the next generation of blockchain innovation.
          </motion.p>
        </motion.div>
      </ScrollExpandMedia>
    </section>
  );
};

export default WhatMakesUniqueComponent;

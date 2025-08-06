"use client";

import React from "react";
import { motion } from "framer-motion";
import { StickyScrollGallery } from "./StickyScrollGallery";

const LEFT_IMAGES = [
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
];

const CENTER_IMAGES = [
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
];

const RIGHT_IMAGES = [
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
    },
  },
};

export const Hero = () => {
  return (
    <main className="bg-custom-black">
      <section className="text-white h-screen w-full bg-custom-black grid place-content-center relative">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <motion.div
          className="relative z-10 place-self-center px-6 pt-32 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-raleway text-5xl font-extralight md:text-7xl lg:text-8xl text-white mb-4"
            variants={itemVariants}
          >
            ETH Chile{" "}
            <span className="font-raleway font-extralight text-blue-400">
              2025
            </span>
          </motion.h1>

          <motion.h2
            className="font-raleway text-2xl font-light md:text-3xl lg:text-4xl text-white mb-6"
            variants={itemVariants}
          >
            Fintech meets Ethereum
          </motion.h2>

          <motion.p
            className="leading-relaxed tracking-wide text-gray-300 text-lg md:text-xl max-w-4xl mx-auto my-8"
            variants={itemVariants}
          >
            Experience the future of blockchain technology
            <br /> in the heart of Latin America's fintech revolution.
          </motion.p>

          <motion.div className="space-x-4" variants={itemVariants}>
            <button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              Get ticket
            </button>
            <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors text-lg border border-blue-400 hover:border-blue-300 px-8 py-4 rounded-lg">
              Volunteer
            </button>
          </motion.div>
        </motion.div>

        <div
          className="pointer-events-none absolute z-0 h-[70vh] w-full"
          style={{
            background: "linear-gradient(to right, #1e40af, #7c3aed, #3b82f6)",
            filter: "blur(84px)",
            mixBlendMode: "screen",
          }}
        />
      </section>

      <StickyScrollGallery
        leftImages={LEFT_IMAGES}
        staticImage={CENTER_IMAGES}
        rightImages={RIGHT_IMAGES}
      />
    </main>
  );
};

export default Hero;

"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlipLink from "./FlipLink";

const Footer = () => {
  return (
    <motion.footer
      className="bg-custom-black min-h-screen flex flex-col justify-center items-center p-8 relative transform transition-all duration-1000 ease-in-out hover:translate-y-[-20px] mt-auto"
      style={{
        backgroundImage: "url('/imgs/moai footer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginBottom: "0",
        borderBottom: "none",
        zIndex: "10",
        position: "relative",
      }}
    >
      {/* Solid background overlay to prevent gallery leakage */}
      <div className="absolute inset-0 bg-custom-black/40"></div>
      
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            className="text-center lg:text-left lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="mb-8" 
              style={{ minHeight: "3rem" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-raleway font-bold text-white leading-tight">
                Let's build together
              </h2>
            </motion.div>

            <motion.div 
              className="max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <form
                id="contactForm"
                action="https://formspree.io/f/xqalylre"
                method="POST"
                className="space-y-6 mb-8"
                onSubmit={(e) => {
                  const form = e.target as HTMLFormElement;
                  const statusElement = form.querySelector(
                    ".form-status",
                  ) as HTMLElement;
                  if (statusElement) {
                    statusElement.textContent = "Sending...";
                    statusElement.className =
                      "form-status text-sm mt-2 h-5 text-blue-400";
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                    className="border border-white bg-transparent p-3 rounded text-white placeholder-white focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    className="border border-white bg-transparent p-3 rounded text-white placeholder-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  rows={4}
                  required
                  className="border border-white bg-transparent p-3 rounded text-white placeholder-white focus:outline-none focus:border-blue-400 w-full resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex-1 hover:bg-gray-100 transition-colors"
                >
                  Submit
                </button>

                <p className="form-status text-sm mt-2 h-5"></p>
              </form>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center lg:text-left lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="mb-8" 
              style={{ minHeight: "3rem" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-raleway font-bold text-white leading-tight">
                Connect With Us
              </h3>
            </motion.div>

            <motion.div 
              className="lg:hidden grid grid-cols-2 gap-4 justify-items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl">
                <FlipLink href="https://x.com/ethereum_chile" text="Twitter">
                  Twitter
                </FlipLink>
              </div>
              <div className="text-2xl">
                <FlipLink
                  href="https://lu.ma/calendar/cal-87JX1lrRWtdnV6U"
                  text="Luma"
                >
                  Luma
                </FlipLink>
              </div>
              <div className="text-2xl">
                <FlipLink href="https://github.com/ethereumchile" text="GitHub">
                  GitHub
                </FlipLink>
              </div>
              <div className="text-2xl">
                <FlipLink href="https://t.me/ethereumchile" text="Telegram">
                  Telegram
                </FlipLink>
              </div>
            </motion.div>

            <motion.div 
              className="hidden lg:flex flex-col space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl">
                <FlipLink href="https://x.com/ethereum_chile" text="Twitter">
                  Twitter
                </FlipLink>
              </div>
              <div className="text-3xl">
                <FlipLink
                  href="https://lu.ma/calendar/cal-87JX1lrRWtdnV6U"
                  text="Luma"
                >
                  Luma
                </FlipLink>
              </div>
              <div className="text-3xl">
                <FlipLink href="https://github.com/ethereumchile" text="GitHub">
                  GitHub
                </FlipLink>
              </div>
              <div className="text-3xl">
                <FlipLink href="https://t.me/ethereumchile" text="Telegram">
                  Telegram
                </FlipLink>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center text-gray-400 text-sm mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 ETH Chile. All rights reserved.</p>
          <p> Built by <a href="https://x.com/blessed_ux" className="text-blue-400">blessedux</a> w ♡ for Eth Chile</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

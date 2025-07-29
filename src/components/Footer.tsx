"use client";

import { motion } from "framer-motion";
import FlipLink from "./FlipLink";
import { HyperText } from "./HyperText.tsx";

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
        position: "relative"
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col justify-between h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 flex-grow">
          <div className="text-center lg:text-left lg:pr-8">
            <div className="mb-8" style={{ minHeight: "3rem" }}>
              <HyperText
                text="Let's Build Together"
                duration={1000}
                className="text-4xl font-raleway font-semibold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                animateOnLoad={true}
              />
            </div>

            <div className="max-w-2xl mx-auto lg:mx-0">
              <form
                id="contactForm"
                action="https://docs.google.com/forms/d/e/1FAIpQLScYLmfvcsa1Y_vo1-kh4Mccdmf2lppuqEHBxtZf_9HJCG1Hzg/formResponse"
                method="POST"
                target="hidden_iframe"
                className="space-y-6 mb-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const email = formData.get('entry.203636535') as string;
                  
                  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    form.submit();
                    form.reset();
                    const statusElement = form.querySelector('.form-status') as HTMLElement;
                    if (statusElement) {
                      statusElement.textContent = 'Message sent successfully!';
                      statusElement.className = 'form-status text-sm mt-2 h-5 text-green-400';
                    }
                  } else {
                    const statusElement = form.querySelector('.form-status') as HTMLElement;
                    if (statusElement) {
                      statusElement.textContent = 'Please enter a valid email address.';
                      statusElement.className = 'form-status text-sm mt-2 h-5 text-red-400';
                    }
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="entry.2029058125"
                    id="name"
                    placeholder="Name"
                    required
                    className="border border-white bg-transparent p-3 rounded text-white placeholder-white focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="email"
                    name="entry.203636535"
                    id="email"
                    placeholder="Email"
                    required
                    className="border border-white bg-transparent p-3 rounded text-white placeholder-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <textarea
                  name="entry.1447673471"
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
            </div>
          </div>

          <div className="text-center lg:text-left lg:pl-8">
            <div className="mb-8" style={{ minHeight: "3rem" }}>
              <HyperText
                text="Connect With Us"
                duration={1000}
                className="text-4xl font-raleway font-semibold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                animateOnLoad={true}
              />
            </div>

            <div className="lg:hidden grid grid-cols-2 gap-4 justify-items-center">
              <div className="text-2xl">
                <FlipLink href="https://x.com/Ethereum_Chile" text="Twitter">Twitter</FlipLink>
              </div>
              <div className="text-2xl">
                <FlipLink href="https://lu.ma/calendar/cal-87JX1lrRWtdnV6U" text="Luma">Luma</FlipLink>
              </div>
              <div className="text-2xl">
                <FlipLink href="https://github.com/ethereumchile" text="GitHub">GitHub</FlipLink>
              </div>
              <div className="text-2xl">
                <FlipLink href="https://t.me/ethereumchile" text="Telegram">Telegram</FlipLink>
              </div>
            </div>

            <div className="hidden lg:flex flex-col space-y-6">
              <div className="text-3xl">
                <FlipLink href="https://x.com/Ethereum_Chile" text="Twitter">Twitter</FlipLink>
              </div>
              <div className="text-3xl">
                <FlipLink href="https://lu.ma/calendar/cal-87JX1lrRWtdnV6U" text="Luma">Luma</FlipLink>
              </div>
              <div className="text-3xl">
                <FlipLink href="https://github.com/ethereumchile" text="GitHub">GitHub</FlipLink>
              </div>
              <div className="text-3xl">
                <FlipLink href="https://t.me/ethereumchile" text="Telegram">Telegram</FlipLink>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>&copy; 2025 ETH Chile. All rights reserved.</p>
        </div>
      </div>

      <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
    </motion.footer>
  );
};

export default Footer; 
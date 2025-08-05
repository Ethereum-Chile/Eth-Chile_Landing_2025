"use client";

import React from "react";

// Gallery images
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
];

const STICKY_IMAGES = [
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
];

const RIGHT_IMAGES = [
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
];

export const StickyScrollGallery = () => {
  return (
    <main className="bg-custom-black">
      <div className="wrapper">
        <section className="text-white h-screen w-full bg-custom-black grid place-content-center sticky top-0">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
            Galería ETH Chile 2025
            <br />
            Scroll down! 👇
          </h1>
        </section>
      </div>

      <section className="text-white w-full bg-custom-black">
        <div className="grid grid-cols-12 gap-2">
          <div className="grid gap-2 col-span-4">
            {LEFT_IMAGES.map((imageUrl, index) => (
              <figure key={index} className="w-full">
                <img
                  src={imageUrl}
                  alt=""
                  className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md"
                />
              </figure>
            ))}
          </div>

          <div className="sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3">
            {STICKY_IMAGES.map((imageUrl, index) => (
              <figure key={index} className="w-full h-full">
                <img
                  src={imageUrl}
                  alt=""
                  className="transition-all duration-300 h-full w-full align-bottom object-cover rounded-md"
                />
              </figure>
            ))}
          </div>

          <div className="grid gap-2 col-span-4">
            {RIGHT_IMAGES.map((imageUrl, index) => (
              <figure key={index} className="w-full">
                <img
                  src={imageUrl}
                  alt=""
                  className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="group bg-custom-black">
        <h1 className="text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear">
          eth-chile
        </h1>
        <div className="bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
      </footer>
    </main>
  );
};

export default StickyScrollGallery;

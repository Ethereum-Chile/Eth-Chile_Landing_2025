import React, { forwardRef, useEffect, useRef } from 'react';
import { FeatureSteps } from "./FeatureSteps";
import CircularText from "./CircularText";
import { HyperText } from "./HyperText.tsx";
import Prism from "./Prism.tsx";

const ScrollAnimationSections = forwardRef<HTMLElement>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Effect to signal when this section comes into view or goes out of view
  // This controls the Hero component's animated background gallery to save CPU
  // But only when the user has actually scrolled past the Hero section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only stop gallery when this section is fully in view
            // This ensures the Hero section's gallery animation completes smoothly
            const rect = entry.boundingClientRect;
            const isFullyVisible = rect.top <= 0 && rect.bottom >= 0;
            
            if (isFullyVisible) {
              // Dispatch a custom event to signal that the gallery should stop
              // This saves CPU by stopping the continuous image scrolling animation
              window.dispatchEvent(new CustomEvent('stopGalleryRendering'));
            }
          } else {
            // Resume gallery when scrolling back up above this section
            const rect = entry.boundingClientRect;
            if (rect.top < 0) {
              window.dispatchEvent(new CustomEvent('resumeGalleryRendering'));
            }
          }
        });
      },
      {
        threshold: [0, 0.5, 1], // Trigger at 0%, 50%, and 100% visibility for smoother transitions
        rootMargin: '0px 0px 0px 0px' // No margin to ensure precise control
      }
    );

    // Only observe this section, not the WhyEthereum section
    // This prevents premature gallery stopping and maintains fluid animations
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className='bg-custom-black py-20 mt-0 relative' 
        style={{ backgroundColor: '#0a0a0a' }}
      >
        {/* Prism Background Animation */}
        <div className='absolute inset-0 z-0'>
          <Prism 
            height={3.5}
            baseWidth={5.5}
            animationType="3drotate"
            glow={2.0}
            offset={{ x: 0, y: 0 }}
            noise={0.2}
            transparent={true}
            scale={3.2}
            hueShift={0.15}
            colorFrequency={1.5}
            hoverStrength={1.5}
            inertia={0.08}
            bloom={1.5}
            suspendWhenOffscreen={true}
            timeScale={0.8}
          />
        </div>

        {/* Semi-transparent background overlay to allow Prism to show through */}
        <div className='absolute inset-0 bg-custom-black/60'></div>
        
        {/* Gradient from semi-transparent to transparent from top to bottom */}
        <div className='absolute inset-0 bg-gradient-to-b from-custom-black/70 via-custom-black/50 to-transparent'></div>
        
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="relative">
            {/* Circular Text in top left */}
            <div className="absolute top-0 left-0 z-10">
              <CircularText
                text="Destino Devconnect "
                spinDuration={30}
                onHover="speedUp"
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent"
              />
            </div>

            <div className="text-right mb-16">
              <h2 className="text-5xl md:text-6xl font-raleway font-bold mb-8 text-white">
                Latin America is the Future, Chile is the Catalyst
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl ml-auto">
                Latin America has emerged as the epicenter of blockchain innovation, 
                with Chile leading the charge in regulatory innovation. From progressive 
                fintech laws to open finance initiatives, this region is reshaping the 
                future of decentralized technology.
              </p>
            </div>

            <FeatureSteps
              features={[
                {
                  step: "Fintech Powerhouse",
                  title: "Latin America's Financial Innovation Hub",
                  content:
                    "Chile leads Latin America with over 200 fintech companies and $1.2B in fintech investments. The 2023 Fintech Law created a sandbox environment where web3 startups can test innovative solutions while regulators learn and adapt.",
                  image: "https://res.cloudinary.com/dezm9avsj/video/upload/v1756873896/chain_compressed_h18qbk.mp4",
                },
                {
                  step: "Open Banking Pioneer",
                  title: "API Infrastructure Ready for Web3",
                  content:
                    "Chile's Open Finance platform connects 80% of the banking system through standardized APIs. This existing infrastructure is perfectly positioned for web3 integration, creating unprecedented opportunities for DeFi and blockchain applications.",
                  image: "/panel.jpg",
                },
                {
                  step: "Untapped Potential",
                  title: "Web3's Gateway to Latin America",
                  content:
                    "Despite Chile's advanced fintech ecosystem, web3 adoption remains at just 3%. With 19M people, high smartphone penetration, and regulatory clarity, Chile represents the perfect market for web3's next breakthrough moment.",
                  image: "/apertura.jpg",
                },
              ]}
              autoPlayInterval={4000}
              className="bg-transparent"
            />
          </div>
        </div>
      </section>
    </>
  );
});

ScrollAnimationSections.displayName = 'ScrollAnimationSections';

export default ScrollAnimationSections; 
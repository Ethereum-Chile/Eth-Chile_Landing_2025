import React, { forwardRef, useEffect, useRef } from 'react';
import { FeatureSteps } from "./FeatureSteps";
import CircularText from "./CircularText";

const ScrollAnimationSections = forwardRef<HTMLElement>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className='py-20 mt-0 relative' 
      >
        {/* Removed Prism Background Animation */}
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="relative">
            {/* Circular Text in top left */}
            <div className="absolute top-0 left-0 z-50">
              <CircularText
                text="Destino Devconnect "
                spinDuration={30}
                onHover="speedUp"
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent"
              />
            </div>

            <div className="text-right mb-16 relative z-20">
              <h2 className="text-5xl md:text-6xl font-raleway font-bold mb-8 text-white">
                Latin America is the Future,<br/> <span className="font-raleway font-light" style={{ 
              color: '#00BFFF', 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' 
            }}>
           Chile 
            </span> is the Catalyst
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl ml-auto">
                Latin America has emerged as the epicenter of blockchain innovation, 
                with Chile leading the charge in <span style={{ 
              color: '#00BFFF', 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 191, 255, 0.3)' 
            }}>regulatory innovation</span>. From progressive 
                fintech laws to open finance initiatives, this region is reshaping the 
                future of <span style={{ 
              color: '#00BFFF', 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 191, 255, 0.3)' 
            }}>decentralized</span> technology.
              </p>
            </div>

            <FeatureSteps
              features={[
                {
                  step: "Fintech Powerhouse",
                  title: "Latin America's Financial Innovation Hub",
                  content:
                    "Chile leads Latin America with over 200 fintech companies and $1.2B in fintech investments. The 2023 Fintech Law created a sandbox environment where web3 startups can test innovative solutions while regulators learn and adapt.",
                  image: "/imgs/tvl.png",
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
'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import type {
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const getTimeOfDayImage = () => {
  if (typeof window === 'undefined') return '/imgs/campus_oriente_night.png';
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) {
    return '/imgs/campus_oriente_sunwirse.png';
  } else if (hour >= 10 && hour < 20) {
    return '/imgs/campus_oriente_day.png';
  } else {
    return '/imgs/campus_oriente_night.png';
  }
};

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string>(bgImageSrc || '/imgs/campus_oriente_night.png');

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [sectionVisibility, setSectionVisibility] = useState(1);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Dispatch event when content starts showing
  useEffect(() => {
    if (showContent) {
      window.dispatchEvent(new CustomEvent('scrollExpandState', {
        detail: { type: 'contentShowing', showContent }
      }));
    }
  }, [showContent]);

  // Dispatch event when bottom title becomes visible (for background fade-out trigger)
  useEffect(() => {
    if (showContent) {
      window.dispatchEvent(new CustomEvent('bottomTitleVisible', {
        detail: { type: 'titleVisible', isVisible: true }
      }));
    } else {
      window.dispatchEvent(new CustomEvent('bottomTitleVisible', {
        detail: { type: 'titleVisible', isVisible: false }
      }));
    }
  }, [showContent]);

  useEffect(() => {
    if (!bgImageSrc) {
      setBgImage(getTimeOfDayImage());
    } else {
      setBgImage(bgImageSrc);
    }
  }, [bgImageSrc]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle scroll if we're in the section
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (!isInSection) return;
      
      // Only prevent default if we're actively animating
      if (scrollProgress > 0 && scrollProgress < 1) {
        e.preventDefault();
      }
      
      if (mediaFullyExpanded && e.deltaY < 0) {
        // Scrolling up when expanded - collapse
        setMediaFullyExpanded(false);
        setScrollProgress(0.99); // Keep it just below threshold
      } else if (!mediaFullyExpanded) {
        // Scrolling down when collapsed - expand
        const scrollDelta = e.deltaY * 0.002; // Increased sensitivity
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          // Dispatch custom event when video is fully expanded
          window.dispatchEvent(new CustomEvent('scrollExpandState', {
            detail: { type: 'videoExpanded', progress: newProgress }
          }));
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (!isInSection) return;
      
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (!isInSection) return;

      // Only prevent default if we're actively animating
      if (scrollProgress > 0 && scrollProgress < 1) {
        e.preventDefault();
      }
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -50) {
        // Scrolling up when expanded - collapse
        setMediaFullyExpanded(false);
        setScrollProgress(0.99);
      } else if (!mediaFullyExpanded) {
        // Scrolling down when collapsed - expand
        const scrollDelta = deltaY * 0.01; // Increased sensitivity
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }

      setTouchStartY(touchY);
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    // Add event listeners
    const wheelHandler = handleWheel as unknown as EventListener;
    const touchStartHandler = handleTouchStart as unknown as EventListener;
    const touchMoveHandler = handleTouchMove as unknown as EventListener;
    const touchEndHandler = handleTouchEnd as EventListener;

    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('touchstart', touchStartHandler, { passive: false });
    window.addEventListener('touchmove', touchMoveHandler, { passive: false });
    window.addEventListener('touchend', touchEndHandler);

    return () => {
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('touchend', touchEndHandler);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  // Track section visibility for background fade out
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate how much of the section is visible (1 = fully in view, 0 = out)
      const visible = Math.max(0, Math.min(1, (rect.bottom - 0.2 * rect.height) / windowHeight));
      setSectionVisibility(visible);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  // Select background image based on local time if not provided
  const getTimeBasedBg = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) {
      return '/imgs/campus_oriente_sunwirse.png'; // sunrise/morning
    } else if (hour >= 10 && hour < 19) {
      return '/imgs/campus_oriente_day.png'; // day
    } else {
      return '/imgs/campus_oriente_night.png'; // night
    }
  };
  const selectedBgImage = bgImageSrc || getTimeBasedBg();

  // Fade out only when section is almost out of view (last 20%)
  let bgOpacity = 1;
  if (sectionVisibility < 0.2) {
    bgOpacity = sectionVisibility / 0.2;
    if (bgOpacity < 0) bgOpacity = 0;
  }

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden relative'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100vh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100vh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: bgOpacity }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={selectedBgImage}
              alt='Background'
              className='w-full h-full object-cover object-center'
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100vh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={mediaSrc}
                        className='w-full h-full rounded-xl'
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>
                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <p
                      className='text-2xl text-custom-blue'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-custom-blue font-medium text-center'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-custom-blue transition-none'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-custom-blue transition-none'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia; 
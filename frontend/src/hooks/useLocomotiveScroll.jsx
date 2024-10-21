import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

const useLocomotiveScroll = () => {
  useEffect(() => {
    // Initialize LocomotiveScroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      lerp: 0.1 // Adjust lerp for smoothness
    });

    // Cleanup on component unmount
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);
};

export default useLocomotiveScroll;

// components/animations/_GSAPAnimation.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const _GSAPAnimation = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default _GSAPAnimation;

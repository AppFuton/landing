import { useEffect, useState, useRef } from 'react';

export const useTypewriter = (text: string, speed: number = 50, delay: number = 0, shouldStart: boolean = true) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasStartedRef.current) return;
    
    hasStartedRef.current = true;
    setDisplayedText('');
    setIsComplete(false);

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    timeoutId = setTimeout(() => {
      let index = 0;
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay, shouldStart]);

  return { displayedText, isComplete };
};

export const useInView = (options?: IntersectionObserverInit, startVisible: boolean = false) => {
  const [isInView, setIsInView] = useState(startVisible);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startVisible && !isInView) {
      setTimeout(() => setIsInView(true), 50);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [startVisible]);

  return { ref, isInView };
};

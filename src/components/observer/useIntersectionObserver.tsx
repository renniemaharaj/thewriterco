import { useState, useEffect, useRef, RefObject } from "react";

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export interface IntersectionObserverResult {
  targetRef: RefObject<HTMLDivElement>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

const useIntersectionObserver = (
  options: IntersectionObserverOptions,
): IntersectionObserverResult => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasIntersected(true);
      }
    }, options);

    if (targetRef.current instanceof HTMLDivElement) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current instanceof HTMLDivElement) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options]);

  return { targetRef, isIntersecting, hasIntersected };
};

export default useIntersectionObserver;

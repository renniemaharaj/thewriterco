import React, { useEffect, useRef, useState } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucid"
import classNames from "classnames"; // Assuming cn utility is used
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type CarouselVariant = "default" | "no-scrollbar";

type CarouselProps = {
  items: React.ReactNode[]; // Array of items to display in the carousel
  variant?: CarouselVariant;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  onMount?: () => void;
};

export const Carousel: React.FC<CarouselProps> = ({
  items,
  variant = "default",
  className,
  ref,
  onMount,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  let scrollTimeout: ReturnType<typeof setTimeout>;
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const scrollHandler = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsStart(scrollWidth === 0);
      setIsEnd(scrollLeft + clientWidth >= scrollWidth || scrollWidth === 0);
    }
  };

  const scrollTo = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const [wheelLock, setWheelLock] = useState(false);

  const startAutoScroll = () => {
    const carousel = containerRef.current;
    if (!carousel) return;
    return setInterval(() => {
      if (carousel.scrollWidth > carousel.clientWidth) {
        const isEnd =
          carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
        carousel.scrollTo({
          left: isEnd ? 0 : carousel.scrollLeft + carousel.clientWidth,
          behavior: "smooth",
        });
      }
    }, 3000);
  };

  // Auto-scroll effect
  useEffect(() => {
    const carousel = containerRef.current;
    if (!carousel) return;

    // Handle user scroll to restart the auto-scroll
    const handleScroll = () => {
      clearInterval(scrollInterval);
      clearTimeout(scrollTimeout);

      // Restart auto-scroll after 3 seconds of user inactivity
      scrollTimeout = setTimeout(() => {
        scrollInterval = startAutoScroll();
      }, 3000);
    };

    // Initialize auto-scroll
    let scrollInterval = startAutoScroll();

    // Translate vertical scroll to horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      if (wheelLock) {
        setTimeout(() => {
          return handleWheel(e);
        }, 1000);
      }
      setWheelLock(true);
      // if (window.innerWidth > 768) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        carousel.scrollBy({
          left: e.deltaY,
          behavior: "smooth",
        });
      }
      setWheelLock(false);
    };

    carousel.addEventListener("scroll", handleScroll);
    carousel.addEventListener("wheel", handleWheel);

    if (containerRef.current && variant === "no-scrollbar") {
      containerRef.current.style.scrollbarWidth = "none";
    }

    return () => {
      clearInterval(scrollInterval);
      clearTimeout(scrollTimeout);
      carousel.removeEventListener("scroll", handleScroll);
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (onMount) onMount();
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: containerRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);
  return (
    <div className={classNames("relative w-full", className)} ref={ref}>
      {variant === "no-scrollbar" && !isStart && (
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
          onClick={() => scrollTo("left")}
        >
          <ChevronLeftIcon className="animate-pulse" />
        </button>
      )}

      <div
        ref={containerRef}
        onScroll={scrollHandler}
        className={classNames("flex overflow-x-auto scroll-smooth", {
          "scrollbar-none": variant === "no-scrollbar",
        })}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 m-2">
            {item}
          </div>
        ))}
      </div>

      {variant === "no-scrollbar" && !isEnd && !isStart && (
        <button
          className="opacity-75 absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
          onClick={() => scrollTo("right")}
        >
          <ChevronRightIcon className="animate-pulse" />
        </button>
      )}
    </div>
  );
};

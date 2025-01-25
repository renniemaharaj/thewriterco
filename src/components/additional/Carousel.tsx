import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { debounce } from "lodash";

type CarouselVariant = "default" | "no-scrollbar";

type CarouselProps = {
  items: React.ReactNode[];
  variant?: CarouselVariant;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  autoScroll?: boolean;
};

export const Carousel: React.FC<CarouselProps> = ({
  items,
  variant = "default",
  className,
  ref,
  autoScroll = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [charge, setCharge] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const maxCharge = 777; // Maximum charge for proportional scrolling

  const scrollHandler = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsStart(scrollLeft <= 10);
      setIsEnd(scrollWidth > scrollLeft + clientWidth + 10);
    }
  };

  const scrollTo = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Effect for proportional scrolling based on charge
  useEffect(() => {
    const carousel = containerRef.current;
    if (!carousel || charge === 0) return;

    const scrollAmount = (charge / maxCharge) * carousel.clientWidth;
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });

    // Reset charge after handling
    const resetTimer = setTimeout(() => setCharge(0), 200); // 200ms delay
    return () => clearTimeout(resetTimer);
  }, [charge]);

  // Wheel event to update charge
  useEffect(() => {
    const carousel = containerRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? -1 : 1; // Scroll up is left, scroll down is right
        setCharge((prev) =>
          Math.max(
            -maxCharge,
            Math.min(maxCharge, prev + delta * Math.abs(e.deltaY)),
          ),
        );
      }
    };

    const handleScroll = debounce(scrollHandler, 50); // Debounce scroll updates

    carousel.addEventListener("wheel", handleWheel);
    carousel.addEventListener("scroll", handleScroll);

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-scroll feature
  useEffect(() => {
    if (!autoScroll || !containerRef.current) return;
    const carousel = containerRef.current;

    const autoScrollInterval = setInterval(() => {
      if (carousel.scrollWidth > carousel.clientWidth) {
        const isEnd =
          carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
        carousel.scrollTo({
          left: isEnd ? 0 : carousel.scrollLeft + carousel.clientWidth,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(autoScrollInterval);
  }, [autoScroll]);

  if (containerRef.current && variant === "no-scrollbar") {
    containerRef.current.style.scrollbarWidth = "none";
  }

  const arrowButtonClassnames =
    "absolute !scale-75 top-1/2 transform -translate-y-1/2 z-10 p-1 bg-[#3e63dd] rounded-full shadow-md opacity-80 text-white";

  return (
    <div className={classNames("relative w-full", className)} ref={ref}>
      {variant === "no-scrollbar" && !isStart && (
        <button
          className={arrowButtonClassnames + " left-0"}
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

      {variant === "no-scrollbar" && isEnd && (
        <button
          className={arrowButtonClassnames + " right-0"}
          onClick={() => scrollTo("right")}
        >
          <ChevronRightIcon className="animate-pulse" />
        </button>
      )}
    </div>
  );
};

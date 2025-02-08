import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { debounce } from "lodash";
import { Observer } from "../observer/Observer";

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
  const maxCharge = useRef(777); // Maximum charge for proportional scrolling
  const isInView = useRef(false);

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

    const scrollAmount = (charge / maxCharge.current) * carousel.clientWidth;
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
        if (delta > 0) {
          scrollTo("right");
        } else {
          scrollTo("left");
        }
      }
    };

    const handleWheelDebounced = (e: WheelEvent) => {
      debounce(handleWheel, 90)(e);
      e.preventDefault();
    }; // Debounce wheel updates
    const handleScroll = debounce(scrollHandler, 50); // Debounce scroll updates

    carousel.addEventListener("wheel", handleWheelDebounced);
    carousel.addEventListener("scroll", handleScroll);

    return () => {
      carousel.removeEventListener("wheel", handleWheelDebounced);
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-scroll feature
  useEffect(() => {
    if (!autoScroll || !containerRef.current) return;
    const carousel = containerRef.current;

    const autoScrollInterval = setInterval(() => {
      if (!isInView.current) return;
      if (carousel.scrollWidth > carousel.clientWidth) {
        // Get all the child elements of the carousel
        const carouselItems = Array.from(carousel.children);

        // If there are children in the carousel
        if (carouselItems.length > 0) {
          // Pick a random item from the carousel items
          const randomIndex = Math.floor(Math.random() * carouselItems.length);
          const randomItem = carouselItems[randomIndex];

          // Scroll the selected item into view smoothly
          randomItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest", // Align the item in the nearest block (vertical positioning)
            inline: "center", // Align the item to the center horizontally
          });
        }
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(autoScrollInterval);
  }, [autoScroll]);

  const arrowButtonClassnames =
    "absolute !scale-75 top-1/2 transform -translate-y-1/2 z-10 p-1 bg-[#3e63dd] rounded-full shadow-md opacity-80 text-white";

  useEffect(() => {
    if (containerRef.current && variant === "no-scrollbar") {
      containerRef.current.style.scrollbarWidth = "none";
    }

    // maxCharge.current = containerRef.current?.clientWidth || 777;
  }, [containerRef]);

  return (
    <div className={classNames("relative w-full", className)} ref={ref}>
      <Observer
        options={{ root: ref?.current, rootMargin: "0px", threshold: 1.0 }}
      >
        {({ isIntersecting }) => {
          isInView.current = isIntersecting;
          return <></>;
        }}
      </Observer>
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

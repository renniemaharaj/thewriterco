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
  autoScroll = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const currentChildIndexRef = useRef(0);
  const isInView = useRef(false);

  const updateScrollStatus = () => {
    if (containerRef.current) {
      // const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsStart(currentChildIndexRef.current === 0);
      setIsEnd(currentChildIndexRef.current === items.length - 1);
    }
  };

  const scrollToChild = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const carousel = containerRef.current;
    const children = Array.from(carousel.children);

    if (children.length === 0) return;

    let newIndex = currentChildIndexRef.current;
    if (direction === "right") {
      newIndex = children.findIndex(
        (_, idx) => idx > currentChildIndexRef.current,
      );
      if (newIndex === -1) {
        newIndex = 0; // Restart at beginning
        setIsEnd(true);
      }
    } else {
      newIndex = children.findIndex(
        (_, idx) => idx < currentChildIndexRef.current,
      );
      if (newIndex === -1) {
        newIndex = children.length - 1; // Restart at end
        setIsStart(true);
      }
    }

    currentChildIndexRef.current = newIndex;
    children[newIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    updateScrollStatus();
  };

  useEffect(() => {
    if (!autoScroll || !containerRef.current) return;
    const autoScrollInterval = setInterval(() => {
      if (!isInView.current) return;
      scrollToChild("right");
    }, 10000);

    return () => clearInterval(autoScrollInterval);
  }, [autoScroll]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.scrollbarWidth = "none";
  }, [containerRef.current]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const direction = e.deltaY < 0 ? "left" : "right";
      debouncedScroll(direction);
    }
  };

  const debouncedScroll = debounce((direction: "left" | "right") => {
    scrollToChild(direction);
  }, 90);

  useEffect(() => {
    const carousel = containerRef.current;
    if (!carousel) return;

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e);
    };

    carousel.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => {
      carousel.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

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
          className="absolute !scale-75 left-0 top-1/2 transform -translate-y-1/2 z-10 p-1 bg-[#3e63dd] rounded-full shadow-md opacity-80 text-white"
          onClick={() => scrollToChild("left")}
        >
          <ChevronLeftIcon className="animate-pulse" />
        </button>
      )}

      <div
        ref={containerRef}
        onScroll={debounce(updateScrollStatus, 50)}
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

      {variant === "no-scrollbar" && !isEnd && (
        <button
          className="absolute !scale-75 right-0 top-1/2 transform -translate-y-1/2 z-10 p-1 bg-[#3e63dd] rounded-full shadow-md opacity-80 text-white"
          onClick={() => scrollToChild("right")}
        >
          <ChevronRightIcon className="animate-pulse" />
        </button>
      )}
    </div>
  );
};

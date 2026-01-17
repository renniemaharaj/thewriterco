import { IconButton } from "@radix-ui/themes";
import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

type CarouselProps = {
  items: React.ReactNode[];
  className?: string;
};

export const Carousel: React.FC<CarouselProps> = ({ items, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Update scroll bounds
  const updateScrollState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Attach listeners
  useEffect(() => {
    if (!emblaApi) return;

    updateScrollState();
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);
  }, [emblaApi, updateScrollState]);

  // Optional: Enable mouse wheel scrolling
  useEffect(() => {
    if (!emblaApi) return;

    const node = emblaApi.containerNode();
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        if (e.deltaY > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
      }
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [emblaApi]);

  const arrowButtonClassnames =
    "!absolute !top-1/2 !transform !-translate-y-1/2 !z-10 !shadow-md opacity-80";

  return (
    <div className={classNames("relative w-full", className)}>
      {canScrollPrev && (
        <IconButton
          variant="soft"
          className={arrowButtonClassnames + " !left-0"}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeftIcon className="animate-pulse" />
        </IconButton>
      )}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_auto]">
              {item}
            </div>
          ))}
        </div>
      </div>

      {canScrollNext && (
        <IconButton
          variant="soft"
          className={arrowButtonClassnames + " !right-0"}
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRightIcon className="animate-pulse" />
        </IconButton>
      )}
    </div>
  );
};

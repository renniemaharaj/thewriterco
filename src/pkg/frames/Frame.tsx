import { Skeleton } from "@radix-ui/themes";
import { positionClasses } from "./positions";
import type { FrameBarSetup } from "./types";

const Frame: React.FC<FrameBarSetup> = ({ frameBars, isAnimating, animationDuration }) => {
  return (
    <>
      {frameBars.map((frame, index) => {
        const baseClassName = positionClasses[frame.position] || "";
        const sizeClass = frame.size || ""; // Allow size override
        return (
          <Skeleton
            key={index}
            className={`${baseClassName}
              absolute z-10 blurred-div-light
              ${isAnimating && `transition-all ${animationDuration}`}
                ${isAnimating && `bounce-transition`}
              ${sizeClass} ${frame.size2}
            `}
          />
        );
      })}
    </>
  );
};

export default Frame;

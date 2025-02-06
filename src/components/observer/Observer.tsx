import { ReactNode } from "react";
import useIntersectionObserver, {
  IntersectionObserverOptions,
} from "./useIntersectionObserver";

interface ObserverProps {
  options: IntersectionObserverOptions;
  children: (state: {
    isIntersecting: boolean;
    hasIntersected: boolean;
  }) => ReactNode;
}

const Observer: React.FC<ObserverProps> = ({ options, children }) => {
  const { targetRef, isIntersecting, hasIntersected } =
    useIntersectionObserver(options);

  return (
    <div
      ref={targetRef}
      style={{
        minHeight:
          "!absolute 50px left 50% top 50% transform -translate-x-1/2 -translate-y-1/2",
      }}
    >
      {children({ isIntersecting, hasIntersected })}
    </div>
  );
};

export { Observer };

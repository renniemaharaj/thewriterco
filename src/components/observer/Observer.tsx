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
        minHeight: "50px",
      }}
    >
      {children({ isIntersecting, hasIntersected })}
    </div>
  );
};

export { Observer };

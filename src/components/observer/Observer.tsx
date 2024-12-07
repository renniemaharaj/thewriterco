import { ReactNode, useEffect, useState } from "react";
import useIntersectionObserver from "../hooks/useObserver";

export interface ObserveProps {
  children: ({
    isIntersecting,
    madeAppearance,
  }: {
    isIntersecting: boolean;
    madeAppearance: boolean;
  }) => ReactNode;
  root?: Element | null;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  regex?: RegExp; // Regex to match tokens
  onMatch?: (matchedToken: string) => void; // Callback when regex matches
  onIntersect?: () => void; // Callback when intersecting
  onExit?: () => void; // Callback when leaving viewport
}

/**
 * Observer component that tracks intersection and optionally matches tokens using regex.
 */
export default function Observer({
  children,
  root = null,
  threshold = 0.1,
  rootMargin = "0px",
  regex,
  onMatch,
  onIntersect,
  onExit,
  ...props
}: ObserveProps) {
  const { isIntersecting, elementRef } = useIntersectionObserver({
    root,
    threshold,
    rootMargin,
  });
  const [madeAppearance, setMadeAppearance] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      if (!madeAppearance) {
        setMadeAppearance(true);
      }
      if (onIntersect) {
        onIntersect();
      }
    } else if (!isIntersecting && madeAppearance && onExit) {
      onExit();
    }
  }, [isIntersecting, madeAppearance, onIntersect, onExit]);

  useEffect(() => {
    // Check if regex matches tokens and call onMatch
    if (regex && isIntersecting) {
      const content = elementRef.current?.textContent || "";
      const matches = content.match(regex);
      if (matches && onMatch) {
        matches.forEach((token) => onMatch(token));
      }
    }
  }, [regex, isIntersecting, onMatch, elementRef]);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={props.className}
      style={props.style}
    >
      {children({ isIntersecting, madeAppearance })}
    </div>
  );
}

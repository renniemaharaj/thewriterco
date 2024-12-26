import { useState, useEffect, useRef, MutableRefObject } from "react";

type ElementData = {
  isVisible?: boolean;
  ref: MutableRefObject<HTMLElement | null>;
};

type MatchingElement = ElementData & {
  isVisible: boolean;
};

export const useRegistryObserver = () => {
  const [matchingElements, setMatchingElements] = useState<MatchingElement[]>(
    [],
  );

  const elementsRegistry = useRef<ElementData[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const registerElement = (ref: MutableRefObject<HTMLElement | null>) => {
    elementsRegistry.current.push({ ref });
    if (ref.current) {
      observer.current?.observe(ref.current);
    }
  };

  useEffect(() => {
    // Create IntersectionObserver instance
    observer.current = new IntersectionObserver((entries) => {
      let hasChanges = false;

      const updatedElements = elementsRegistry.current.map((el) => {
        const entry = entries.find((e) => e.target === el.ref.current);
        const isVisible = entry ? entry.isIntersecting : false;

        if (el.ref.current && el.isVisible !== isVisible) {
          hasChanges = true;
        }

        return { ...el, isVisible };
      });

      if (hasChanges) {
        setMatchingElements(updatedElements);
      }
    });

    return () => {
      observer.current?.disconnect();
      observer.current = null;
    };
  }, []);

  return { matchingElements, registerElement };
};

// Example Usage
/*
import React, { useRef, useEffect } from "react";
import { useContentObserver } from "./useContentObserver";

const Component = () => {
  const { matchingElements, registerElement } = useContentObserver();

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerElement("div", "Hello, world!", ref1);
    registerElement("span", "Some text here.", ref2);
  }, []);

  return (
    <div>
      <div ref={ref1}>Hello, world!</div>
      <span ref={ref2}>Some text here.</span>

      <div>
        <h3>Matching Elements</h3>
        {matchingElements.map((el, i) => (
          <div key={i}>
            {el.type} - {el.content} ({el.isVisible ? "Visible" : "Hidden"})
          </div>
        ))}
      </div>
    </div>
  );
};
*/

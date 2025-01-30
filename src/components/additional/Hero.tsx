// components/Hero.tsx
import { Flex } from "@radix-ui/themes";
import React from "react";

const Hero: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <section className="text-center py-16">
      <h2 ref={ref} className="text-4xl font-bold">
        Welcome to{" "}
        <span className="w-full text-center">The Writer Company</span>
      </h2>
      <Flex justify={"center"} className="w-full p-4">
        <p>
          Explore documented content, written poetry, articles and more (soon).
        </p>
      </Flex>
    </section>
  );
};

export default Hero;

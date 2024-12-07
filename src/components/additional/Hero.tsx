// components/Hero.tsx
import { Flex } from "@radix-ui/themes";
import React from "react";
import Hint from "../Hint";

const Hero: React.FC = () => {
  return (
    <section className="text-center py-16">
      <h2 className="text-4xl font-bold">
        Welcome to{" "}
        <span className="w-full text-center">The Writer Company</span>
      </h2>
      <Flex justify={"center"} className="w-full p-4">
        <p>
          Explore documented content, written poetry, articles and more by
          Rennie Maharaj
        </p>
      </Flex>
      <Hint>The Writer Company is cost-free and will always be</Hint>
    </section>
  );
};

export default Hero;

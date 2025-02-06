// components/Hero.tsx
import { Code, Flex, Quote, Text, Tooltip } from "@radix-ui/themes";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="text-center py-16">
      <h2 className="text-4xl font-bold">
        Welcome to{" "}
        <span className="w-full text-center">The Writer Company</span>
      </h2>
      <Flex justify={"center"} className="w-full p-4">
        <Text>
          <Tooltip content="She shines brightly in the night sky">
            <Code variant="soft" className="animate-fade-in">
              {'const w = (s) => s.slice(1).padStart(4,"M")'}
            </Code>
          </Tooltip>
          <br />
          Explore documented content, written poetry, articles and more{" "}
          <Code variant="soft" className="animate-fade-in">
            w(soon)
          </Code>
          .
          <br />
          <br />
          <Quote className="italic animate-fade-in">
            But without faith it is impossible to please him:
            <br />
            for he that cometh to God must believe that he is,
            <br />
            and that he is a rewarder of them that diligently seek him.
          </Quote>
        </Text>
      </Flex>
    </section>
  );
};

export default Hero;

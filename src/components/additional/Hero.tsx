// components/Hero.tsx
import { Flex, Quote, Text } from "@radix-ui/themes";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="text-center py-16">
      <h2 className="text-4xl font-bold">
        Welcome to{" "}
        <span className="w-full text-center">
          The Writer <br />
          Company
        </span>
      </h2>
      <Flex justify={"center"} className="w-full p-1">
        <Text>
          <br />
          <br />
          <Quote className="italic animate-fade-in">
            My companion in writing for God;
            <br />
            Time reveals the hands of God.
            <br />
            <br />
            Time is like a notebook and God is the author. Except, we cannot
            skip these <br /> pages-neither can we foresee the next hour.
            <br />
            <br />
            No, we have no such power, but ask those with older ages,
            <br />
            They have been through our current storm.
            <br />
            <br />
            They shall bear witness that time reveals the hands of God.
          </Quote>
        </Text>
      </Flex>
    </section>
  );
};

export default Hero;

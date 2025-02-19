// components/Hero.tsx
// import { Flex, Quote, Text } from "@radix-ui/themes";
import React from "react";
import Hint from "../Hint";

const Hero: React.FC = () => {
  return (
    <section className="text-center pb-10">
      <h2 className="text-2xl font-bold">
        Welcome to{" "}
        <span className="w-full text-center">
          The Writer <br />
          Company
        </span>
      </h2>
      {/* <Flex justify={"center"} className="w-full p-1">
        <Text>
          <br />
          <br />
          <Quote className="italic animate-fade-in">
            My companion in writing for God;
            <br />
            time reveals the hands of God,
            <br />
            <br />
            Time is like a notebook and God is the author. Except, we cannot
            skip His <br /> pages, and likewise, we cannot foresee the next
            hour.
            <br />
            <br />
            No, we have no such power, but ask those with older ages,
            <br />
            they have been through our current storm.
            <br />
            <br />
            They shall bear witness that time reveals the hands of God.
          </Quote>
        </Text>
      </Flex> */}
      <Hint className="max-w-[400px] overflow-hidden">
        We're here to: give reasoning for faith; reinforcement to your shield,
        🛡️
        {/* <br /> */}
        Wherewith ye shall quench all the fiery darts of the wicked. For his bow
        is set with a fiery deception 🏹
      </Hint>
    </section>
  );
};

export default Hero;

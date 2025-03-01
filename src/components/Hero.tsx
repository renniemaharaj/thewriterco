import React, { ReactNode } from "react";
import Hint from "./Hint";

export type HeroProps = {
  header: ReactNode;
  subHeader: ReactNode;
  hint?: ReactNode;
};
const Hero: React.FC<HeroProps> = ({ header, subHeader, hint }) => {
  return (
    <section className="text-center pb-10">
      <h2 className="text-2xl font-bold">
        {header} <span className="w-full text-center">{subHeader}</span>
      </h2>
      {hint && <Hint className="max-w-[400px] overflow-hidden">{hint}</Hint>}
    </section>
  );
};

export default Hero;

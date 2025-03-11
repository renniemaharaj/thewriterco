import React from "react";
import Header from "./Header";
import { Box } from "@radix-ui/themes";

type ContentProps = {
  header: string;
  children: React.ReactNode;
};
const Content: React.FC<ContentProps> = ({ header, children: content }) => {
  return (
    <Box className="p-4">
      <Header content={header} />
      <br />
      {content}
    </Box>
  );
};

export default Content;

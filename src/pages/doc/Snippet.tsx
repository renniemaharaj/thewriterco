import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useThemeContext } from "../../components/context/theme/useThemeContext";

export type SnippetProps = {
  code: string;
  language: string;
};

const Snippet: React.FC<SnippetProps> = ({ code, language }) => {
  const { theme } = useThemeContext();
  return (
    <SyntaxHighlighter
      language={language}
      style={theme === "dark" ? dracula : solarizedlight}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default Snippet;

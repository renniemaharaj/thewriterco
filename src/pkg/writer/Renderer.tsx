/* eslint-disable @typescript-eslint/no-explicit-any */

import RichTextEditor from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";
import "prism-code-editor-lightweight/layout.css";
import "prism-code-editor-lightweight/themes/github-dark.css";
import "katex/dist/katex.min.css";
import "easydrawer/styles.css";
import "react-image-crop/dist/ReactCrop.css";
import extensions from "./extenstions";
import { useThemeContext } from "../context/theme/useThemeContext";
import { useEffect, useState } from "react";
import Edit from "./Edit";

function Renderer({ content }: { content: string }) {
  const [localContent, setLocalContent] = useState(content);

  const [key, setKey] = useState(1);

  const { theme } = useThemeContext();

  useEffect(() => {
    setLocalContent(content);
    setKey((prev) => prev + 1);
  }, [content]);

  return (
    <main>
      <div className="relative">
        <Edit content={content} />
        <RichTextEditor
          output="html"
          key={key}
          content={localContent as any}
          extensions={extensions}
          dark={theme === "dark"}
          disableBubble
          hideBubble
          removeDefaultWrapper
          hideToolbar
          disabled
        />
      </div>
    </main>
  );
}

export default Renderer;

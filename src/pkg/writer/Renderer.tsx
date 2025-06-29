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
import { useAnimateCopy } from "../hooks/useAnimateCopy";
import { motion } from "framer-motion";

function Renderer({ content }: { content: string }) {
  const [localContent, setLocalContent] = useState(content);

  const { animateCopy, animationClass } = useAnimateCopy(1000);

  const [key, setKey] = useState(1);

  const { theme } = useThemeContext();

  useEffect(() => {
    setLocalContent(content);
    setKey((prev) => prev + 1);
  }, [content]);

  return (
    <main>
      <div className={`!relative !overflow-visible`}>
        <div className={`${animationClass}`} />
        <div className="sticky top-[3.2rem] left-0 z-10">
          <Edit animateCopy={animateCopy} content={content} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
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
        </motion.div>
      </div>
    </main>
  );
}

export default Renderer;

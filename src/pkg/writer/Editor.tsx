/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import RichTextEditor from "reactjs-tiptap-editor";

import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  // BubbleMenuExcalidraw,
  // BubbleMenuMermaid,
  BubbleMenuDrawer,
} from "reactjs-tiptap-editor/bubble-extra";

import "reactjs-tiptap-editor/style.css";
import "prism-code-editor-lightweight/layout.css";
import "prism-code-editor-lightweight/themes/github-dark.css";

import "katex/dist/katex.min.css";
import "easydrawer/styles.css";
import "react-image-crop/dist/ReactCrop.css";
import { useThemeContext } from "../context/theme/useThemeContext";
import extensions from "./extenstions";
import File from "./File";
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "../../app/writer/writerSlice";
import { debounce } from "lodash";
import { RootState } from "../../app/store";
// import { useOrientation } from "../hooks/useOrientation";
import { Card, Flex } from "@radix-ui/themes";

// const DEFAULT = "";

function Editor() {
  const content = useSelector((state: RootState) => state.writer.content);
  const [localContent, setLocalContent] = useState(content);
  const { theme } = useThemeContext();

  // const orientation = useOrientation();

  const dispatch = useDispatch();

  const [key, setKey] = useState(1);

  const triggerRemount = () => setKey((prev) => prev + 1);

  const onValueChange = debounce((value: any) => setLocalContent(value), 300);

  useEffect(() => {
    dispatch(setContent(localContent));
  }, [localContent, dispatch]);

  return (
    <Flex className="gap-3 !overflow-visible">
      <Flex className="!hidden md:!flex">
        <Card className="!p-1 h-fit w-fit !sticky !top-[3rem]">
          <File
            setEditorContent={setLocalContent}
            triggerRemount={triggerRemount}
          />
        </Card>
      </Flex>

      <Flex>
        <RichTextEditor
          output="html"
          key={key}
          content={localContent as any}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme === "dark"}
          // disabled={disable}
          bubbleMenu={{
            render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
              return (
                <>
                  {bubbleDefaultDom}
                  {extensionsNames.includes("twitter") && (
                    <BubbleMenuTwitter
                      disabled={disabled}
                      editor={editor}
                      key="twitter"
                    />
                  )}
                  {extensionsNames.includes("katex") && (
                    <BubbleMenuKatex
                      disabled={disabled}
                      editor={editor}
                      key="katex"
                    />
                  )}
                  {/* {extensionsNames.includes("excalidraw") && (
                    <BubbleMenuExcalidraw
                      disabled={disabled}
                      editor={editor}
                      key="excalidraw"
                    />
                  )}
                  {extensionsNames.includes("mermaid") && (
                    <BubbleMenuMermaid
                      disabled={disabled}
                      editor={editor}
                      key="mermaid"
                    />
                  )} */}
                  {extensionsNames.includes("drawer") && (
                    <BubbleMenuDrawer
                      disabled={disabled}
                      editor={editor}
                      key="drawer"
                    />
                  )}
                </>
              );
            },
          }}
        />
      </Flex>
    </Flex>
  );
}

export default Editor;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import RichTextEditor from "reactjs-tiptap-editor";

import "reactjs-tiptap-editor/style.css";
import "prism-code-editor-lightweight/layout.css";
import "prism-code-editor-lightweight/themes/github-dark.css";

import "katex/dist/katex.min.css";
import "easydrawer/styles.css";
import "react-image-crop/dist/ReactCrop.css";
import { useThemeContext } from "../context/theme/useThemeContext";
import extensions from "./extenstions";
import File from "./custom/file/File";
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "../../app/writer/writerSlice";
import { debounce } from "lodash";
import { RootState } from "../../app/store";
import { useSetAtom } from "jotai";
import { extraHeaderItemsAtom } from "../../app/_atoms/reader/atoms";
import Fullscreen from "./custom/fullscreen/Fullscreen";

// const DEFAULT = "";

function Editor() {
  const content = useSelector((state: RootState) => state.writer.content);

  const setExtraHeaderItems = useSetAtom(extraHeaderItemsAtom);

  const [localContent, setLocalContent] = useState(content);
  const { theme } = useThemeContext();

  const dispatch = useDispatch();

  const [key, setKey] = useState(1);

  const triggerRemount = () => setKey((prev) => prev + 1);

  const onValueChange = debounce((value: any) => setLocalContent(value), 300);

  useEffect(() => {
    dispatch(setContent(localContent));
  }, [localContent, dispatch]);

  useEffect(() => {
    setExtraHeaderItems([
      <File
        setEditorContent={setLocalContent}
        triggerRemount={triggerRemount}
      />,
      <Fullscreen />,
    ]);

    return () => setExtraHeaderItems([]);
  }, []);

  return (
    <main>
      <div>
        <div className="blurred-div z-10">
          <RichTextEditor
            output="html"
            key={key}
            content={localContent as any}
            onChangeContent={onValueChange}
            extensions={extensions}
            dark={theme === "dark"}
          />
        </div>
      </div>
    </main>
  );
}

export default Editor;

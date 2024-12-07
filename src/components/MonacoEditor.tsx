import { memo, useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useThemeContext } from "./context/useThemeContext";
import { editor } from "monaco-editor";
import { debounce } from "lodash";

const MonacoEditor = ({
  height,
  language,
  code,
  onChange,
  editable = true, // Default to editable
}: {
  height: number;
  language: string;
  code: string;
  variant?: "1" | "2" | "3";
  onChange?: (value: string) => void;
  editable?: boolean;
}) => {
  const { theme } = useThemeContext();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [codeContent, setCodeContent] = useState(code);
  const ignoreChangeRef = useRef(false);
  const onEditorMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
    setEditorValue(codeContent);
  };

  const setEditorValue = (code: string) => {
    if (editorRef.current && !ignoreChangeRef.current) {
      console.log("CUpdating editor", code);
      const currentModel = editorRef.current.getModel();
      const currentValue = currentModel?.getValue();

      // Update editor content only if the new code is different
      if (!code) editorRef.current.setValue("");
      if (currentValue === code) return;
      if (code && currentValue !== code) editorRef.current.setValue(code);
      // debounceIgnoreChange(false);
    }
  };

  const setEditorValueCallback = useCallback(setEditorValue, []);
  useEffect(() => {
    setEditorValueCallback(codeContent);
  }, [codeContent, setEditorValueCallback]);

  useEffect(() => {
    if (!editorRef.current) console.log("Editor not mounted yet");
    console.log("Updating code content", code);
    setCodeContent(code);
  }, [code, setCodeContent]); // Runs whenever `code` changes

  const debounceClearIgnoreChange = useRef(
    debounce(() => {
      ignoreChangeRef.current = false;
    }, 500),
  );
  const debounceSendChanges = useRef(
    debounce((value: string) => {
      ignoreChangeRef.current = true;
      if (onChange) {
        onChange(value);
        debounceClearIgnoreChange.current();
      }
    }),
  );
  return (
    <Editor
      height={height}
      width="100%"
      language=""
      defaultLanguage={language}
      // value={code}
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
      onMount={onEditorMount}
      options={{
        readOnly: !editable,
      }}
      className="!overflow-hidden p-1"
      onChange={(value) => {
        debounceSendChanges.current(value ?? "");
      }}
    />
  );
};

export default memo(MonacoEditor);

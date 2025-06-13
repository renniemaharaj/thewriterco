import RichTextEditor from "reactjs-tiptap-editor";
// import { BaseKit } from 'reactjs-tiptap-editor/extension-bundle'; // for version 0.1.16 and lower

import { BaseKit } from "reactjs-tiptap-editor";

import { Blockquote } from "reactjs-tiptap-editor/blockquote";
import { Bold } from "reactjs-tiptap-editor/bold";
import { BulletList } from "reactjs-tiptap-editor/bulletlist";
import { Clear } from "reactjs-tiptap-editor/clear";
import { Code } from "reactjs-tiptap-editor/code";
import { CodeBlock } from "reactjs-tiptap-editor/codeblock";
import { Color } from "reactjs-tiptap-editor/color";
import { Document } from "reactjs-tiptap-editor/document";
import { FontFamily } from "reactjs-tiptap-editor/fontfamily";
import { FontSize } from "reactjs-tiptap-editor/fontsize";
import { FormatPainter } from "reactjs-tiptap-editor/formatpainter";
import { Heading } from "reactjs-tiptap-editor/heading";
import { Highlight } from "reactjs-tiptap-editor/highlight";
import { History } from "reactjs-tiptap-editor/history";
import { HorizontalRule } from "reactjs-tiptap-editor/horizontalrule";
import { Iframe } from "reactjs-tiptap-editor/iframe";

import { Image } from "reactjs-tiptap-editor/image";
import "react-image-crop/dist/ReactCrop.css";

import { Indent } from "reactjs-tiptap-editor/indent";
import { Italic } from "reactjs-tiptap-editor/italic";
import { LineHeight } from "reactjs-tiptap-editor/lineheight";
import { Link } from "reactjs-tiptap-editor/link";
import { ListItem } from "reactjs-tiptap-editor/listitem";
import { MoreMark } from "reactjs-tiptap-editor/moremark";
import { MultiColumn } from "reactjs-tiptap-editor/multicolumn";
import { OrderedList } from "reactjs-tiptap-editor/orderedlist";
import { Selection } from "reactjs-tiptap-editor/selection";
import { SlashCommand } from "reactjs-tiptap-editor/slashcommand";
import { Strike } from "reactjs-tiptap-editor/strike";
import { SubAndSuperScript } from "reactjs-tiptap-editor/subandsuperscript";
import { Table } from "reactjs-tiptap-editor/table";
import { TaskList } from "reactjs-tiptap-editor/tasklist";
import { TextAlign } from "reactjs-tiptap-editor/textalign";
import { TextBubble } from "reactjs-tiptap-editor/textbubble";
import { TrailingNode } from "reactjs-tiptap-editor/trailingnode";
import { TextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Video } from "reactjs-tiptap-editor/video";
import { SearchAndReplace } from "reactjs-tiptap-editor/searchandreplace";
import { Emoji } from "reactjs-tiptap-editor/emoji";

import { Katex } from "reactjs-tiptap-editor/katex";
import { ExportPdf } from "reactjs-tiptap-editor/exportpdf";
import { ImportWord } from "reactjs-tiptap-editor/importword";
import { ExportWord } from "reactjs-tiptap-editor/exportword";
import { TableOfContents } from "reactjs-tiptap-editor/tableofcontent";
import { Excalidraw } from "reactjs-tiptap-editor/excalidraw";
import { Mention } from "reactjs-tiptap-editor/mention";
import { Attachment } from "reactjs-tiptap-editor/attachment";
import { ImageGif } from "reactjs-tiptap-editor/imagegif";
// import { Mermaid } from "reactjs-tiptap-editor/mermaid";
import { Twitter } from "reactjs-tiptap-editor/twitter";

import { Drawer } from "reactjs-tiptap-editor/drawer";
import "easydrawer/styles.css";

// Import CSS
import "reactjs-tiptap-editor/style.css";

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true,
    },

    // Character count
    characterCount: {
      limit: 50_000,
    },
  }),
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  Document,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,

  Image,

  Indent,
  Italic,
  LineHeight,
  Link,
  ListItem,
  MoreMark,
  MultiColumn,
  OrderedList,
  Selection,
  SlashCommand,
  Strike,
  SubAndSuperScript,
  Table,
  TaskList,
  TextAlign,
  TextBubble,
  TrailingNode,
  TextUnderline,
  Video,
  SearchAndReplace,
  Emoji,

  Katex,
  ExportPdf,
  ImportWord,
  ExportWord,
  TableOfContents,
  Excalidraw,
  Mention,
  Attachment,
  ImageGif,
  // Mermaid,
  Twitter,

  Drawer,
];

/* eslint-disable */
const Editor = ({
  content,
  setContent,
}: {
  content: any;
  setContent: (content: any) => void;
}) => {
  /* eslint-disable */
  const onChangeContent = (value: any) => {
    setContent(value);
  };

  return (
    <RichTextEditor
      dark={false}
      output="html"
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  );
};

export default Editor;

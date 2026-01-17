import type { Block, MarkupResponse } from "../types";

const Model = ({ block }: { block: Block }) => {
  return (
    <div
      className="p-3 rounded-xl whitespace-pre-wrap"
      dangerouslySetInnerHTML={{
        __html: (block.content as MarkupResponse).markupContent,
      }}
    />
  );
};

export default Model;

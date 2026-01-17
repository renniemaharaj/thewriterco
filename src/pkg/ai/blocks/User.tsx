import type { Block, MarkupResponse } from "../types";

const User = ({ block }: { block: Block }) => {
  return (
    <div className="p-3 mt-4 rounded-xl whitespace-pre-wrap">
      {(block.content as MarkupResponse).markupContent}
    </div>
  );
};

export default User;

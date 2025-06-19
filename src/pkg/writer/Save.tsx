import { useEffect, useRef } from "react";
import Collapsible from "../Collapsible";
import { Save as a } from "../../app/writer/types";
import { Button, Flex } from "@radix-ui/themes";
import { CodeXml, Trash2 } from "lucide-react";
import FlexBreak from "./FlexBreak";

type SaveProps = {
  index: string;
  save: a;
  title: string;
  loadSave: (title: string) => void;
  deleteSave: (title: string) => void;
  fileMenuOpen?: boolean;
};

const Save = ({
  index,
  save,
  title,
  loadSave,
  deleteSave,
  fileMenuOpen,
}: SaveProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (title === save.title && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [title, save.title, fileMenuOpen]);

  return (
    <Collapsible
      key={index}
      title={save.title}
      collapsibleRef={elementRef}
      renderedTitle={
        <Flex>
          <span className="text-2xl">📄</span>
          <span
            className={`text-xs mt-1 text-center font-medium max-w-[11rem] overflow-hidden text-ellipsis whitespace-nowrap ${
              title === save.title && "!font-bold"
            }`}
          >
            {save.title}
          </span>
        </Flex>
      }
      className="!w-full !justify-start"
    >
      <Flex className="!flex-row !gap-3">
        <Button variant="ghost" onClick={() => loadSave(save.title)}>
          <CodeXml className="w-4 h-4" />
          Render
        </Button>

        <Button variant="ghost" onClick={() => deleteSave(save.title)}>
          <Trash2 className="w-4 h-4" />
          Trash
        </Button>
        <FlexBreak />
      </Flex>
    </Collapsible>
  );
};

export default Save;

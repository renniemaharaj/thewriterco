import { BookDownIcon, BookUpIcon } from "lucide-react";
import { toggleOpenState } from "../../app/ereader/ereaderSlice";
import Picker from "./Picker";
import { Button, IconButton } from "@radix-ui/themes";
import { useDispatch } from "react-redux";

const Renderer = ({
  hidePicker,
  isOpen,
  title,
}: {
  hidePicker: boolean;
  isOpen: boolean;
  title: string;
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${hidePicker && !isOpen ? "!hidden" : ""} flex justify-center gap-2 items-center p-4 border-b`}
    >
      {/* Picker component to select different books */}
      <Picker trigger={<Button variant="soft">{title}</Button>} />

      <IconButton
        onClick={() => dispatch(toggleOpenState())}
        aria-label="Toggle Ereader"
        variant="soft"
      >
        {isOpen ? <BookDownIcon /> : <BookUpIcon />}
      </IconButton>
    </div>
  );
};

export default Renderer;

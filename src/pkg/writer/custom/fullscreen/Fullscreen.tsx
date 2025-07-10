import { IconButton, Tooltip } from "@radix-ui/themes";
import { Maximize, Minimize } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFullScreen } from "../../../../app/writer/writerSlice";
import { RootState } from "../../../../app/store";

const Fullscreen = () => {
  const fullscreen = useSelector((state: RootState) => state.writer.fullscreen);
  const dispatch = useDispatch();
  return (
    <Tooltip content="Fullscreen Controls">
      <IconButton
        variant="soft"
        className="!right-1 !z-10"
        onClick={() => dispatch(setFullScreen(!fullscreen))}
      >
        {fullscreen ? <Minimize /> : <Maximize />}
      </IconButton>
    </Tooltip>
  );
};

export default Fullscreen;

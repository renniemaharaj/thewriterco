import { Flex, IconButton, Select, Tooltip } from "@radix-ui/themes";
import { PlusCircleIcon } from "lucide-react";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import MyPools from "./MyPools";

const Models = ({ className }: { className?: string }) => {
  const chatData = useSelector((state: RootState) => state.chat);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MyPools open={menuOpen} setOpen={setMenuOpen} />
      <Flex className={`!my-auto gap-2 ${className}`}>
        <Tooltip content="new model">
          <IconButton variant="ghost" className="!my-auto" disabled>
            <PlusCircleIcon onClick={() => setMenuOpen(!menuOpen)} />
          </IconButton>
        </Tooltip>
        <Select.Root defaultValue="firebase">
          <Select.Trigger />
          <Select.Content variant="soft">
            <Select.Group>
              <Select.Label>Google</Select.Label>
              <Select.Item value="firebase">Firebase</Select.Item>
              {chatData.models?.map(model => (
                <Select.Item value="custom">{model.displayName}</Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </>
  );
};

export default memo(Models);

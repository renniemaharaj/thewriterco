import {
  Badge,
  Code,
  DataList,
  Flex,
  IconButton,
  Link,
} from "@radix-ui/themes";
import { CopyIcon } from "lucide-react";
import { Model as Mod } from "../../app/chat/types";
import { memo } from "react";

const Model = ({ model }: { model: Mod }) => {
  return (
    <DataList.Root>
      <DataList.Item align="center">
        <DataList.Label minWidth="88px">Status</DataList.Label>
        <DataList.Value>
          <Badge color="gray" variant="soft" radius="full">
            Unchecked
          </Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">{model.displayName}</DataList.Label>
        <DataList.Value>
          <Flex align="center" gap="2">
            <Code variant="ghost">{model.key}</Code>
            <IconButton
              size="1"
              aria-label="Copy value"
              color="gray"
              variant="ghost"
            >
              <CopyIcon />
            </IconButton>
          </Flex>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Name</DataList.Label>
        <DataList.Value>Vlad Moroz</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Email</DataList.Label>
        <DataList.Value>
          <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Company</DataList.Label>
        <DataList.Value>
          <Link target="_blank" href="https://workos.com">
            WorkOS
          </Link>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};

export default memo(Model);

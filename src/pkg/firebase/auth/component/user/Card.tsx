import { Badge, Button, DataList, Flex, HoverCard, IconButton, Link } from "@radix-ui/themes";
import type { User } from "firebase/auth";
import Avatar from "./Avatar";

const Card = ({
  user,
  handleSignOut,
  handleSignIn,
}: {
  user: User | null;
  handleSignOut: () => Promise<void>;
  handleSignIn: () => Promise<void>;
}) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <IconButton variant="soft">
          <Avatar size={"1"} />
        </IconButton>
      </HoverCard.Trigger>

      <HoverCard.Content className="max-w-xs p-4">
        <Flex gap="4" align="start">
          <Avatar size={"2"} />
          <Flex direction="column" gap="3" className="w-full">
            <DataList.Root size="2">
              <DataList.Item>
                <DataList.Label minWidth="80px">Status</DataList.Label>
                <DataList.Value>
                  <Badge color={user ? "jade" : "red"} variant="soft" radius="full">
                    {user ? "Authorized" : "Unauthorized"}
                  </Badge>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="80px">Name</DataList.Label>
                <DataList.Value>{user?.displayName}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="80px">Email</DataList.Label>
                <DataList.Value>{user?.email}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="80px">Provider</DataList.Label>
                <DataList.Value>
                  {user && (
                    <Badge variant="soft" color="gray">
                      {user?.providerId}
                    </Badge>
                  )}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="80px">Company</DataList.Label>
                <DataList.Value>
                  <Link target="_blank" href="https://thewriterco.com">
                    TheWriterCo
                  </Link>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>

            <Button onClick={user ? handleSignOut : handleSignIn} variant="soft">
              {user ? "Sign Out" : "Sign In"}
            </Button>
          </Flex>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default Card;

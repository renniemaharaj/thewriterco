import { Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { useAtom, useAtomValue } from "jotai";
import { FlaskConical } from "lucide-react";
import { preferenceTagsAtom, tagsAvailableAtom } from "./atoms/labs";
import useReportReducers from "../../../pages/daily/hooks/useReportReducers";

const Labs = () => {
  const [preferenceTags, setPreferenceTags] = useAtom(preferenceTagsAtom);
  const tagsAvailable = useAtomValue(tagsAvailableAtom);
  const { reset } = useReportReducers();
  const toggleTag = (tag: string) => {
    reset(); // Reset reports when toggling tags
    setPreferenceTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton type="button" aria-label="Search" variant="soft">
          <FlaskConical width="20" height="20" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content width="360px">
        <Flex direction="column" gap="3" className="max-h-[400px]">
          {/* List */}
          <Flex
            direction="column"
            gap="2"
            className="overflow-y-auto pr-1 max-h-[300px]"
          >
            <Flex gap="1" wrap="wrap" mt="2" className="min-h-[1rem]">
              {tagsAvailable?.length ? (
                tagsAvailable.map((tag) => (
                  <Text
                    size="1"
                    color={preferenceTags.includes(tag) ? "blue" : "gray"}
                    onClick={() => toggleTag(tag)}
                    className="cursor-pointer"
                    key={tag}
                  >
                    #{tag}
                  </Text>
                ))
              ) : (
                <Flex className="text-sm italic px-2 py-1">
                  No preferences yet.
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Labs;

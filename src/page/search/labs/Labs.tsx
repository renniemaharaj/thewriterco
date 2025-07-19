import { Callout, Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { useAtom, useAtomValue } from "jotai";
import { FlaskConical } from "lucide-react";
import { preferenceTagsAtom, tagsAvailableAtom } from "./atoms/labs";
import useReportReducers from "../../../pages/daily/hooks/useReportReducers";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const Labs = () => {
  const [preferenceTags, setPreferenceTags] = useAtom(preferenceTagsAtom);
  const tagsAvailable = useAtomValue(tagsAvailableAtom);
  const { reset } = useReportReducers();
  const [warningTag, setWarningTag] = useState<string>("");
  const [passedTags, setPassedTags] = useState<string[]>([]);
  const toggleTag = (tag: string) => {
    reset(); // Reset reports when toggling tags
    if (preferenceTags.length > 10) {
      if (preferenceTags.includes(tag)) {
        setPreferenceTags((prev) => prev.filter((t) => t !== tag));
        return; // Allow removing tag if already present
      }
      setWarningTag(tag);
      setTimeout(() => setWarningTag(""), 3000); // Clear warning after
      return; // Prevent adding more than 10 tags
    }
    setPreferenceTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  useEffect(() => {
    setPassedTags([]);
    preferenceTags.forEach((tag) => {
      if (!tagsAvailable.includes(tag)) {
        setPassedTags((prev) => [...prev, tag]);
      }
    });
  }, [preferenceTags, tagsAvailable, setPreferenceTags]);
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
            <Callout.Root>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Please select 10 or fewer tags to filter your reports.
              </Callout.Text>
            </Callout.Root>

            <Flex gap="1" wrap="wrap" mt="2" className="min-h-[1rem]">
              {passedTags.length > 0 &&
                passedTags.map((tag) => (
                  <Text
                    size="1"
                    color="red"
                    key={tag}
                    onClick={() =>
                      setPreferenceTags((prev) => prev.filter((t) => t !== tag))
                    }
                    className="cursor-pointer"
                  >
                    #{tag}
                  </Text>
                ))}
            </Flex>

            <Flex gap="1" wrap="wrap" mt="2" className="min-h-[1rem]">
              {tagsAvailable?.length ? (
                tagsAvailable.map((tag) => (
                  <Text
                    size="1"
                    color={
                      preferenceTags.includes(tag)
                        ? "blue"
                        : warningTag === tag
                          ? "red"
                          : "gray"
                    }
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

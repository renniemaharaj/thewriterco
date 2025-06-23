import { Card, Flex, IconButton, Text } from "@radix-ui/themes";
import React, { memo, useEffect, useState } from "react";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

const LocationTile = () => {
  const [locationParts, setLocationParts] = useState<string[]>([]);

  useEffect(() => {
    setLocationParts(window.location.pathname.split("/"));
  }, []);

  const upperCaseFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <Card className="!flex !flex-row !w-full !items-center !h-12 !gap-2 !max-w-full">
      {locationParts.length > 1 && (
        <IconButton
          variant="ghost"
          onClick={() => (location.href = "/")}
          aria-label="Go to Home"
        >
          <HomeIcon />
        </IconButton>
      )}

      {locationParts.map((part, index) => (
        <React.Fragment key={`part-${index}`}>
          {part.trim() !== "" && (
            <Flex className="!overflow-clip !gap-2 !items-center !justify-centers rounded-full px-2 py-1">
              <Text color="gray">{upperCaseFirstLetter(part)}</Text>
            </Flex>
          )}

          {index < locationParts.length - 1 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
};

export default memo(LocationTile);

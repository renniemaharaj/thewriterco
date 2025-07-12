import { Flex, Skeleton } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";

const SkeletonBlock = () => {
  const [blockMounted, setBlockMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setBlockMounted(true), 100);
  }, []);

  const baseClassName =
    "w-3/4 !h-3 rounded mb-2 opacity-0 transition-opacity duration-700";

  const bones = [
    "!w-4/5 mt-5 delay-100",
    "!w-3/5 delay-200",
    "!w-2/5 delay-300",
  ];

  return (
    <Flex className="w-full p-3 gap-2">
      <Avatar role="model" />
      <Flex className="w-full p-3 flex-col">
        {bones.map((bone) => (
          <Skeleton
            className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} ${bone} !p-2`}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default SkeletonBlock;

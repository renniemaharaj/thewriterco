import { Card, Skeleton } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const SkeletonBlock = () => {
  const [blockMounted, setBlockMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setBlockMounted(true), 100);
  }, []);

  const baseClassName =
    "w-3/4 !h-3 rounded mb-2 opacity-0 transition-opacity duration-700";
  return (
    <Card
      variant="ghost"
      className="!border-none !w-full !mx-auto !outline-none"
    >
      <Skeleton
        className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-[70%] mt-5 delay-100 !p-2`}
      />
      <Skeleton
        className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-2/4 delay-200 !p-2`}
      />
      <Skeleton
        className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-1/4 delay-300 !p-2`}
      />
    </Card>
  );
};

export default SkeletonBlock;

import { Flex } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";
import Labs from "../../pkg/search/labs/Labs";
import Separator from "../../pkg/ui/Separator";

const FilterBar = () => {
  const { pathname } = useLocation();

  // Only show filter bar on daily page
  if (!pathname.startsWith("/daily")) {
    return null;
  }

  return (
    <>
      <Separator size="3" className="w-full" />
      <Flex
        className="w-full sticky top-[60px] md:top-[72px] bg-inherit shadow-sm py-2 md:py-3 px-4 md:px-6 gap-2 items-center z-9"
        gap="2"
      >
        <Labs />
      </Flex>
      <Separator size="3" className="w-full" />
    </>
  );
};

export default FilterBar;

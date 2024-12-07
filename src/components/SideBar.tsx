import { Flex } from "@radix-ui/themes";

const SideBar = ({
  centerBar,
  childLeft,
  childRight,
  className,
  variant,
  width,
  height,
}: {
  childLeft?: React.ReactNode;
  centerBar: React.ReactNode;

  childRight?: React.ReactNode;
  className?: string;
  variant: "left" | "center" | "right";

  width?: string;
  height?: string;
}) => {
  return (
    <Flex
      width={width}
      height={height}
      // align={"start"}
      justify={"center"}
      className={`gap-1 !flex-row h-full shadow-md shadow-gray-500 ${className}`}
    >
      {/** Left */}
      {variant === "center" && childLeft}
      {variant === "left" && childLeft}
      {variant === "left" && childRight}
      {/* Middle */}
      {centerBar}
      {/** Right */}
      {variant === "right" && childLeft}
      {variant === "right" && childRight}
      {variant === "center" && childRight}
    </Flex>
  );
};

export default SideBar;

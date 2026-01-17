import { Flex, Spinner as RSpinner } from "@radix-ui/themes";

const Spinner = ({
  className,
  size,
}: {
  className?: string;
  size?: "1" | "2" | "3";
}) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      className={`w-10 aspect-square rounded-full ${className}`}
    >
      <RSpinner size={size || "2"} className="scale-125 animate-spin !transition-all !delay-300" />
    </Flex>
  );
};

export default Spinner;

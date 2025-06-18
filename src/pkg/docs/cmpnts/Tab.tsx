import { Box } from "@radix-ui/themes";

const Tab = ({ title }: { title: string }) => {
  return <Box className="py-2">{title}</Box>;
};

export default Tab;

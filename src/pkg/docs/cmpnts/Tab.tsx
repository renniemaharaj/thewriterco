import { Box } from "@radix-ui/themes";

const Tab = ({ title }: { title: string }) => {
  return (
    <Box className="py-2">
      <h2>{title}</h2>
    </Box>
  );
};

export default Tab;

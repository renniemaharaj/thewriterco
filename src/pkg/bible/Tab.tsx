import { Box, Card } from "@radix-ui/themes";

const Tab = ({ title, selected }: { title: string; selected: boolean }) => {
  return (
    <Box
      className={`${!selected && "holographic-container"} !transition-all !duration-300 py-2`}
    >
      <Card
        variant={selected ? "ghost" : "surface"}
        className={`${!selected && "holographic-card"} !transition-all !duration-300 !py-2`}
      >
        <h2>{title}</h2>
      </Card>
    </Box>
  );
};

export default Tab;

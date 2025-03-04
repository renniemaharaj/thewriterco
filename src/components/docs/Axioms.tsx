import { Box, Link, Separator } from "@radix-ui/themes";
import Strong from "./Strong";
import Collapsible from "../Collapsible";
import { reasoningForAxioms } from "./Rationale";
import { instroduction } from "./Introduction";

const Axioms = () => {
  return (
    <Box className="space-y-4 !p-1">
      {/* <Card> */}
      <Collapsible
        title="Introduction"
        // maxHeight="max-h-[400?px]"
        children={instroduction}
      />
      {/* </Card> */}

      {reasoningForAxioms.map((axiom, index) => (
        // <Card className="!p-1" key={index}>
        <Collapsible
          maxHeight="max-h-[400px]"
          title={axiom.title}
          children={
            // <Card>
            <Strong
              key={index}
              point={axiom.title}
              content={axiom.description}
            />
            // </Card>
          }
        />
        // </Card>
      ))}
      <Separator size="4" className="!my-2" />
      <Link
        href="https://www.thewriterco.com/reasoning"
        className="text-center"
      >
        Source: The Writer Company
      </Link>
    </Box>
  );
};

export default Axioms;

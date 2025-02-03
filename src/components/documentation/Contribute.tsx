import { Box, Link, Text } from "@radix-ui/themes";
import Collapsible from "../Collapsible";

const Contribute = () => {
  return (
    <Box className="space-y-4 p-4">
      <Collapsible
        title="Developers Contribute"
        children={
          <Text size="2" className="!p-2">
            We are aiming to make this project completely open source soon, but
            we need help. Are you a full stack Christian developer? Do you have
            experience with either generative AI APIs, Golang, or React? We'd
            love to have you contribute to this non-profit project.{" "}
            <Link href="mailto:rvesprey@gmail.com">Email us</Link>
          </Text>
        }
      />
      <Collapsible
        title="Issues, Bugs, and Feedback"
        children={
          <Text size="2" className="!p-2">
            Please do report all issues and bugs to us. Your feedback is also
            welcome. <Link href="mailto:rvesprey@gmail.com">Email Report</Link>
          </Text>
        }
      />
    </Box>
  );
};

export default Contribute;

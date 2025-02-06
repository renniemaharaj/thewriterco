import { Flex } from "@radix-ui/themes";
import BeforeHeader from "../../components/BeforeHeader";
import Ereader from "../../components/additional/Ereader";

const index = () => {
  return (
    <Flex className="!w-full !flex-col merriweather-bold !p-0`">
      {/* <BeforeHeader /> */}
      <BeforeHeader />
      {/* <Ereader /> */}
      <Ereader hidePicker={true} />
    </Flex>
  );
};

export default index;

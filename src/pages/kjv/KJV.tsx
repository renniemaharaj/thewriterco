import Bible from "../../pkg/bible/Bible";
import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
import Page from "../../pkg/page/Page";
import { Card, Flex, Text } from "@radix-ui/themes";
import Hero from "../../pkg/page/Hero";

const KJV = () => {
  const dispatch = useDispatch();

  const setEreaderState = (eBook: EBook) => {
    dispatch(setEBook(eBook));
    dispatch(setRenderStyle("bible"));
  };

  return (
    <Page
      wrapChildren={true}
      title="KJV Bible"
      description="Read the KJV Bible"
      hero={
        <Hero
          header="The Word of God"
          subHeader="KJV"
          hint={
            <Text>
              The Writer Company is KJV only. We are against the subtle
              conditioning towards an ultimate acceptance of a watered-down
              bible version. 😬
            </Text>
          }
        />
      }
    >
      <Flex
        direction="column"
        align="center"
        className="w-full md:!w-[80%] mx-auto gap-6"
      >
        {/* Bible Reader */}
        <Bible showAnimation={true} setEBook={setEreaderState} />

        {/* Static Meta Info */}
        <Card className="text-center w-full">
          <Flex className="flex-row gap-4">
            <Text size="3" className="text-md font-bold mb-4" weight="bold">
              KJV Bible
            </Text>
            <Text size="3" color="gray">
              66 Books • 1,189 Chapters • 31,102 Verses
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
};

export default KJV;

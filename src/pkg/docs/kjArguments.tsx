import BreakII from "./cmpnts/BreakII";
import Content from "./cmpnts/Content";
import Text from "./cmpnts/Text";
import { CollapsibleItem } from "./cmpnts/Menu";
import Template from "./cmpnts/Template";

export const kjvArguments: CollapsibleItem[] = [
  {
    title: "Family of Texts",
    body: (
      <Template>
        <Content header="Family of Texts">
          <Text>
            Old Testament from Jerusalem (Hebrew Masoretic)
            <BreakII />
            New Testament from Antioch (Byzantine/Textus Receptus)
            <BreakII />
            Over 5,000 manuscripts in agreement
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Quality of Translators",
    body: (
      <Template>
        <Content header="Quality of Translators">
          <Text>
            47 highly educated scholars
            <BreakII />
            Many spoke 9 different languages
            <BreakII />
            Were Bible believers
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Text Preservation",
    body: (
      <Template>
        <Content header="Text Preservation">
          <Text>
            Maintains all verses
            <BreakII />
            Contains 60,000 more words than NIV
            <BreakII />
            No verses removed (like Acts 8:37)
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Mathematical Design",
    body: (
      <Template>
        <Content header="Mathematical Design">
          <Text>
            Many numerical patterns involving 7s and 1611
            <BreakII />
            Word counts that divide perfectly
            <BreakII />
            These patterns absent in other versions
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Historical Context",
    body: (
      <Template>
        <Content header="Historical Context">
          <Text>
            Came at right time in history
            <BreakII />
            Was purified 'seven times' through translations
            <BreakII />
            Published in 1611 after 7 years of work
          </Text>
        </Content>
      </Template>
    ),
  },
];

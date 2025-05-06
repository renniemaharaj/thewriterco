import Content from "./cmpnts/Content";
import { CollapsibleItem } from "./cmpnts/Menu";
import Template from "./cmpnts/Template";
import Text from "./cmpnts/Text";

export const axiomsContent: CollapsibleItem[] = [
  {
    title: "Existence of God",
    body: (
      <Template>
        <Content header="Existence of God">
          <Text>
            It is impossible for any created being to transcend creation and
            directly verify an external source, assume as true: God is.
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "KJV Bible as Truth",
    body: (
      <Template>
        <Content header="The authoritative written source">
          <Text>
            The KJV Bible is the complete and authoritative written source, and
            word of God.
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Jesus Christ as Truth",
    body: (
      <Template>
        <Content header="Jesus Christ as Truth, Lord Jesus!">
          <Text>
            This third axiom follows logically from the previous two. If God is,
            and the KJV Bible is true, then the KJV Bible's account of Jesus
            Christ's is also true. External historical sources also confirm the
            existence of Jesus Christ, but the KJV Bible is our primary source
            within this framework.
          </Text>
        </Content>
      </Template>
    ),
  },
];

import BreakII from "./cmpnts/BreakII";
import Content from "./cmpnts/Content";
import Text from "./cmpnts/Text";
import { CollapsibleItem } from "./cmpnts/Menu";
import Template from "./cmpnts/Template";

export const ftevidence: CollapsibleItem[] = [
  {
    title: "Does Truth Exist?",
    body: (
      <Template>
        <Content header="Does Truth Exist?">
          <Text>
            Claim: There is no truth. Response: Is that true?
            <BreakII /> Claim: There is no such thing as absolute truth.
            Response: Are you absolutely sure?
            <BreakII />
            Claim: There isn't the truth, only my truth. Response: Is that just
            your truth or the truth?
            <BreakII /> Claim: You ought not judge. Response: Isn't that a
            judgment?
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Does God Exist?",
    body: (
      <Template>
        <Content header="Does God Exist?">
          <Text>
            Cosmological Argument (Beginning of the Universe): If the universe
            had a beginning, it must have had a beginner. Evidence: Second Law
            of Thermodynamics, Universe is expanding, Radiation Afterglow, Great
            Galaxy Seeds, Einstein's Theory of General Relativity. Conclusion:
            The universe had a beginning, therefore it must have had a beginner.
            <BreakII /> Teleological Argument (Design): If there is design in
            the universe and life, there must be a designer. Evidence:
            Fine-tuning of the universe, Complexity of life (DNA). Conclusion:
            The universe and life are designed, therefore there must be a
            designer.
            <BreakII /> Moral Argument: If there is one thing morally wrong,
            there must be a God. Evidence: Objective moral values exist.
            Conclusion: There must be a moral lawgiver, which is God.
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Are Miracles Possible?",
    body: (
      <Template>
        <Content header="Are Miracles Possible?">
          <Text>
            Greatest Miracle: The creation of the universe out of nothing
            (Genesis 1:1). Evidence: Even atheists admit the universe had a
            beginning.
            <BreakII /> Purpose of Miracles: To show that someone speaks for
            God. Examples: Moses, Elijah, Jesus, and the apostles.
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "New Testament, Truth?",
    body: (
      <Template>
        <Content header="New Testament, Truth?">
          <Text>
            Embarrassing Stories: If the New Testament writers were making up
            stories, they wouldn't include embarrassing details about
            themselves. Examples: Disciples doubting Jesus, Peter being called
            Satan, Women discovering the empty tomb.
            <BreakII /> Excruciating Deaths: The New Testament writers were
            willing to die for their belief in the resurrection. Evidence: The
            apostles' beliefs and practices changed dramatically after the
            resurrection. They had no motive to lie and every motive to say it
            didn't happen if it wasn't true.
          </Text>
        </Content>
      </Template>
    ),
  },
  {
    title: "Conclusion",
    body: (
      <Template>
        <Content header="Conclusion?">
          <Text>
            Summary of Arguments: Truth Exists: Objective truth is real. God
            Exists: Supported by cosmological, teleological, and moral
            arguments. Miracles are Possible: If God exists, miracles are
            possible. New Testament Reliability: Embarrassing stories and
            excruciating deaths support the truth of the resurrection.
          </Text>
        </Content>
      </Template>
    ),
  },
];

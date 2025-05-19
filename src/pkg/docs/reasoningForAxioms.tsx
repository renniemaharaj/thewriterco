import { CollapsibleItem } from "./cmpnts/Menu";
import Template from "./cmpnts/Template";
import Content from "./cmpnts/Content";
import Text from "./cmpnts/Text";
import BreakII from "./cmpnts/BreakII";
import List from "./cmpnts/List";
import Strong from "./cmpnts/Strong";

export const reasoningForAxioms: CollapsibleItem[] = [
  {
    title: "Existence of God",
    body: (
      <Template>
        <Content header="Existence of God">
          <Text>
            Assume as true: <Strong>God is</Strong>. It is impossible for any
            created being to transcend creation and directly verify an external
            source. However, we have only two possible cases: either{" "}
            <Strong>God is</Strong> or he is not. We do not seek to convince nor
            prove to you that <Strong>God is</Strong>, but rather, we fully
            assume that <Strong>God is</Strong> for the purpose of this
            exploration.
            <BreakII />
            If you cannot explore the assumption that <Strong>God is</Strong>,
            then nothing within this framework will satisfy you because we make
            no attempt to prove God. Rather, we seek to construct a logical
            system from which the answers to four primitive questions can be
            derived. In mathematics, no one proves that a point has no size or
            that parallel lines never meet in Euclidean space; these are just
            taken as given, but required to construct a logical system. So why
            should the existence of God be treated differently?
            <BreakII />
            The demand for proof presupposes that God's existence must be
            demonstrable like a scientific hypothesis, but what if God's
            existence is more like an axiom—necessary to construct a logical
            system, and not derivable from something more fundamental?
            <BreakII />
            While science suggests a beginning, our detailed observations also
            lead us to perceive one. However, beyond mere beginnings, we
            recognize evidence of intelligent design. Intelligence alone does
            not necessitate personality, but the nature of design suggests
            intentionality and purpose, which point to an initiator with
            personality. Based on this inference, we establish a framework to
            derive answers to four primitive questions concerning the initiator
            of creation and creation itself:
            <BreakII />
            <List
              list={[
                "Who created?",
                "What was created?",
                "Why were these things created?",
                "How was it all created?",
              ]}
            />
            <BreakII />
            ;the questions of a man's heart.
            <BreakII />
            We assume that <Strong>God is</Strong> because without this
            assumption, deriving answers to all four questions becomes
            impossible. However, the answers to all four questions are essential
            for any sense of purpose. We cannot lay idle or buy into the
            distractions which distract us from asking these questions. No,
            these distractions are too costly, we cannot afford them, and we see
            through a system that enslaves us by our drive to afford these
            distractions. The end of the chase is emptiness. If these questions
            cannot be answered, then I have no drive to continue.
            <BreakII />
            We will derive the answers to all four questions in terms of the
            initiator of creation and creation itself. If we cannot derive
            consistent results then we know that the framework is flawed and we
            will abandon it. If we can derive consistent results then the
            framework is stable much like many concepts in mathematics.
            <BreakII />
            These four questions are required to be answered in terms of both
            creation and the initiator of creation since the single term,
            creation, is not sufficient by itself to derive the answers to all
            four questions, and we are determined to answer all four questions,
            but we must begin with the assumption that <Strong>God is</Strong>.
            <BreakII />
            Having established that <Strong>God is</Strong>, and that creation
            is, we now declare the following constraints for the two terms:
            creation and initiator, and their relationship:
            <BreakII />
            <List
              list={[
                "Initiator is.",
                "Creation is.",
                "Initiator not equals creation.",
                "Initiator, ultimately is one.",
              ]}
            />
            <BreakII />
            The assumed God, equals the initiator since we define initiator as
            an ultimate cause, the definition of God. Initiator is one. If there
            can be multiple initiators, their collaboration would require a
            higher governing cause, which itself must be singular and
            pre-existing. Thus, the initiator is necessarily one. We are not
            interested in proving or disproving the existence of God.
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
            word of God. Any conflicting translation—whether in character, word,
            verse, or chapter—is false. We have much information on the term:
            creation so building on the first axiom, we have established, and in
            our quest to answer the four fundamental questions, we now gather
            and analyze the information we have about the second term: God
            (Initiator). This information comes from scripture, but first, we
            must determine which scripture is true, since many claim to be true
            yet contradict each other.
            <BreakII />
            The true scripture must: Provide answers or pointers toward the
            answers to our four fundamental questions, They must be: internally
            consistent (without contradictions), consistent with the world
            around us (historically, prophetically, and doctrinally sound) and
            satisfy our constraints.
            <BreakII />
            Among all religious texts, we have chosen scripture from the
            Christian faith as our lead. Within Christianity, the KJV Bible
            stands as the most consistent, historically sound, and doctrinally
            pure version. We do not attempt to prove the KJV Bible to be true;
            rather, we assume it as true for the purpose of this framework,
            while external arguments and sources are considered separately.
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

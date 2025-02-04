import { Box, Text } from "@radix-ui/themes";
import Strong from "./Strong";
import Collapsible from "../Collapsible";

const uClassName = "space-y-2 list-disc pl-4 text-sm";
const reasoningForAxioms = [
  {
    title: "Existence of God",
    description: (
      <Text>
        Assume as true: <strong>God is</strong> It is impossible for any created
        being to transcend creation and directly verify an external source.
        However, we have only two possible cases: either <strong>God is</strong>{" "}
        or he is not. We do not seek to convince nor prove to you that{" "}
        <strong>God is</strong>, but rather, we fully assume{" "}
        <strong>God is</strong> for the purpose of this exploration.
        <br />
        <br />
        If you cannot explore the assumtion that <strong>God is</strong>, then
        nothing within this framework will satisfy you because we make no
        attempt to prove God. Rather, we seek to construct a logical system from
        which the answers to four primitive questions can be derived. In
        mathematics, no one proves that a point has no size or that parallel
        lines never meet in Euclidean space; these are just taken as given, but
        required to construct a logical system. So why should the existence of
        God be treated differently?
        <br />
        <br />
        The demand for proof presupposes that God's existence must be
        demonstrable like a scientific hypothesis, but what if God's existence
        is more like an axiom—necessary to construct a logical system, and not
        derivable from something more fundamental?
        <br />
        <br />
        We perceive an initiator because science suggests a beginning. Hence,
        this is the beginning of a framework which seeks to answer four
        primitive questions in terms of the initiator of creation and creation
        itself:
        <br />
        <br />
        <ul className={uClassName}>
          <li>
            <strong>Who</strong> created?
          </li>
          <li>
            <strong>What</strong> was created?
          </li>
          <li>
            <strong>Why</strong> was it all created?
          </li>
          <li>
            <strong>How</strong> was it all created?
          </li>
        </ul>
        <br />
        <br />
        ;the questions of a man's heart. The answers to these questions are
        essential for any sense of purpose. We cannot lay idle or buy into the
        distractions which distract us from asking these questions. No, these
        distractions are too costly, we cannot afford them, and we see through
        the system that enslaves us by our drive to afford these distractions.
        The end of the chase is emptiness. If these questions cannot be answered
        then I have no drive to continue. We will derive the answers to these
        four questions in terms of the initiator of creation and creation
        itself. If we cannot derive consistent results then we know that the
        framework is flawed and we will abandon it. If we can derive consistent
        results then the framwork is stable much like many concepts in
        mathematics.
        <br />
        <br />
        These four questions are required to be answered in terms of both
        creation and the initiator of creation since the single term, creation,
        is not sufficient by itself to derive the answers to all four questions,
        and we are determined to answer all four questions, but we must begin
        with the assumption that <strong>God is</strong>.
        <br />
        <br />
        Having established that <strong>God is</strong>, and that creation is,
        we now declare the following constraints for the two terms: creation and
        initiator, and their relationship:
        <br />
        <br />
        <ul className={uClassName}>
          <li>Initiator is.</li>
          <li>Creation is.</li>
          <li>Initiator not equals creation</li>
          <li>Initiator, ultimately is one.</li>
        </ul>
        <br />
        <br />
        The assumed God equals the initiator since we define initiator as an
        ultimate cause, the definition of God. Initiator is one. If there can be
        multiple initiators, their collaboration would require a higher
        governing cause, which itself must be singular and pre-existing. Thus,
        the initiator is necessarily one. We are not interested in proving or
        disproving the existence of God. We automatically reject any form of
        polytheism, pantheism, or atheism as they are inconsistent with our
        constraints, and with our framework.
      </Text>
    ),
  },
  {
    title: "KJV Bible as Truth",
    description: (
      <Text>
        The KJV Bible is the complete and authoritative written source, and word
        of God. Any conflicting translation—whether in character, word, verse,
        or chapter—is false. We have much information on the term: creation so
        building on the first axiom, we have established, and in our quest to
        answer the four fundamental questions, we now gather and analyze the
        information we have about the second term: God (Initiator). This
        information comes from scripture, but first, we must determine which
        scripture is true, since many claim to be true yet contradict each
        other.
        <br />
        <br />
        The true scripture must: Provide answers or pointers toward the answers
        to our four fundamental questions, They must be: internally consistent
        (without contradictions), consistent with the world around us
        (historically, prophetically, and doctrinally sound) and satisfy our
        constraints.
        <br />
        <br />
        Among all religious texts, we have chosen scripture from the Christian
        faith as our lead. Within Christianity, the KJV Bible stands as the most
        consistent, historically sound, and doctrinally pure version. We do not
        attempt to prove the KJV Bible to be true; rather, we assume it as true
        for the purpose of this framework, while external arguments and sources
        are considered separately.
      </Text>
    ),
  },
  {
    title: "Jesus Christ's First Coming",
    description: `Jesus Christ, the Creator, Messiah, and Truth, has come once (as of 2024) as recorded in the KJV Bible.
    This third axiom follows logically from the previous two. If God is, and the KJV Bible is true, then the KJV Bible's account of Jesus Christ's first coming is also true. External historical sources also confirm the existence of Jesus Christ, but the KJV Bible is our primary source within this framework.`,
  },
];

const Axioms = () => {
  return (
    <Box className="space-y-4 p-4">
      <Strong
        point="Introduction"
        content="These axioms are assumed as the foundational premises for reasoning I will briefly explain my reasoning for each axiom, but they require no proof. They are assumed as true."
      />

      {reasoningForAxioms.map((axiom, index) => (
        <Collapsible
          maxHeight="max-h-[400px]"
          title={axiom.title}
          children={
            <Strong
              key={index}
              point={axiom.title}
              content={axiom.description}
            />
          }
        />
      ))}
    </Box>
  );
};

export default Axioms;

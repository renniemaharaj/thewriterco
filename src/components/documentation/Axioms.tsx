import { Box } from "@radix-ui/themes";
import Strong from "./Strong";
import Collapsible from "../Collapsible";

const reasoningForAxioms = [
  {
    title: "Existence of God",
    description: `
    Assume as true: God is. It is impossible for any created being to transcend creation and directly verify an external source. Therefore, we take as our starting point: God is.
    This is the beginning of a framework which seeks to answer four questions: Who, What, Why, and How; the questions of a man's heart.
    These four questions are required to be answered in terms of creation and the initiator of creation, and we are determined to answer these questions, but we must begin with the assumption that God is.
    We are not interested in proving or disproving the existence of God. We are interested in answering these four questions in terms of creation and the initiator of creation.
    We automatically reject any form of polytheism, pantheism, or atheism as they are inconsistent with the world around us and with our reasoning thus far:
    creation is, initiator is, the initiator must be one. If there were multiple initiators, their collaboration would require a higher governing cause, which itself must be singular and pre-existing. Thus, the initiator is necessarily one. Initiator equals God, initiator not equals creation. Since the initiator is one and is not part of creation, we affirm the existence of a monotheistic God.`,
  },
  {
    title: "KJV Bible as Truth",
    description: `
    The KJV Bible is the complete and authoritative written source, and Word of God. Any conflicting translation—whether in character, word, verse, or chapter—is false.
    Having established that God is and that God is one, we must now gather and analyze the information we have about God. This information comes from scripture, but first, we must determine which scripture is true, since many claim to be true yet contradict each other.
    The true scripture must:
    Provide answers or pointers toward the answers to our four fundamental questions (Who, What, Why, and How).
    Be internally consistent (without contradictions).
    Be consistent with the world around us (historically, prophetically, and doctrinally sound).
    Among all religious texts, we have chosen scripture from the Christian faith as our lead. Within Christianity, the KJV Bible stands as the most consistent, historically sound, and doctrinally pure version.
    We do not attempt to prove the KJV Bible to be true; rather, we assume it as true for the purpose of this framework, while external arguments and sources are considered separately.
    `,
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

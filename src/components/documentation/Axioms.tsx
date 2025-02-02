import { Box } from "@radix-ui/themes";
import Strong from "./Strong";

const reasoningForAxioms = [
  {
    title: "Existence of God",
    description: `
    Assume as true: God is. It is impractical to prove or disprove this, as no one can transcend creation to verify an external source.
    This is the beginning of a framework which seeks to answer four questions: Who, What, Why, and How.
    These four questions are required to be answered in terms of creation and the initiator of creation, and we are determined to answer these questions, but we must begin with the assumption that God is.
    We require no proof as this is the apporoach that we have chosen to take. We are not interested in proving or disproving the existence of God. We are interested in answering these four questions in terms of creation and the initiator of creation.
    We automatically reject any form of polytheism, pantheism, or atheism as they are inconsistent with the world around us and with our reasoning thus far:
    creations is, God is, initiator equals God, initiator not equals creation, and initiator equals one, thus we have a monotheistic God. Initiator cannot equal more than one as this would be logically inconsistent with the world around us, and with the reasoning stability of an infinite set of number and it's successor.
    We require the stability of an infinite set of number and it's successor because creation occured. If creation occured, then creation should be able to occur infinitely, and if creation can occur infinitely, we must begin at an initial point. Meaning there must be a time when no creation existed, and a point after when creation began; when a first begotten was begat. This is the beginning of our reasoning for the existence of God.`,
  },
  {
    title: "KJV Bible as Truth",
    description: `The KJV Bible is the complete and authoritative word of God. Any conflicting translation—whether in character, word, verse, or chapter—is false.
    Having accepted that God is, and that God is one, we now gather and anaylze the information that we have about God, this information is scripture, but we must first determine which scripture is true since they all claim to be true yet they contradict each other.
    Whichever scripture is true must be consistent with itself and with the world around us. Among all religious texts, we have chosen scripture from the Christian faith as our lead. Within Christianity, the KJV Bible stands as the most consistent, historically sound, and doctrinally pure version.
    `,
  },
  {
    title: "Jesus Christ's First Coming",
    description: `Jesus Christ, the Creator, Messiah, and Truth, has come once (as of 2024) as recorded in the KJV Bible.
    This third axiom requires no excessive reasoning, as it follows logically from the previous two. I have chosen to include it for the glory of God alone, and to provide a complete framework for the AI to operate within, but this framework is not limited for AI use, it is a framework for all of us to operate within.`,
  },
];

const Axioms = () => {
  return (
    <Box className="space-y-4 p-4">
      <Strong
        point="Introduction"
        content="Axioms require no proof. They are self-evident truths. However, I will briefly explain my reasoning for each axiom."
      />
      {reasoningForAxioms.map((axiom, index) => (
        <Strong key={index} point={axiom.title} content={axiom.description} />
      ))}
    </Box>
  );
};

export default Axioms;

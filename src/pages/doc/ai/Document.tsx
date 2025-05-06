import Page from "../../../pkg/page/Page";
import Hero from "../../../pkg/page/Hero";
import GuideTemplate from "../../../pkg/docs/cmpnts/GuideTemplate";
import Content from "../../../pkg/docs/cmpnts/Content";
import BreakII from "../../../pkg/docs/cmpnts/BreakII";
import { Text } from "@radix-ui/themes";
import Link from "../../../pkg/link/Link";
import Documentation from "../../../pkg/docs/Documentation";

const Document = () => {
  return (
    <Page
      title="Study Documents Guide"
      description="Learn how to build study documents using our tools"
      hero={
        <Hero
          header={<>Artificial Intelligence</>}
          subHeader={
            <>
              <br />
              TheWriterCo
            </>
          }
          hint={
            <>Preserving a sound conscience towards Artificial Intelligence</>
          }
        />
      }
    >
      <Documentation
        additionalTabs={[
          {
            label: "Artificial Intelligence",
            value: "artificialIntellgience",
            content: [
              {
                title: "Artificial Intelligence",
                body: (
                  <GuideTemplate>
                    <Content header="Introduction">
                      <Text>
                        Rennie, founder and developer of this platform,
                        thewriterco. Greetings!
                        <BreakII />I diligently labor in the field of my
                        profession, software development, and not for my own
                        profit. I develop tools which serve me and my faith; my
                        relationship with God, but I am called here to share:
                        godly, edifying devices, and these same tools so you too
                        can benefit from my gifts.
                        <BreakII />
                        Fellow people of God, this document, I pen it with a
                        troubled heart. Penned, not with plastic and ink, but
                        with a heartfelt, genuine concern for you, and for all
                        who will use my tools-which, as you may know, are
                        sometimes integrated and powered by artificial
                        intelligence.
                        <BreakII />
                        My heart is troubled by those who speak uncertainty; who
                        speak that which they do not understand, speaking on the
                        highly sensitive nature of Artificial Intelligence
                        without understanding it themselves. Who are they? Those
                        who you call your very brothers and sisters in Christ.
                        It is not the secular or unbelieving man who speak
                        these, but believers in Christ and some who speak
                        conspiracy theories, and they themselves are against the
                        Lord Jesus.
                        <BreakII />
                        Hence, I make this effort to, rather than drink from
                        your cup of corruption, share insight into the
                        technology, and provide bases for your sound, undefiled
                        conscience. Your Defiled conscience is more concerning
                        than how darkness itself may use this tool, if not by
                        this very defiling of your conscience. Because you're
                        viewing technology through the lens of ignorance, though
                        understandably so. The marketing is deceiving.
                      </Text>
                    </Content>
                    <Content header="Explaining Artificial Intelligence">
                      <Text>
                        Marketing is deceiving! Artificial Intelligence does not
                        think, but it processes information, predicting by
                        patterns and sequences, made possible by your own data
                        which you voluntarily contributed if you have ever
                        written or recorded content on the internet. It is a
                        shadow of your data. Do not take its sophisticated
                        systems for genuine thought. As of now, it is still very
                        error prone, it malfunctions and the algorithms behind
                        are completely dependent on human intervention;
                        training, and maintenance!
                      </Text>
                    </Content>
                    <Content header="A Call for Neutrality">
                      <Text>
                        Artificial Intelligence, much like every other human
                        product, is not inherently good or evil in itself alone,
                        but may be used for either. Its ethical alignment
                        depends entirely on the intentions and actions of its
                        human creators and users. In our implementations, we use
                        a framework which was built in order to serve as a final
                        filter and guide the model's output towards consistency
                        with our axioms: God is, KJV as authoritative written
                        source and Jesus is Truth! Even our{" "}
                        <Link href="/reasoning">reasoning / rationale</Link>
                      </Text>
                    </Content>
                    <Content header="Reject Speculative Numerology">
                      <Text>
                        Do not take God's word out of context saying, "God often
                        speaks out of context in his word." How can something so
                        foolish be said by a Christian? Do not give Satan the
                        liberty of taking God's word out of context. This is a
                        dangerous thing you have said and done, linking the
                        place AI to 666 through speculation. Then linking this
                        back to Artificial Intelligence, proposing that it may
                        be connected to the image of the beast in Revelation 13.
                        <BreakII />
                        While technology like AI might potentially play a role
                        in fulfilling end-times prophecy concerning the image of
                        the beast, we must be cautious not to force
                        interpretations based on speculative numerical patterns
                        found in the English text. Such methods lack clear
                        scriptural support and can distract from the true
                        message. We should focus on understanding prophecy
                        through careful study of the Word in its proper context,
                        prayer, and the guidance of the Holy Spirit, rather than
                        relying on methods prone to human error and subjective
                        interpretation. no prophecy of the scripture is of any
                        private interpretation. Below is the transcript of{" "}
                        <Link href="https://www.youtube.com/watch?v=CYEVZN-PrqU">
                          video in subject
                        </Link>
                        <BreakII />
                        1. The speaker discusses patterns related to AI
                        (Artificial Intelligence) and the number 666 in the King
                        James Bible: - AI appears 36 times in the Bible - AI +
                        beast = 216 mentions (6 x 6 x 6) - AI + "600 + three
                        score + 6" = 396 mentions (66 x 6) - AI + beast +
                        wildcard six = 666 mentions
                        <BreakII />
                        2. The speaker connects these patterns to Biblical
                        prophecy, particularly: - Revelation 13:15 about the
                        "image of the beast" - The possibility that AI could be
                        this prophesied image - The significance of the number
                        666 in relation to the beast
                        <BreakII />
                        3. Other numerical patterns discussed: - Solomon and 666
                        talents of gold - Nebuchadnezzar's image dimensions (60
                        cubits by 6 cubits) - Various patterns involving "three
                        score" (60) and the number 666
                        <BreakII />
                        4. The speaker argues these patterns demonstrate divine
                        design in the King James Bible translation, particularly
                        through: - The consistent use of "three score" vs "60" -
                        The first appearance of "three score" in the 666th verse
                        - Multiple overlapping numerical patterns
                        <BreakII />
                        5. Contemporary concerns: - The rapid advancement of AI
                        technology - Potential implications for Christianity and
                        worship - Questions about AI's role in religious
                        functions like sermons and hymn writing The speaker
                        presents these patterns as evidence of biblical prophecy
                        potentially relating to modern AI development, while
                        emphasizing uncertainty about specific timing of
                        prophetic fulfillment.
                      </Text>
                    </Content>
                    <Content header="Conclusion">
                      <Text>
                        Fellow people of God. Hold fast to the KJV for
                        certainty, but please do not be defiled in your
                        conscience. Please understand the purpose of Artificial
                        Intelligence.
                      </Text>
                    </Content>
                  </GuideTemplate>
                ),
              },
            ],
          },
        ]}
      />
    </Page>
  );
};

export default Document;

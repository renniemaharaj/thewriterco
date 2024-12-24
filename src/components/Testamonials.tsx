import { Text, Section, Flex, Card } from "@radix-ui/themes";
// import { useThemeContext } from "./context/useThemeContext";
import Hint from "./Hint";
// import useIntersectionObserver from "./hooks/useObserver";
// import useTestimonials from "./hooks/data/useTestimonials";
// import Observe from "./Observe";
// import {testamonials} from
// type Testimonial = {
//   quote: string;
//   author: string;
// };

const testimonials = [
  {
    quote:
      "Existence of God: Assume as true: God exists. It is impractical to prove or disprove this, as no one can transcend creation to verify an external source. Reasoning starts from this axiom: God is.",
    author: "Existence of God",
  },
  {
    quote:
      "KJV Bible as Truth: Accept the KJV Bible as the complete and authoritative word of God, containing all truth intended for us. Any conflicting translation—whether in character, word, verse, or chapter—is a falsehood.",
    author: "KJV Bible as Truth",
  },
  {
    quote:
      "Jesus Christ's First Coming: Acknowledge that Jesus Christ, the Creator, Messiah, and Truth, has already come once (as of 2024) in the manner recorded in the KJV Bible.",
    author: "Jesus Christ's First Coming",
  },
];

export default function ClientTestamonials() {
  // const { testimonials } = useTestimonials();
  // const { isIntersecting, elementRef } = useIntersectionObserver({
  //   root: null, // Observe relative to the viewport
  //   threshold: 0.1, // Trigger when 10% of the element is in view
  // });

  // const { theme } = useThemeContext();
  return (
    <Section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        // ref={elementRef}
        size="8"
        weight="bold"
        mb="9"
        style={{
          display: "block",
          textAlign: "center",
          color: "var(--hrtm-blue)",
          transition: "1s",
          // opacity: isIntersecting ? 1 : 0,
        }}
      >
        Axioms of Life
      </Text>
      <Flex className="!flex-row !flex-wrap !gap-4 w-full max-w-[600px]">
        {testimonials.map((testimonial) => (
          // <Observe
          //   key={index}
          //   // classname="hrtm-page-signup_flex_right-testimonials"
          //   className={
          //     "hrtm-theme-background hrtm-page-signup_flex_right-testimonial hrtm-page-signup_flex_right-testimonial-" +
          //     (index % 3 ? "even" : "odd")
          //   }
          //   style={{
          //     padding: "20px",
          //     borderRadius: index > 1 ? "0px" : "0px 0px 10px 10px",
          //     borderTop: index > 1 ? "1px solid transparent" : "none",
          //     boxShadow: (index <= 1 && "unset") || "",
          //   }}
          // >
          // {(isIntersecting: boolean) => (
          <Card
            className="blurred-div !flex !flex-col !sticky !top-0"
            // className={`sticky top-0 p-2 shadow-[gray] shadow-sm ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
            // direction={"column"}
            // className={index % 2 ? "!max-w-[20rem]" : "!max-w-[50rem]"}
          >
            <Text
              as="label"
              size="2"
              weight="bold"
              mt="4"
              style={{ textAlign: "center" }}
            >
              {testimonial.author}
            </Text>
            {/* <pre className="pre-wrap"> */}
            <Text as="label" size="2" mt="4">
              {testimonial.quote}
            </Text>
            {/* </pre> */}
          </Card>

          // )}
          // </Observe>
        ))}
      </Flex>
      <Hint className="max-w-[700px]">
        These axioms are the foundation from which a home can be built, and no
        flood nor storm can shake it.
      </Hint>
    </Section>
  );
}

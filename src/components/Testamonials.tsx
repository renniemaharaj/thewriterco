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
    quote: `Let the first axiom be that God is. 
      
      It is not practical to conlude whether God is or is not. No man can leave the confines of creation to prove or disprove the existence of an external source at rest. We have only: theories of minds and practices so who will build a ladder to heaven?. What is even heaven? This cannot be defined unless we first establish the supreme
  
      The first axiom is that God is. This must be accepted as true in order to reason further.`,
    author: "rma1",
  },
  {
    quote:
      "The second axiom is that the KJV Bible is the word of God, complete and delightedly received as the source of our Truth, as according to what is intended for us to know; that any other translation in confliction, whether in, significant character, word, line, verse or chapter, is a lie; that the KJV Bible is the preffered translation of the Holy Bible.",
    author: "rma2",
  },
  {
    quote:
      "The third and final axiom is that Jesus Christ, the Son of God, the Creator, Messiah, the Way, the Truth and the Life, has already came ONCE as of year ending, 2024, and he came in the manner in which he did, as recorded in the KJV Bible Translation.",
    author: "rma3",
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
        Therefore your general position on any matter forward, must satisfy
        these three axioms. They are for you to align yourself accordingly.
      </Hint>
    </Section>
  );
}

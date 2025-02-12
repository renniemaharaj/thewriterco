import { Box, Callout, Card } from "@radix-ui/themes";
import Strong from "./Strong";
import { ShieldBanIcon } from "lucide-react";
import Collapsible from "../Collapsible";

const services: { title: string; content: string }[] = [
  {
    title: "Traditional bible reader",
    content:
      "We have implemented a work-in-progress traditional bible reader that allows you to read the bible in KJV translation.",
  },
  {
    title: "Contextual, relative search",
    content:
      "We have implemented a work-in-progress search by context and relativity, matching your input to relating verses in the KJV translation. It can be found embedded in the header. Try: 'What does the bible say about love?'",
  },
  {
    title: "Generative AI",
    content:
      "You can chat or query with an AI model trained on the KJV translation. We use a general purpose model, instructed to respond consistently with the axioms and other instructions which guide the model to respond in a way that is consistent with the KJV translation.",
  },
  {
    title: "Canvas view (soon)",
    content:
      "A canvas view that allows you to explore the bible in a visual way. This is not yet fully implemented, but will be a way to explore the bible visually, beginning with a genealogy tree for displaying generations in the bible by search.",
  },
];
const Usages = () => {
  return (
    <Box className="space-y-4 p-4">
      {services.map((service, index) => (
        <Card>
          <Collapsible
            key={index}
            title={service.title}
            children={
              // <Card>
              <Strong point={service.title} content={service.content} />
              // </Card>
            }
          />
        </Card>
      ))}

      <Card>
        <Collapsible
          title="Cost and restrictions"
          children={
            // <Card>
            <ul className="space-y-2 list-disc pl-4 text-sm">
              <li>There are no costs, only restrictions on service</li>
              <li>The tools are provided for educational purposes only.</li>
              <li>Our services are not to be used for commercial purposes.</li>
              <li>Our services are not to be used to form a new religion.</li>
              <li>Our services are not to be used to form a religious cult.</li>
              <li>
                Our services are not to be used to create yet another Christian
                denomination. Please escape the curse of denominations which
                ultimately limit and segregate.
              </li>
              <li>
                Please do not abuse the generative AI. It is a tool for
                exploration and learning. We rate limit requests to prevent
                abuse. We prefer not to put the services behind a login. It is
                simply not in our interest to do so. We want to provide the
                tools for free and open. Porfavor!
              </li>
            </ul>
            // </Card>
          }
        />
      </Card>
      <>
        <Callout.Root>
          <Callout.Icon>
            <ShieldBanIcon />
          </Callout.Icon>
          <Callout.Text>
            Requests to API are allowed if they are 15 seconds apart. All
            successive requests will be rejected and your wait time reinstated.
          </Callout.Text>
        </Callout.Root>
      </>
    </Box>
  );
};

export default Usages;

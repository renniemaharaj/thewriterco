import { Flex, Skeleton, Text } from "@radix-ui/themes";
import useInserts from "./hooks/data/useInserts";
import { Insert } from "./hooks/data/useInserts";
import { useState } from "react";

/** Previously called promises */
export default function Inserts() {
  const { inserts } = useInserts();
  const [pageInserts] = useState<Insert[]>(inserts);

  return (
    <Flex
      direction="row"
      gap="6"
      className="text-center content-center !justify-center flex-wrap"
    >
      {/* Map over the inserts array */}
      {pageInserts.length === 0
        ? Array.from({ length: 1 }).map((_, index) => (
            <Flex
              key={index}
              className="w-full p-5 gap-3 flex-col items-center"
            >
              <Skeleton className="w-1/2 h-5" />
            </Flex>
          ))
        : pageInserts.map((reason, index) => (
            <div key={index} className="flex flex-col p-5 gap-3">
              <Text
                as="label"
                size="3"
                weight="bold"
                mb="3"
                className="!leading-relaxed text-gray-600 text-lg"
              >
                {reason.summary}
              </Text>
              <Text
                size="3"
                // color="gray"
                className="!leading-relaxed text-md"
              >
                {reason.description}
              </Text>
              {reason.embeddYoutube && (
                <Flex justify={"center"} m={"5"}>
                  <iframe
                    src={`https://www.youtube.com/embed/${new URL(reason.embeddYoutube).searchParams.get("v")}`}
                    title={reason.summary}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    className="w-72 border-none"
                  />
                </Flex>
              )}
            </div>
          ))}
    </Flex>
  );
}

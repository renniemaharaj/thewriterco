import { HoverCard, Separator, Tabs } from "@radix-ui/themes";
import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Carousel } from "../../Carousel";
import Motion from "../Motion";
import Result from "./Result";
import Button from "../../button/Button";

const Results = ({ children }: { children: ReactNode }) => {
  const { searchResults, searchQuery } = useSelector(
    (state: RootState) => state.page,
  );

  // Filtered and grouped results by route
  const groupedResults = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim();

    const filtered = !lowerQuery
      ? searchResults
      : searchResults.filter(
          (r) =>
            r.title?.toLowerCase().includes(lowerQuery) ||
            r.route?.toLowerCase().includes(lowerQuery) ||
            r.hint?.toLowerCase().includes(lowerQuery),
        );

    return filtered.reduce<Record<string, typeof searchResults>>(
      (acc, result) => {
        const route = result.route || "Other";
        if (!acc[route]) acc[route] = [];
        acc[route].push(result);
        return acc;
      },
      {},
    );
  }, [searchResults, searchQuery]);

  const groupedEntries = Object.entries(groupedResults);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>{children}</HoverCard.Trigger>
      <HoverCard.Content
        className={`${!groupedEntries.length && "!hidden"} !overflow-y-auto !overflow-x-hidden !max-h-[400px] !min-w-[300px]`}
      >
        <Tabs.Root defaultValue={groupedEntries[0]?.[0]}>
          <Tabs.List className="!w-full pb-2">
            <Carousel
              items={groupedEntries.map(([title], index) => (
                <Motion unique="res" index={index} cap={false} key={title}>
                  <Tabs.Trigger className="!p-0" value={title}>
                    <Button>{title}</Button>
                  </Tabs.Trigger>
                </Motion>
              ))}
            />
          </Tabs.List>
          {groupedEntries.map(([title, results]) => (
            <Tabs.Content
              key={title}
              value={title}
              className="!flex !overflow-hidden !max-h-full !max-w-full !pt-2 !gap-2 !flex-row !flex-wrap"
            >
              {results.map((result, index) => (
                <>
                  <Motion
                    className="!overflow-hidden !max-w-full !max-h-full"
                    unique="res-i"
                    index={index}
                    cap={false}
                    key={index}
                  >
                    <Result {...result} />
                  </Motion>
                  {index !== results.length - 1 && (
                    <Separator className="my-auto" orientation="vertical" />
                  )}
                </>
              ))}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default Results;

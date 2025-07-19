import { Command, Body } from "./types";
const useSocketCommands = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stringify = (c: any) => JSON.stringify(c);

  const search = (s: string) => ({ name: "search", body: s }) as Command;

  const feed = (
    tags: string[],
    urlReportTitle: string,
    urlResultTitle: string,
  ) =>
    ({
      name: "feed",
      body: stringify({
        preferenceTags: tags,
        urlReportTitle,
        urlResultTitle,
      } as Body),
    }) as Command;

  return { search, feed, stringify };
};

export default useSocketCommands;

import { useFetchGitDir } from "./data/useFetchGitDir";
import { dirToContents } from "../docs/data/dirToContents";
import { TabItem } from "../docs/cmpnts/Menu";
import { useMemo } from "react";

const useDefaultTabs = () => {
  const axiomsData = useFetchGitDir("axioms");
  const verboseData = useFetchGitDir("verbose");
  const proKJVData = useFetchGitDir("prokjv");
  const prochristianity = useFetchGitDir("prochristianity");
  const poetryData = useFetchGitDir("poetry");
  const articlesData = useFetchGitDir("articles");
  const creativityData = useFetchGitDir("creativity");

  const defaultTabs: TabItem[] = useMemo(
    () => [
      {
        label: "Axioms",
        value: "axioms",
        content: dirToContents(axiomsData.dir),
      },
      {
        label: "Verbose",
        value: "verbose",
        content: dirToContents(verboseData.dir),
      },
      {
        label: "Pro KJV",
        value: "prokjv",
        content: dirToContents(proKJVData.dir),
      },
      {
        label: "Pro Christianity",
        value: "prochristianity",
        content: dirToContents(prochristianity.dir),
      },
      {
        label: "Articles",
        value: "articles",
        content: dirToContents(articlesData.dir),
      },
      {
        label: "Poetry",
        value: "poetry",
        content: dirToContents(poetryData.dir),
      },
      {
        label: "Creativity",
        value: "creativity",
        content: dirToContents(creativityData.dir),
      },
    ],
    [
      axiomsData.dir,
      verboseData.dir,
      proKJVData.dir,
      prochristianity.dir,
      articlesData.dir,
      poetryData.dir,
      creativityData.dir,
    ],
  );

  return defaultTabs;
};

export default useDefaultTabs;

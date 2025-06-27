import { ReactNode, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, Box } from "@radix-ui/themes";

// import Collapsible from "../../Collapsible";
import { useDispatch, useSelector } from "react-redux";

import Item from "./Item";
import { useFetchGitDir } from "../../hooks/data/useFetchGitDir";
import { dirToContents } from "../data/dirToContents";
import {
  setCurrentTab,
  setCurrentTitle,
} from "../../../app/reasoning/reasoningSlice";
import { RootState } from "../../../app/store";
import { Carousel } from "../../Carousel";
import Trigger from "./Trigger";
import { useParams } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";

// Define the shape of each collapsible item
export type CollapsibleItem = {
  title: string;
  body: ReactNode;
  fetchPath?: string;
  filename?: string;
};

// Tab type definition
export type TabItem = {
  label: string;
  value: string;
  content: CollapsibleItem[]; // array of collapsible sections
};

type MenuProps = {
  className?: string;
  routeChildren?: (content: ReactNode) => void;
  additionalTabs?: TabItem[];
};

const Menu = ({ routeChildren, additionalTabs = [], className }: MenuProps) => {
  const axiomsData = useFetchGitDir("axioms");
  const verboseData = useFetchGitDir("verbose");
  const proKJVData = useFetchGitDir("prokjv");
  const prochristianity = useFetchGitDir("prochristianity");
  const poetryData = useFetchGitDir("poetry");
  const articlesData = useFetchGitDir("articles");
  const creativityData = useFetchGitDir("creativity");

  const doc = useSelector((state: RootState) => state.reasoning);
  const currentTab = doc.currentTab || "axioms"; // Default to "axioms" if currentTab is not set
  const currentTitle = doc.currentTitle || "Existence of God"; // Default to "Existence of God" if currentTitle is not set

  const dispatch = useDispatch();

  const { tab, title } = useParams<{ tab: string; title: string }>();
  const { navigateWT } = useTransitionNavigation();

  useEffect(() => {
    dispatch(setCurrentTab(tab || currentTab));
    dispatch(setCurrentTitle(title || currentTitle));
  }, [tab, title, currentTab, currentTitle, dispatch]);

  const defaultTabs: TabItem[] = useMemo(
    () => [
      {
        label: "Axioms",
        value: "axioms",
        content: dirToContents(axiomsData.dir, "axioms"),
      },
      {
        label: "Verbose",
        value: "verbose",
        content: dirToContents(verboseData.dir, "verbose"),
      },
      {
        label: "Pro KJV",
        value: "prokjv",
        content: dirToContents(proKJVData.dir, "prokjv"),
      },
      {
        label: "Pro Christianity",
        value: "prochristianity",
        content: dirToContents(prochristianity.dir, "prochristianity"),
      },
      {
        label: "Articles",
        value: "articles",
        content: dirToContents(articlesData.dir, "articles"),
      },
      {
        label: "Poetry",
        value: "poetry",
        content: dirToContents(poetryData.dir, "poetry"),
      },
      {
        label: "Creativity",
        value: "creativity",
        content: dirToContents(creativityData.dir, "creativity"),
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

  const combinedTabs = useMemo(
    () => [...defaultTabs, ...additionalTabs],
    [defaultTabs, additionalTabs],
  );

  const renderedTabContents = useMemo(() => {
    return combinedTabs.map((tab) => {
      const renderedItems = tab.content.map((item, index) => (
        <motion.div
          key={index + "tabsItem"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Item
            title={item.title}
            body={item.body}
            routeChildren={routeChildren}
            fetchPath={item.fetchPath}
            filename={item.filename}
          />
        </motion.div>
      ));

      return (
        <Tabs.Content
          key={tab.value + "tabsContent"}
          value={tab.value}
          className="!flex flex-col !gap-2"
        >
          {renderedItems}
        </Tabs.Content>
      );
    });
  }, [combinedTabs, routeChildren]);

  return (
    <Tabs.Root
      onValueChange={(v) => {
        navigateWT(`/reasoning/${v}/${currentTitle}`);
      }}
      value={currentTab}
      defaultValue={currentTab}
      className={className}
    >
      <Tabs.List>
        <Carousel
          variant="no-scrollbar"
          items={combinedTabs.map((tab) => (
            <Trigger key={tab.value} tab={tab} currentTab={currentTab} />
          ))}
        />
      </Tabs.List>

      <Box pt="3" className="max-w-[100%]">
        {renderedTabContents}
      </Box>
    </Tabs.Root>
  );
};

export default Menu;

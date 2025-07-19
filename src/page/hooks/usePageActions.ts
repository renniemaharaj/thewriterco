import { useMemo } from "react";

type PageAction = {
  route: string;
  title: string;
  hint: string;
  action: { href: string };
};

const usePageActions = (): PageAction[] => {
  return useMemo(
    () => [
      {
        route: "Pages",
        title: "Home",
        hint: "Go Home",
        action: { href: "/" },
      },
      {
        route: "Pages",
        title: "Writer",
        hint: "Open Writer",
        action: { href: "/writer" },
      },
      {
        route: "Pages",
        title: "KJV",
        hint: "King James Version",
        action: { href: "/kjv" },
      },
      {
        route: "Pages",
        title: "Read",
        hint: "Read Bible",
        action: { href: "/read" },
      },
      {
        route: "Pages",
        title: "AI Chat",
        hint: "TheWriterCoAI",
        action: { href: "/ai" },
      },
      {
        route: "Pages",
        title: "Daily News",
        hint: "Daily news summary",
        action: { href: "/daily" },
      },
      {
        route: "Read",
        title: "Articles",
        hint: "View Articles",
        action: { href: "/read/articles" },
      },
      {
        route: "Read",
        title: "Axioms",
        hint: "View Axioms",
        action: { href: "/read/axioms" },
      },
      {
        route: "Read",
        title: "Verbose",
        hint: "View Verbose",
        action: { href: "/read/verbose" },
      },
      {
        route: "Read",
        title: "Creativity",
        hint: "View Creativity",
        action: { href: "/read/creativity" },
      },
      {
        route: "Read",
        title: "Poetry",
        hint: "View Poetry",
        action: { href: "/read/poetry" },
      },
      {
        route: "Read",
        title: "Pro KJV",
        hint: "Pro King James Version",
        action: { href: "/read/prokjv" },
      },
      {
        route: "Read",
        title: "Pro Christianity",
        hint: "Pro Christianity",
        action: { href: "/read/prochristianity" },
      },
    ],
    [],
  );
};

export default usePageActions;

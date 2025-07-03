import { useMemo } from "react";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";

type PageAction = {
  route: string;
  title: string;
  hint: string;
  action: () => void;
};

const usePageActions = (): PageAction[] => {
  const { navigateWT } = useTransitionNavigation();

  return useMemo(
    () => [
      {
        route: "/",
        title: "Home",
        hint: "Go Home",
        action: () => navigateWT("/"),
      },
      {
        route: "/",
        title: "Writer",
        hint: "Open Writer",
        action: () => navigateWT("/writer"),
      },
      {
        route: "/",
        title: "KJV",
        hint: "King James Version",
        action: () => navigateWT("/kjv"),
      },
      {
        route: "/",
        title: "Read",
        hint: "Read Bible",
        action: () => navigateWT("/read"),
      },
      {
        route: "Read",
        title: "Articles",
        hint: "View Articles",
        action: () => navigateWT("/read/articles"),
      },
      {
        route: "Read",
        title: "Axioms",
        hint: "View Axioms",
        action: () => navigateWT("/read/axioms"),
      },
      {
        route: "Read",
        title: "Verbose",
        hint: "View Verbose",
        action: () => navigateWT("/read/verbose"),
      },
      {
        route: "Read",
        title: "Creativity",
        hint: "View Creativity",
        action: () => navigateWT("/read/creativity"),
      },
      {
        route: "Read",
        title: "Poetry",
        hint: "View Poetry",
        action: () => navigateWT("/read/poetry"),
      },
      {
        route: "Read",
        title: "Pro KJV",
        hint: "Pro King James Version",
        action: () => navigateWT("/read/prokjv"),
      },
      {
        route: "Read",
        title: "Pro Christianity",
        hint: "Pro Christianity",
        action: () => navigateWT("/read/prochristianity"),
      },
    ],
    [navigateWT],
  );
};

export default usePageActions;

import Button from "../../button/Button";
import { ResultType } from "./type";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import { useCallback, ReactNode } from "react";
// import Item from "../../docs/cmpnts/Item";
import Menu from "../../docs/cmpnts/Menu";

const Result = ({ title, action }: ResultType) => {
  const { navigateWT } = useTransitionNavigation();
  const interpret = useCallback((): ReactNode => {
    if ("href" in action && typeof action.href === "string") {
      return <Button onClick={() => navigateWT(action.href)}>{title}</Button>;
    }
    // if ("article" in action && typeof action.article === "string") {
    //   return <Item urlTab="articles" title={title} />;
    // }
    if ("menu" in action && typeof action.menu === "string") {
      return <Menu />;
    }
    return null;
  }, [action, navigateWT, title]);
  return interpret();
};

export default Result;

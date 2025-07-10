import { useCallback, ReactNode } from "react";
import Menu from "../../docs/cmpnts/Menu";
import { ResultType } from "./type";
import Link from "../../link/Link";
import React from "react";

const Result = ({ title, action }: ResultType) => {
  const interpret = useCallback((): ReactNode => {
    if ("href" in action) {
      return (
        <Link animate href={action.href}>
          {title}
        </Link>
      );
    } else if ("menu" in action) {
      return <Menu className="!max-h-full" />;
    }
    return null;
  }, [action, title]);
  return <React.Fragment>{interpret()}</React.Fragment>;
};

export default Result;

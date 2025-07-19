import { useCallback, ReactNode } from "react";
import { ResultType } from "./type";
import React from "react";
import Menu from "../../pkg/docs/cmpnts/Menu";
import Link from "../../pkg/link/Link";

const Result = ({ title, action }: ResultType) => {
  const interpret = useCallback((): ReactNode => {
    if ("href" in action) {
      return (
        <Link animate href={action.href}>
          {title}
        </Link>
      );
    } else if ("menu" in action) {
      return <Menu className="!max-h-full !max-w-full" />;
    }
    return null;
  }, [action, title]);
  return <React.Fragment>{interpret()}</React.Fragment>;
};

export default Result;

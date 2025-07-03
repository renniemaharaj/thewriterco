import Button from "../../button/Button";
import { Tooltip } from "@radix-ui/themes";
import { ResultType } from "./type";

const Result = ({ title, hint, action }: ResultType) => {
  return (
    <Tooltip content={hint}>
      <Button onClick={action}>{title}</Button>
    </Tooltip>
  );
};

export default Result;

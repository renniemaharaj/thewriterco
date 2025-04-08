import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

export const useTransitionNavigation = () => {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const navigateWT = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return {
    isPending,
    navigateWT,
  };
};

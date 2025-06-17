import { useEffect, useState } from "react";

export function useURLState(
  key: string,
): [string | null, (value: string) => void] {
  const [state, setState] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setState(params.get(key));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [key]);

  const updateURL = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    setState(value);
  };

  return [state, updateURL];
}

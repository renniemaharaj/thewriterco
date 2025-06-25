import { useEffect, useState } from "react";

type Orientation = "horizontal" | "vertical";

function getOrientation(): Orientation {
  if (typeof window === "undefined") return "horizontal";
  return window.innerWidth < 768 ? "vertical" : "horizontal";
}

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  useEffect(() => {
    function handleResize() {
      setOrientation(getOrientation());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return orientation;
}

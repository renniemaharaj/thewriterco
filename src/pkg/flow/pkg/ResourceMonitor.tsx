import { Badge } from "@radix-ui/themes";
import usePerformanceMetrics from "../../hooks/usePerformanceMetrics";
const ResourceMonitor = () => {
  const { fps } = usePerformanceMetrics();
  const conditionalColor = fps >= 60 ? "green" : fps >= 30 ? "yellow" : "red";
  return (
    <div className="absolute !z-10 top-3 left-3 select-none opacity-50">
      {fps > 0 && <Badge color={conditionalColor}>{fps} FPS</Badge>}
    </div>
  );
};

export default ResourceMonitor;

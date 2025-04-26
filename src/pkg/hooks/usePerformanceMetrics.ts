import { useState, useEffect } from "react";

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

declare let performance: PerformanceWithMemory;

interface Metrics {
  fps: number;
}

const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    fps: 0,
  });

  useEffect(() => {
    if (typeof performance === "undefined") {
      console.warn("Performance API is not available in this environment.");
      return;
    }

    let frameCount = 0;
    let startTime = performance.now();
    let animationFrameId: number;

    const updateMetrics = () => {
      frameCount++;
      const now = performance.now();
      const elapsed = now - startTime;

      if (elapsed >= 1000) {
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          fps: Math.round((frameCount * 1000) / elapsed),
        }));
        frameCount = 0;
        startTime = now;
      }

      animationFrameId = requestAnimationFrame(updateMetrics);
    };

    animationFrameId = requestAnimationFrame(updateMetrics);

    // Clean up on component unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return metrics;
};

export default usePerformanceMetrics;

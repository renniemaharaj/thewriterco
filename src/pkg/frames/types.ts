import { positionClasses } from "./positions";

export interface FrameBarConfig {
  position: keyof typeof positionClasses; // Position from the utility map
  size?: string; // Optional size override
}

export type FrameBarPosition = {
  position:
    | "topLeft"
    | "rightTop"
    | "bottomLeft"
    | "leftTop"
    | "topRight"
    | "rightBottom"
    | "bottomRight"
    | "leftBottom"
    | "centerTop"
    | "centerBottom"
    | "centerLeft"
    | "centerRight";
  size?: string;
  size2?: string;
};

export type FrameBarSetup = {
  frameBars: FrameBarPosition[]; // Configurations for frame bars
  isAnimating: boolean; // Enable/disable animations
  animationDuration: string; // Animation duration (e.g., "500ms")
};

import { FrameBarPosition, FrameBarSetup } from "./types";

export const frameSetups = {
  Top: {
    frameBars: [{ position: "topLeft" }] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  Right: {
    frameBars: [{ position: "rightTop" }] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  Bottom: {
    frameBars: [{ position: "bottomLeft" }] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  Left: {
    frameBars: [{ position: "leftTop" }] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  Compassed: {
    frameBars: [
      { position: "topLeft" },
      { position: "rightTop" },
      { position: "bottomLeft" },
      { position: "leftTop" },
    ] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  CornersNorthEast: {
    frameBars: [
      { position: "topLeft", size: "!w-1/4" },
      { position: "rightBottom", size: "!h-1/4" },
      { position: "bottomRight", size: "!w-1/4" },
      { position: "leftTop", size: "!h-1/4" },
    ] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  CornersSouthEast: {
    frameBars: [
      { position: "topRight", size: "!w-1/4" },
      { position: "rightTop", size: "!h-1/4" },
      { position: "bottomLeft", size: "!w-1/4" },
      { position: "leftBottom", size: "!h-1/4" },
    ] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  HorizontalBars: {
    frameBars: [
      { position: "topLeft", size: "!w-full" },
      { position: "bottomLeft", size: "!w-full" },
    ] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
  VerticalBars: {
    frameBars: [
      { position: "leftTop", size: "!h-full" },
      { position: "rightTop", size: "!h-full" },
    ] as FrameBarPosition[],
    isAnimating: true,
    animationDuration: "duration-500",
  } as FrameBarSetup,
};

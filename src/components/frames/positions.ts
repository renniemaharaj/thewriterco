const defaultHeightSizing = "h-[1rem]";
const defaultWidthSizing = "w-[1rem]";

export const positionClasses: Record<string, string> = {
  topRight: `top-0 left-[100%] -translate-x-full w-full ${defaultHeightSizing}`, // Full width, small height
  bottomRight: `top-[100%] left-[100%] -translate-x-full -translate-y-full w-full ${defaultHeightSizing}`, // Full width, small height
  rightTop: `top-0 left-[100%] -translate-x-full h-full ${defaultWidthSizing}`, // Full height, small width
  rightBottom: `top-[100%] left-[100%] -translate-x-full -translate-y-full h-full ${defaultWidthSizing}`, // Full height, small width
  bottomLeft: `top-[100%] left-0 -translate-y-full w-full ${defaultHeightSizing}`, // Full width, small height
  leftTop: `top-0 left-0 h-full ${defaultWidthSizing}`, // Full height, small width
  leftBottom: `top-[100%] left-0 -translate-y-full h-full ${defaultWidthSizing}`, // Full height, small width
  topLeft: `top-0 left-0 w-full ${defaultHeightSizing}`, // Full width, small height
};

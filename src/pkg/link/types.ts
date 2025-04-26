export type LinkProps = {
  href: string;
  animate?: boolean;
  external?: boolean;
  children: React.ReactNode;
  as?: "link" | "button";
  variant?: "classic" | "solid" | "soft" | "ghost" | "outline";
  color?: "gray" | "blue" | "green" | "red" | "yellow";
  highContrast?: boolean;
};

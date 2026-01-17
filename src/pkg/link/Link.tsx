import { Link as RLink } from "@radix-ui/themes";
import Button from "../button/Button";
import { useThemeContext } from "../context/theme/useThemeContext";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import type { LinkProps } from "./types";

const Link = ({ href, animate, children, external, as = "link", color }: LinkProps) => {
  const { navigateWT } = useTransitionNavigation();
  const { theme } = useThemeContext();

  const linkHoverClassName = theme === "light" ? "after:bg-yellow-500" : "after:bg-yellow-100";

  const linkClassName = `!cursor-pointer text-gray-700 relative after:content-[''] after:block after:h-0.5 after:scale-x-0
    hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!external) navigateWT(href);
    else window.open(href, "_blank");
  };

  if (as === "button") {
    return (
      <Button onClick={handleClick} variant="soft" color={color}>
        <RLink
          href={href}
          underline="none"
          className={`${linkClassName} ${animate ? linkHoverClassName : ""}`}
          onClick={handleClick}
        >
          {children}
        </RLink>
      </Button>
    );
  }

  return (
    <RLink
      href={href}
      underline="none"
      className={`${linkClassName} ${animate ? linkHoverClassName : ""}`}
      onClick={handleClick}
    >
      {children}
    </RLink>
  );
};

export default Link;

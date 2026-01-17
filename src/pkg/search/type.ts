export type NavigateWT = {
  href: string;
};

export type Menu = {
  menu: string;
};

export type ResultType = {
  route: string;
  title?: string;
  hint?: string;
  action: NavigateWT | Menu;
};

import { lazy } from "react";
import type { CustomRoute, IndexRoute } from "./routing";

import Index from "./pages/root/index.tsx";

const AI = lazy(() => import("./pages/ai/index"));
const Number = lazy(() => import("./pages/number/index"));
const Kjv = lazy(() => import("./pages/kjv/index.tsx"));
const Writer = lazy(() => import("./pages/writer/index.tsx"));
const Documentation = lazy(() => import("./pages/read/index.tsx"));

import Missing from "./page/views/Missing.tsx";
import Daily from "./pages/daily/index";
import Login from "./pages/login/index";

export const protectedRoutes: (CustomRoute | IndexRoute)[] = [
  { path: "*", element: <Missing /> },
  { path: "login", element: <Login /> },
  { path: "kjv", element: <Kjv /> },
  { path: "kjv/:title/:chapter/:verse", element: <Kjv /> },
  { path: "read", element: <Documentation /> },
  { path: "read/:tab", element: <Documentation /> },
  { path: "read/:tab/:title", element: <Documentation /> },
  { path: "daily", element: <Daily /> },
  { path: "daily/:searchQuery/:resultTitle", element: <Daily /> },

  // Depreciated
  { path: "reasoning/:tab/:title", element: <Documentation /> },
  { path: "ai", element: <AI />, suspended: false },
  { path: "office", element: <></> },
  { path: "studies", element: <></> },

  { path: "deduce", element: <Number /> },
  // { path: "search/:searchQuery", element: <Daily /> },
];
export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  { index: true, element: <Index /> },
  { path: "writer", element: <Writer />, suspended: false },
];

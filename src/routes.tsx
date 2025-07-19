import { CustomRoute, IndexRoute } from "./routing";
import { lazy } from "react";

import Index from "./pages/root/index.tsx";

const AI = lazy(() => import("./pages/ai/index"));
const Number = lazy(() => import("./pages/number/index"));
const Kjv = lazy(() => import("./pages/kjv/index.tsx"));
const Writer = lazy(() => import("./pages/writer/index.tsx"));
const Documentation = lazy(() => import("./pages/read/index.tsx"));

import Login from "./pages/login/index";
import Missing from "./page/views/Missing.tsx";
// import Suspended from "./page/views/Suspended.tsx";
import Daily from "./pages/daily/index";

export const protectedRoutes: CustomRoute[] = [
  { path: "ai", element: <AI />, suspended: false },
  { path: "office", element: <></> },
  { path: "studies", element: <></> },
  { path: "writer", element: <Writer />, suspended: false },
  { path: "deduce", element: <Number /> },
  { path: "search/:searchQuery", element: <Daily /> },
];

export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  { index: true, element: <Index /> },
  { path: "*", element: <Missing /> },
  { path: "login", element: <Login /> },
  { path: "kjv", element: <Kjv /> },
  { path: "kjv/:title/:chapter/:verse", element: <Kjv /> },
  { path: "read", element: <Documentation /> },
  { path: "read/:tab", element: <Documentation /> },
  { path: "read/:tab/:title", element: <Documentation /> },
  { path: "daily", element: <Daily /> },
  { path: "daily/read/:searchQuery/:resultTitle", element: <Daily /> },

  // Depreciated
  { path: "reasoning/:tab/:title", element: <Documentation /> },
];

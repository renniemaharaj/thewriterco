import { CustomRoute, IndexRoute } from "./routing";
import { lazy } from "react";

import Index from "./pages/root/index.tsx";

const AI = lazy(() => import("./pages/ai/index"));
const Number = lazy(() => import("./pages/number/index"));
const Kjv = lazy(() => import("./pages/kjv/index.tsx"));
const Writer = lazy(() => import("./pages/writer/index.tsx"));
const Documentation = lazy(() => import("./pages/read/index.tsx"));

import Presenter from "./pages/doc/presenter/index";
import Login from "./pages/login/index";
import Missing from "./pkg/page/views/Missing.tsx";
import Suspended from "./pkg/page/views/Suspended.tsx";

export const protectedRoutes: CustomRoute[] = [
  { path: "ai", element: <AI />, suspended: false },
  { path: "office", element: <></> },
  { path: "studies", element: <></> },
  { path: "writer", element: <Writer />, suspended: false },
  { path: "deduce", element: <Number /> },
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
  { path: "daily", element: <Suspended /> },
  { path: "doc/presenter", element: <Presenter /> },

  // Depreciated
  { path: "reasoning/:tab/:title", element: <Documentation /> },
];

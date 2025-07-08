import { CustomRoute, IndexRoute } from "./routing";

import Root from "./pages/root/Root";

import { lazy } from "react";
import Login from "./pages/login/Login";
import Presenter from "./pages/doc/presenter/Presenter";
import Missing from "./pkg/page/views/Missing.tsx";
import Suspended from "./pkg/page/views/Suspended.tsx";

const AI = lazy(() => import("./pages/ai/Chat"));
const Number = lazy(() => import("./pages/number/Number"));
const Kjv = lazy(() => import("./pages/kjv/KJV"));

const Writer = lazy(() => import("./pages/writer/Writer.tsx"));

const Documentation = lazy(() => import("./pages/reasoning/Document"));

export const protectedRoutes: CustomRoute[] = [
  { path: "ai", element: <AI />, suspended: false },
  { path: "office", element: <></> },
  { path: "studies", element: <></> },
  { path: "writer", element: <Writer />, suspended: false },
  { path: "deducer", element: <Number /> },
];

export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  { index: true, element: <Root /> },
  { path: "*", element: <Missing /> },
  { path: "login", element: <Login /> },
  { path: "kjv", element: <Kjv /> },
  { path: "kjv/:title/:chapter/:verse", element: <Kjv /> },
  { path: "read", element: <Documentation /> },
  { path: "read/:tab", element: <Documentation /> },
  { path: "read/:tab/:title", element: <Documentation /> },
  { path: "reasoning/:tab/:title", element: <Documentation /> },
  { path: "daily", element: <Suspended /> },
  { path: "doc/presenter", element: <Presenter /> },
];

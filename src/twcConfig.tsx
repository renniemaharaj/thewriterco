import { Route } from "react-router-dom";

import Root from "./pages/root/Root";
import NoPage from "./pages/404/NoPage";
import Study from "./pages/reasoning/Document";

import { lazy } from "react";
import Login from "./pages/login/Login";

const AI = lazy(() => import("./pages/ai/Chat"));
const Number = lazy(() => import("./pages/number/Number"));
const Daily = lazy(() => import("./pages/daily/Reports"));
const Kjv = lazy(() => import("./pages/kjv/KJV"));

const DocPools = lazy(() => import("./pages/doc/geminiPool/Document"));
const DocStudies = lazy(() => import("./pages/doc/studyDocument/Document"));
const DocAI = lazy(() => import("./pages/doc/ai/Document"));

export interface Primitve {
  element: JSX.Element;
}

export interface CustomRoute extends Primitve {
  path: string;
}

export interface IndexRoute extends Primitve {
  index: true;
}

export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  { index: true, element: <Root /> },
  { path: "*", element: <NoPage /> },
  { path: "deducer", element: <Number /> },
  { path: "login", element: <Login /> },
  { path: "ai", element: <AI /> },
  { path: "kjv", element: <Kjv /> },
  { path: "reasoning", element: <Study /> },
  { path: "doc/studyDocument", element: <DocStudies /> },
  { path: "doc/geminiPool", element: <DocPools /> },
  { path: "doc/ai", element: <DocAI /> },
  { path: "daily", element: <Daily /> },
];

const protectedRoutes: CustomRoute[] = [
  { path: "office", element: <></> },
  { path: "studies", element: <></> },
];

export const publicRoutesFunc = () => {
  return publicRoutes.map((route, i) =>
    "index" in route ? (
      <Route key={`public-index` + i} index element={route.element} />
    ) : (
      <Route
        key={`public-${route.path}` + i}
        path={route.path}
        element={route.element}
      />
    ),
  );
};

export const protectedRoutesFunc = () => {
  return protectedRoutes.map((route, i) => (
    <Route
      key={`private-${route.path}` + i}
      path={route.path}
      element={route.element}
    />
  ));
};

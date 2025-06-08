import { Route } from "react-router-dom";

import Root from "./pages/root/Root";
import Missing from "./pages/missing/Missing";
import Study from "./pages/reasoning/Document";

import { lazy } from "react";
import Login from "./pages/login/Login";
import Presenter from "./pages/doc/presenter/Presenter";
import Suspended from "./pages/suspended/Suspended";

const AI = lazy(() => import("./pages/ai/Chat"));
const Number = lazy(() => import("./pages/number/Number"));
const Daily = lazy(() => import("./pages/daily/Reports"));
const Kjv = lazy(() => import("./pages/kjv/KJV"));

const DocPools = lazy(() => import("./pages/doc/geminiPool/Document"));
const DocStudies = lazy(() => import("./pages/doc/studyDocument/Document"));
const DocAI = lazy(() => import("./pages/doc/ai/Document"));

export interface Primitve {
  element: JSX.Element;
  suspended?: boolean;
}

export interface CustomRoute extends Primitve {
  path: string;
}

export interface IndexRoute extends Primitve {
  index: true;
}

export const publicRoutes: (CustomRoute | IndexRoute)[] = [
  { index: true, element: <Root /> },
  { path: "*", element: <Missing /> },
  { path: "deducer", element: <Number /> },
  { path: "login", element: <Login /> },
  { path: "ai", element: <AI />, suspended: true },
  { path: "kjv", element: <Kjv /> },
  { path: "reasoning", element: <Study /> },
  { path: "doc/studyDocument", element: <DocStudies /> },
  { path: "doc/geminiPool", element: <DocPools /> },
  { path: "doc/ai", element: <DocAI /> },
  { path: "daily", element: <Daily /> },
  { path: "doc/presenter", element: <Presenter /> },
];

const protectedRoutes: CustomRoute[] = [
  { path: "office", element: <></> },
  { path: "studies", element: <></> },
];

const passThrough = (route: CustomRoute) =>
  route.suspended ? <Suspended /> : route.element;

export const publicRoutesFunc = () => {
  return publicRoutes.map((route, i) =>
    "index" in route ? (
      <Route key={`public-index` + i} index element={route.element} />
    ) : (
      <Route
        key={`public-${route.path}` + i}
        path={route.path}
        element={passThrough(route)}
      />
    ),
  );
};

export const protectedRoutesFunc = () => {
  return protectedRoutes.map((route, i) => (
    <Route
      key={`private-${route.path}` + i}
      path={route.path}
      element={passThrough(route)}
    />
  ));
};

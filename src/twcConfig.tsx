import { Route } from "react-router-dom";

import Root from "./pages/root/Root";
import NoPage from "./pages/noPage/NoPage";
import Study from "./pages/reasoning/Reasoning";

import { lazy } from "react";

const AI = lazy(() => import("./pages/ai/Chat"));
const Number = lazy(() => import("./pages/number/Number"));
const Guide = lazy(() => import("./pages/doc/studyDocument/Guide"));
const GeminiPool = lazy(() => import("./pages/doc/geminiPool/Guide"));
const Kjv = lazy(() => import("./pages/kjv/KJV"));

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
  { path: "ai", element: <AI /> },
  { path: "kjv", element: <Kjv /> },
  { path: "reasoning", element: <Study /> },
  { path: "doc/studyDocument", element: <Guide /> },
  { path: "doc/geminiPool", element: <GeminiPool /> },
];

const protectedRoutes: CustomRoute[] = [{ path: "office", element: <></> }];

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

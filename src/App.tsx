import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

import { HelmetProvider } from "react-helmet-async";

// Import components
import PersistLogin from "./components/PersistLogin";
import ErrorFallback from "./components/ErrorBoundary";
import { RequireAuth } from "./components/RequireAuth";
import { ThemeProvider } from "./components/context/theme/ThemeProvider";
import { useThemeContext } from "./components/context/theme/useThemeContext";

// Import pages
import { lazy } from "react";
import Root from "./pages/root/Root";
import NoPage from "./pages/noPage/NoPage";
import Study from "./pages/reasoning/Reasoning";

// Lazy loaded components
const AI = lazy(() => import("./pages/ai/Chat"));
const Number = lazy(() => import("./pages/number/Number"));
const Guide = lazy(() => import("./pages/doc/studyDocument/Guide"));
const Example = lazy(() => import("./pages/doc/studyDocument/Example"));
const Kjv = lazy(() => import("./pages/kjv/KJV"));

// Custom route types
type CustomRoute = {
  path: string;
  element: JSX.Element;
};

// Index route type
type IndexRoute = {
  index: true;
  element: JSX.Element;
};

// List of public routes
const publicRoutes: (CustomRoute | IndexRoute)[] = [
  {
    index: true,
    element: <Root />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
  {
    path: "deducer",
    element: <Number />,
  },
  {
    path: "ai",
    element: <AI />,
  },
  {
    path: "kjv",
    element: <Kjv />,
  },
  {
    path: "reasoning",
    element: <Study />,
  },
  {
    path: "doc/studydocument",
    element: <Guide />,
  },
  {
    path: "doc/studydocument/example",
    element: <Example />,
  },
];

// List of protected routes
const protectedRoutes: CustomRoute[] = [];

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppContent />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useThemeContext();

  return (
    <Theme
      appearance={theme}
      accentColor={"gold"}
      radius="full"
      panelBackground="translucent"
      scaling="110%"
      grayColor="sage"
    >
      <HelmetProvider>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) =>
            "index" in route ? (
              <Route key={"pub-route-" + index} index element={route.element} />
            ) : (
              <Route
                key={"pub-route-" + index}
                path={route.path}
                element={route.element}
              />
            ),
          )}

          {/* Protected Routes and Login Persistent Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              {protectedRoutes.map((route, index) => (
                <Route
                  key={"priv-route-" + index}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </HelmetProvider>
    </Theme>
  );
}

export default App;

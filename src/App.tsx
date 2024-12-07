import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { Theme } from "@radix-ui/themes";

// Import components
import PersistLogin from "./components/PersistLogin";
import ErrorFallback from "./components/ErrorBoundary";
import { RequireAuth } from "./components/RequireAuth";
import { ThemeProvider } from "./components/context/ThemeProvider";
import { useThemeContext } from "./components/context/useThemeContext";

// Import pages
import Home from "./pages/Home";
import NoPage from "./pages/404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recover from "./pages/recover";
import Welcome from "./pages/Welcome";

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

// Custom route types
type CustomRoute = {
  path: string;
  element: JSX.Element;
};

type IndexRoute = {
  index: true;
  element: JSX.Element;
};

// List of public routes
const publicRoutes: (CustomRoute | IndexRoute)[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "recover",
    element: <Recover />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
];

// List of protected routes
const protectedRoutes: CustomRoute[] = [
  {
    path: "welcome",
    element: <Welcome />,
  },
];

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
    <Theme appearance={theme} accentColor={"gold"}>
      <MsalProvider instance={msalInstance}>
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
      </MsalProvider>
    </Theme>
  );
}

export default App;

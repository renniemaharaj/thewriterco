import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Theme } from "@radix-ui/themes";

import PersistLogin from "./pkg/PersistLogin";
import ErrorFallback from "./pkg/eboundary/ErrorBoundary";
import { RequireAuth } from "./pkg/RequireAuth";
import { ThemeProvider } from "./pkg/context/theme/ThemeProvider";
import { useThemeContext } from "./pkg/context/theme/useThemeContext";
import { protectedRoutesFunc, publicRoutesFunc } from "./routing";

// import ChristInMe from "./assets/Christ_In_Me.jpg";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppShell />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function AppShell() {
  const { theme } = useThemeContext();

  return (
    <Theme
      appearance={theme}
      accentColor="gold"
      radius="full"
      asChild={false}
      // hasBackground={true}
      panelBackground="translucent"
      scaling="110%"
      grayColor="sage"
      className=""
    >
      <HelmetProvider>
        <AppRoutes />
      </HelmetProvider>
    </Theme>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutesFunc()}
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>{protectedRoutesFunc()}</Route>
      </Route>
    </Routes>
  );
}

export default App;

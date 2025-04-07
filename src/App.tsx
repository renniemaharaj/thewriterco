import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Theme } from "@radix-ui/themes";

import PersistLogin from "./components/PersistLogin";
import ErrorFallback from "./components/ErrorBoundary";
import { RequireAuth } from "./components/RequireAuth";
import { ThemeProvider } from "./components/context/theme/ThemeProvider";
import { useThemeContext } from "./components/context/theme/useThemeContext";
import { protectedRoutesFunc, publicRoutesFunc } from "./twcConfig";

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
      panelBackground="translucent"
      scaling="110%"
      grayColor="sage"
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

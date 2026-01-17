import { Theme } from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./pkg/context/theme/ThemeProvider";
import { useThemeContext } from "./pkg/context/theme/useThemeContext";
import ErrorFallback from "./pkg/eboundary/ErrorBoundary";
import { AuthRouter } from "./pkg/firebase/auth/component/AuthRouter";
import { protectedRoutesFunc, publicRoutesFunc } from "./routing";

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
      {publicRoutesFunc()}
      <Route element={<AuthRouter />}>{protectedRoutesFunc()}</Route>
    </Routes>
  );
}

export default App;

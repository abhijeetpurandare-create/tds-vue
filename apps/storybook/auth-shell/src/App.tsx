import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  AuthProvider,
  AuthRoutes,
  useAuth,
} from "@delhivery/react-dashboard-boilerplate";
import type { AuthConfig } from "@delhivery/react-dashboard-boilerplate";
import { getStorybookSrc } from "./utils/getStorybookSrc";

interface AppProps {
  authConfig: AuthConfig;
}

const StorybookView = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const loginTriggered = useRef(false);
  const location = useLocation();
  const [hasToken, setHasToken] = useState(
    () => !!sessionStorage.getItem("access_token")
  );
  const storybookSrc = getStorybookSrc(
    "/storybook",
    import.meta.env.VITE_STORYBOOK_URL
  );

  // Poll for token after auth init completes
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        setHasToken(true);
        return;
      }
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (location.pathname.includes("lib-auth-oauth-callback")) return;
    if (!isLoading && !isAuthenticated && !hasToken && !loginTriggered.current) {
      loginTriggered.current = true;
      const issuer =
        sessionStorage.getItem("issuer") ||
        import.meta.env.VITE_KEYCLOAK_ISSUER;
      const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;
      const url = new URL(window.location.href);
      const redirectUri = `${url.protocol}//${url.host}/storybook/lib-auth-oauth-callback`;
      login(issuer, clientId, redirectUri);
    }
  }, [isLoading, isAuthenticated, hasToken, login, location.pathname]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/storybook/";
  };

  if (isLoading || !(isAuthenticated || hasToken)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`
        /* Hide the AuthProvider's built-in Header */
        nav.bg-white { display: none !important; }
      `}</style>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 8px", background: "#1a1a1a" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "4px 12px",
            background: "#e53e3e",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Logout
        </button>
      </div>
      <iframe
        src={storybookSrc}
        title="Storybook"
        style={{ flex: 1, width: "100%", border: "none" }}
      />
    </div>
  );
};

const App = ({ authConfig }: AppProps) => {
  return (
    <AuthProvider config={authConfig}>
      <Routes>
        {...AuthRoutes}
        <Route path="/*" element={<StorybookView />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

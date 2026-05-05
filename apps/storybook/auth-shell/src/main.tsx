import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const authConfig = {
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  landing_page: "/storybook/",
  default_issuer: import.meta.env.VITE_KEYCLOAK_ISSUER,
  basePath: "/storybook",
};

createRoot(document.getElementById("root")!).render(
  (
    <BrowserRouter basename="/storybook">
      <App authConfig={authConfig} />
    </BrowserRouter>
  ) as React.ReactNode
);

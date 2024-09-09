import "@fontsource/inter";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          /* dark mode colors */
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <App />
    </CssVarsProvider>
  </StrictMode>
);

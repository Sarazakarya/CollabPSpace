import "./i18n";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import QueryProvider from "./Provider/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryProvider>
      <App />
    </QueryProvider>
  </HelmetProvider>,
);

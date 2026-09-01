import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initGA } from "./lib/analytics";

// Initialize Google Analytics 4 (if VITE_GA_MEASUREMENT_ID is provided)
initGA();

createRoot(document.getElementById("root")!).render(<App />);

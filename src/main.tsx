import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/ppoms">
      <Provider>
        <main className="dark text-foreground bg-background p-4">
          <div className="max-w-5xl mx-auto">
            <App />
          </div>
        </main>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

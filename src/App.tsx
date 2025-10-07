import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "rgba(17, 24, 39, 0.7)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            color: "#ffffff",
            padding: "16px",
            fontWeight: "500",
          },
          success: {
            style: {
              background: "rgba(0, 237, 191,0.15)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "white",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "white",
            },
          },
          error: {
            style: {
              background: "rgba(239, 68, 68, 0.15)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
          loading: {
            style: {
              background: "rgba(168, 85, 247, 0.15)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              color: "#a855f7",
            },
            iconTheme: {
              primary: "#a855f7",
              secondary: "white",
            },
          },
        }}
      />
      <AppRouter />
    </>
  );
}

export default App;

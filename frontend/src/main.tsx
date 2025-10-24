// main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext"; // Import from correct path
import "./index.css";
import { store } from "./store/index.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                {" "}
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                    <Toaster
                        position="bottom-right"
                        expand={false}
                        closeButton
                    />
                </Provider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);

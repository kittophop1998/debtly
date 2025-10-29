"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "./ThemeProvider";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

// Main AppProvider สำหรับรวม providers ทั้งหมด
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </ThemeProvider>
  );
}
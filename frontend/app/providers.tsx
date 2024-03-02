"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) <>{children}</>;
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

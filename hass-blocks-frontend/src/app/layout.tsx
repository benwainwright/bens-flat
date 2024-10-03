import type { Metadata, Viewport } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import { PageContainer } from "@toolpad/core/PageContainer";
import { AppProvider } from "@toolpad/core/nextjs";

import "./globals.css";
import { NavBar } from "@/components/nav-bar/nav-bar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Paper from "@mui/material/Paper";
import { Suspense } from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <CssBaseline />
      <body>
        {process.env.NODE_ENV === "production" && (
          <Suspense>
            <AppProvider>
              <NavBar />
              <PageContainer>
                <Paper sx={{ padding: "1rem", width: "100%" }}>
                  {children}
                </Paper>
              </PageContainer>
            </AppProvider>
          </Suspense>
        )}
      </body>
    </html>
  );
};

export default RootLayout;

import "@mantine/core/styles.css";
import type { Metadata } from "next";
import "./globals.css";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import StoreProvider from "../redux/storeProvider";
import NextUiProviderCustom from "./NextUIProviderCustom";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Help me",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <StoreProvider>
          <NextUiProviderCustom>
            <MantineProvider>{children}</MantineProvider>
          </NextUiProviderCustom>
        </StoreProvider>
      </body>
    </html>
  );
}

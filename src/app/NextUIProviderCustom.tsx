"use client";

import { NextUIProvider } from "@nextui-org/react";

const NextUiProviderCustom = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUiProviderCustom;

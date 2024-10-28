"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
const endpoint = "https://api.mainnet-beta.solana.com";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider.tsx"),
  {
    ssr: false,
  }
);

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider autoConnect={true}>

    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>

    </WalletProvider>
    </ConnectionProvider>
  );
}

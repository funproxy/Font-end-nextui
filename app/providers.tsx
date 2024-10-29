"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useMemo } from "react";
// import dynamic from "next/dynamic";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import('@solana/wallet-adapter-react-ui/styles.css' as any) ;
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
const endpoint = "https://api.mainnet-beta.solana.com";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const wallets = useMemo(
    () => [
    ],
    []
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
        </WalletModalProvider>
    </WalletProvider>
    </ConnectionProvider>
  );
}

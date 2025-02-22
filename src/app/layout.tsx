// eslint-disable-next-line
import Symbol_observable from "symbol-observable";

import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import "../1Config/Styles/index.scss";

import { ApolloWrapper } from "@/6Shared/api/gql/ApolloWrapper";
import StoreProvider from "@/1Config/Providers/Redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <ApolloWrapper>{children} </ApolloWrapper>
        </body>
      </html>
    </StoreProvider>
  );
}

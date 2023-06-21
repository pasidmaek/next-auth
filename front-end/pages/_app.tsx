import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/component/Navbar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} baseUrl="/">
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

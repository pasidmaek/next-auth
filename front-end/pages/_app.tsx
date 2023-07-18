import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {/* <Layout> */}
        <Navbar />
          <Component {...pageProps} />
        {/* </Layout> */}
      </SessionProvider>
    </Provider>
  );
}

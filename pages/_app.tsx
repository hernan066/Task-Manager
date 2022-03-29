import type { AppProps } from "next/app";

import { store } from "../redux/store";
import { Provider } from "react-redux";

import "../styles/styles.scss";

import "regenerator-runtime/runtime";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath}/>
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp;

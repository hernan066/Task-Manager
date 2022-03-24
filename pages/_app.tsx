import type { AppProps } from "next/app";


import { store } from "../redux/store";
import { Provider } from "react-redux";

import "../styles/styles.scss";

import "regenerator-runtime/runtime";

function MyApp({ Component, pageProps }: AppProps) {
  return (
   
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    
  );
}

export default MyApp;

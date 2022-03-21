import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { store } from "../redux/store";
import { Provider } from "react-redux";

import { darkTheme } from "../themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';

import {  darkTheme } from '../themes';


import { store } from '../redux/store';

import '../styles/globals.css';
import { Provider } from 'react-redux';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
    </Provider>
  )
}

export default MyApp

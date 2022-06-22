import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle, theme } from './styles';
import { ThemeProvider } from 'styled-components';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  rootElement
);

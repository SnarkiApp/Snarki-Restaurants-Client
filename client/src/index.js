import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import client from "./apollo/apollo";
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

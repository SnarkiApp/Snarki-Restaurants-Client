import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import client from "./apollo/apollo";
import { ApolloProvider } from 'react-apollo';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { SnackbarProvider } from "notistack";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

ReactDOM.render(<ApolloProvider client={client}>
  <SnackbarProvider
              maxSnack={3}
              iconVariant={{
                error: "⚠️ "
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
            >
  <App /></SnackbarProvider>
</ApolloProvider>, document.getElementById('root'));

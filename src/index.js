import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter} from 'react-router-dom'; 

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = {
  uri: 'http://ec2-3-210-210-169.compute-1.amazonaws.com:5000/graphql',
};

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache()
});

console.log(client)

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App}/>
  </BrowserRouter> ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

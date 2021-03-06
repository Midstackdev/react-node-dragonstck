import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {  Provider } from 'react-redux';
import store from './store';
import { fetchAuthenticated } from './actions/accountActions';

store.dispatch(fetchAuthenticated())
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>,
      document.getElementById('root')
    );

  });



import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './layout/MainPage';

const App = () => (
  <Provider store={store}>
    <MainPage />
  </Provider>
);

export default App;

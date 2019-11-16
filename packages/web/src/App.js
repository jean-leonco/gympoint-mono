import React from 'react';
import { Router } from 'react-router-dom';

import './config/reactotronConfig';

import history from './services/history';

import Routes from './routes';

import GlobalStyles from './styles/global';

export default function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyles />
    </Router>
  );
}

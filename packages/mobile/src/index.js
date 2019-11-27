import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import './config/ReactotronConfig';

import Routes from './routes';

import colors from './styles/colors';

export default function index() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.main} />
      <Routes />
      <FlashMessage position="bottom" floating />
    </>
  );
}

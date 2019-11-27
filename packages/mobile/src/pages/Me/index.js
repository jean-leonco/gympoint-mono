import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api';

export default function Me({ navigation }) {
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('studentid');

      if (token) {
        api.defaults.headers.studentId = token;
        return navigation.navigate('Checkins');
      }

      return navigation.navigate('Sign');
    }
    getToken();
  }, [navigation]);

  return <View />;
}

Me.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

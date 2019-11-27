import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import Button from '../../components/Button';

import { Container, Logo, Input } from './styles';

import logo from '../../assets/logo.png';

export default function Sign({ navigation }) {
  const [id, setId] = useState(null);

  async function handleSubmit() {
    if (!id) return;

    try {
      const response = await api.post('studentsessions', { student_id: id });

      await AsyncStorage.setItem('studentid', String(response.data.id));

      navigation.navigate('Me');
    } catch (error) {
      errorHandler(error, 'Error on Sign In');
    }
  }

  return (
    <Container>
      <Logo source={logo} />

      <Input
        placeholder="Insert your registration ID"
        value={id}
        onChangeText={setId}
        onSubmitEditing={handleSubmit}
        returnKeyType="send"
        keyboardType="number-pad"
      />

      <Button enabled={!!id} onPress={handleSubmit}>
        Sign in
      </Button>
    </Container>
  );
}

Sign.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

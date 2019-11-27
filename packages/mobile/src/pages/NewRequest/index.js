import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';
import PropTypes from 'prop-types';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import Button from '../../components/Button';

import { Container, Input } from './styles';

import logo from '../../assets/logo-side.png';

export default function NewRequest({ navigation }) {
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      const studentId = await AsyncStorage.getItem('studentid');

      await api.post(`students/${studentId}/assistance-requests`, {
        question,
      });

      showMessage({
        message: 'Assistance request created',
        description:
          'Your assistance request was created with success. Soon the GymPoint team will answer',
        type: 'success',
        icon: 'success',
      });
      navigation.goBack();
    } catch (error) {
      errorHandler(error, 'Error on request creation');
      navigation.goBack();
    }
  }

  return (
    <Container>
      <Input
        value={question}
        onChangeText={setQuestion}
        placeholder="Include your assistance request"
        multiline
      />
      <Button onPress={handleSubmit}>Submit request</Button>
    </Container>
  );
}

NewRequest.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
  headerTitle: () => <Image source={logo} />,
});

NewRequest.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistance, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import {
  Container,
  Content,
  RequestBox,
  RequestHeader,
  Title,
  Time,
  Text,
} from './styles';

import logo from '../../assets/logo-side.png';

export default function Answer({ navigation }) {
  const [id, setId] = useState('');
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const request_id = navigation.getParam('id');

    setId(request_id);
  }, [navigation]);

  useEffect(() => {
    async function loadRequest() {
      try {
        if (!id) return;

        const student_id = await AsyncStorage.getItem('studentid');

        const { data } = await api.get(
          `students/${student_id}/assistance-requests/${id}`
        );

        const parsedData = {
          ...data,
          parsedDate: formatDistance(parseISO(data.created_at), new Date()),
        };

        setRequest(parsedData);
      } catch (error) {
        errorHandler(error, 'Error loading assistance request');
        navigation.goBack();
      }
    }

    loadRequest();
  }, [id, navigation]);

  if (!request) {
    return <Container />;
  }

  return (
    <Container>
      <Content>
        <RequestBox>
          <RequestHeader>
            <Title>QUESTION</Title>
            <Time>{request.parsedDate}</Time>
          </RequestHeader>
          <Text>{request.question}</Text>
        </RequestBox>

        <RequestBox>
          <RequestHeader>
            <Title>ANSWER</Title>
          </RequestHeader>
          <Text>{request.answer}</Text>
        </RequestBox>
      </Content>
    </Container>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
  headerTitle: () => <Image source={logo} />,
});

Answer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
